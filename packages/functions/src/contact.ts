import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import type {
  ContactFormRequest,
  ContactFormSuccessResponse,
  ContactFormErrorResponse,
  ContactFormErrorCode,
  RateLimitRecord,
} from "@idevelop-tech/core";
import { renderContactConfirmation } from "./email-templates/utils";
import { wrapWithNewRelic } from "./utils/newrelic-wrapper";

// AWS Clients
const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const sesClient = new SESClient({});
const ssmClient = new SSMClient({});

// Environment variable validation
function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Environment variables (validated at module load)
const RATE_LIMIT_TABLE_NAME = getRequiredEnvVar("RATE_LIMIT_TABLE_NAME");
const RECAPTCHA_SECRET_PARAMETER = getRequiredEnvVar(
  "RECAPTCHA_SECRET_PARAMETER",
);
const SES_FROM_EMAIL = getRequiredEnvVar("SES_FROM_EMAIL");
const SES_TO_EMAIL = getRequiredEnvVar("SES_TO_EMAIL");

// Rate limiting configuration
const RATE_LIMITS = {
  IP_LIMIT: 5, // requests per hour
  IP_WINDOW: 60 * 60, // 1 hour in seconds
  EMAIL_LIMIT: 10, // requests per 24 hours
  EMAIL_WINDOW: 24 * 60 * 60, // 24 hours in seconds
};

// reCAPTCHA configuration
const RECAPTCHA_THRESHOLD = 0.5;
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

// Cached reCAPTCHA secret (fetch once per Lambda container)
let cachedRecaptchaSecret: string | null = null;

/**
 * Get reCAPTCHA secret from AWS SSM Parameter Store
 */
async function getRecaptchaSecret(): Promise<string> {
  if (cachedRecaptchaSecret) {
    return cachedRecaptchaSecret;
  }

  try {
    const command = new GetParameterCommand({
      Name: RECAPTCHA_SECRET_PARAMETER,
      WithDecryption: true,
    });

    const response = await ssmClient.send(command);
    cachedRecaptchaSecret = response.Parameter?.Value || "";

    if (!cachedRecaptchaSecret) {
      throw new Error("reCAPTCHA secret not found in SSM");
    }

    return cachedRecaptchaSecret;
  } catch (error) {
    console.error("Failed to fetch reCAPTCHA secret from SSM:", error);
    throw error;
  }
}

/**
 * Result types for validation and operations
 */
type ValidationSuccess = { valid: true };
type ValidationError = {
  valid: false;
  error: { code: ContactFormErrorCode; message: string };
};
type ValidationResult = ValidationSuccess | ValidationError;

type RecaptchaSuccess = { success: true; score?: number };
type RecaptchaError = {
  success: false;
  error: { code: ContactFormErrorCode; message: string };
};
type RecaptchaResult = RecaptchaSuccess | RecaptchaError;

type RateLimitSuccess = { allowed: true };
type RateLimitError = {
  allowed: false;
  error: { code: ContactFormErrorCode; message: string };
};
type RateLimitResult = RateLimitSuccess | RateLimitError;

type EmailSuccess = { success: true };
type EmailError = {
  success: false;
  error: { code: ContactFormErrorCode; message: string };
};
type EmailResult = EmailSuccess | EmailError;

/**
 * Validate request payload
 */
function validateRequest(body: unknown): ValidationResult {
  // Type guard: ensure body is an object
  if (!body || typeof body !== "object") {
    return {
      valid: false,
      error: {
        code: "VALIDATION_ERROR" as ContactFormErrorCode,
        message: "Invalid request body",
      },
    };
  }

  // Cast to Record after validation
  const payload = body as Record<string, unknown>;

  // Check required fields
  if (
    !payload.name ||
    !payload.email ||
    !payload.service ||
    !payload.recaptchaToken
  ) {
    return {
      valid: false,
      error: {
        code: "VALIDATION_ERROR" as ContactFormErrorCode,
        message:
          "Missing required fields: name, email, service, recaptchaToken",
      },
    };
  }

  // Type assertions after presence check
  const name = String(payload.name);
  const email = String(payload.email);
  const recaptchaToken = String(payload.recaptchaToken);
  const message = payload.message ? String(payload.message) : undefined;

  // Validate name (1-100 chars, letters/spaces/hyphens/apostrophes only)
  const nameRegex = /^[a-zA-Z\s'-]{1,100}$/;
  if (!nameRegex.test(name.trim())) {
    return {
      valid: false,
      error: {
        code: "VALIDATION_ERROR" as ContactFormErrorCode,
        message:
          "Name must be 1-100 characters and contain only letters, spaces, hyphens, and apostrophes",
      },
    };
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return {
      valid: false,
      error: {
        code: "INVALID_EMAIL" as ContactFormErrorCode,
        message: "Invalid email address format",
      },
    };
  }

  // Validate message length (optional field, max 1000 chars)
  if (message && message.trim().length > 1000) {
    return {
      valid: false,
      error: {
        code: "MESSAGE_TOO_LONG" as ContactFormErrorCode,
        message: "Message must be 1000 characters or less",
      },
    };
  }

  // Validate reCAPTCHA token (min 20 chars)
  if (recaptchaToken.length < 20) {
    return {
      valid: false,
      error: {
        code: "VALIDATION_ERROR" as ContactFormErrorCode,
        message: "Invalid reCAPTCHA token",
      },
    };
  }

  return { valid: true };
}

/**
 * reCAPTCHA API response type
 */
interface RecaptchaApiResponse {
  success: boolean;
  score?: number;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

/**
 * Verify reCAPTCHA token with Google
 */
async function verifyRecaptcha(
  token: string,
  remoteIp: string,
): Promise<RecaptchaResult> {
  try {
    const secret = await getRecaptchaSecret();

    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: remoteIp,
      }),
    });

    const data = (await response.json()) as RecaptchaApiResponse;

    if (!data.success) {
      return {
        success: false,
        error: {
          code: "RECAPTCHA_FAILED" as ContactFormErrorCode,
          message: "reCAPTCHA verification failed",
        },
      };
    }

    // Check score threshold (reCAPTCHA v3)
    if (data.score !== undefined && data.score < RECAPTCHA_THRESHOLD) {
      return {
        success: false,
        error: {
          code: "RECAPTCHA_LOW_SCORE" as ContactFormErrorCode,
          message: `reCAPTCHA score too low: ${data.score}`,
        },
      };
    }

    return { success: true, score: data.score };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return {
      success: false,
      error: {
        code: "RECAPTCHA_FAILED" as ContactFormErrorCode,
        message: "Failed to verify reCAPTCHA",
      },
    };
  }
}

/**
 * Check rate limiting for IP and email
 */
async function checkRateLimit(
  ip: string,
  email: string,
): Promise<RateLimitResult> {
  const now = Date.now();
  const ipCutoff = new Date(now - RATE_LIMITS.IP_WINDOW * 1000).toISOString();
  const emailCutoff = new Date(
    now - RATE_LIMITS.EMAIL_WINDOW * 1000,
  ).toISOString();

  try {
    // Check IP rate limit
    const ipQuery = new QueryCommand({
      TableName: RATE_LIMIT_TABLE_NAME,
      KeyConditionExpression: "pk = :pk AND sk > :cutoff",
      ExpressionAttributeValues: {
        ":pk": `IP#${ip}`,
        ":cutoff": ipCutoff,
      },
    });

    const ipResults = await dynamoClient.send(ipQuery);
    const ipCount = ipResults.Items?.length || 0;

    if (ipCount >= RATE_LIMITS.IP_LIMIT) {
      return {
        allowed: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED" as ContactFormErrorCode,
          message: `Too many requests from this IP. Limit: ${RATE_LIMITS.IP_LIMIT} requests per hour`,
        },
      };
    }

    // Check email rate limit
    const emailQuery = new QueryCommand({
      TableName: RATE_LIMIT_TABLE_NAME,
      KeyConditionExpression: "pk = :pk AND sk > :cutoff",
      ExpressionAttributeValues: {
        ":pk": `EMAIL#${email.toLowerCase()}`,
        ":cutoff": emailCutoff,
      },
    });

    const emailResults = await dynamoClient.send(emailQuery);
    const emailCount = emailResults.Items?.length || 0;

    if (emailCount >= RATE_LIMITS.EMAIL_LIMIT) {
      return {
        allowed: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED" as ContactFormErrorCode,
          message: `Too many requests from this email. Limit: ${RATE_LIMITS.EMAIL_LIMIT} requests per 24 hours`,
        },
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error("Rate limit check error:", error);
    // Allow request to proceed if rate limit check fails (fail open)
    return { allowed: true };
  }
}

/**
 * Record rate limit entry in DynamoDB
 */
async function recordRateLimit(
  ip: string,
  email: string,
  requestId: string,
  service?: string,
  userAgent?: string,
): Promise<void> {
  const now = new Date();
  const timestamp = now.toISOString();
  const ttl = Math.floor(now.getTime() / 1000) + RATE_LIMITS.EMAIL_WINDOW; // Use longer TTL for cleanup

  const metadata = {
    service,
    userAgent,
  };

  try {
    // Record IP entry
    const ipRecord: RateLimitRecord = {
      pk: `IP#${ip}`,
      sk: timestamp,
      ttl,
      requestId,
      metadata,
    };

    await dynamoClient.send(
      new PutCommand({
        TableName: RATE_LIMIT_TABLE_NAME,
        Item: ipRecord,
      }),
    );

    // Record email entry
    const emailRecord: RateLimitRecord = {
      pk: `EMAIL#${email.toLowerCase()}`,
      sk: timestamp,
      ttl,
      requestId,
      metadata,
    };

    await dynamoClient.send(
      new PutCommand({
        TableName: RATE_LIMIT_TABLE_NAME,
        Item: emailRecord,
      }),
    );
  } catch (error) {
    console.error("Failed to record rate limit:", error);
    // Don't fail the request if rate limit recording fails
  }
}

/**
 * Send initial contact email via AWS SES
 * Sends to both user and admin to create a shared email thread
 */
async function sendInitialContactEmail(
  requestData: ContactFormRequest,
  requestId: string,
): Promise<EmailResult> {
  const { name, email, service, message } = requestData;

  // Format timestamp in human-friendly format with timezone
  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  try {
    // Render HTML template (customer-facing confirmation with full details)
    const htmlBody = renderContactConfirmation({
      name,
      email,
      service,
      message: message || "(no message provided)",
      requestId,
      timestamp,
      userAgent: requestData.metadata?.userAgent || "N/A",
      referrer: requestData.metadata?.referrer || "N/A",
    });

    // Send email to both user and admin
    // This creates a shared email thread where any reply includes both parties
    const command = new SendEmailCommand({
      Source: SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [email, SES_TO_EMAIL], // Both receive the same email
      },
      Message: {
        Subject: {
          Data: `Thanks for contacting I Develop Tech - ${service}`,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: "UTF-8",
          },
        },
      },
      ReplyToAddresses: [SES_TO_EMAIL, email], // Replies go to both
    });

    await sesClient.send(command);
    return { success: true };
  } catch (error) {
    console.error("SES send initial contact email error:", error);
    return {
      success: false,
      error: {
        code: "EMAIL_SEND_FAILED" as ContactFormErrorCode,
        message: "Failed to send initial contact email",
      },
    };
  }
}


/**
 * Main Lambda handler (wrapped with New Relic APM instrumentation)
 */
const contactHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const requestId = crypto.randomUUID();

  console.log("Contact form submission received:", {
    requestId,
    sourceIp: event.requestContext.http.sourceIp,
  });

  // Parse request body
  let requestData: ContactFormRequest;
  try {
    requestData = JSON.parse(event.body || "{}");
  } catch (_error) {
    const errorResponse: ContactFormErrorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR" as ContactFormErrorCode,
        message: "Invalid JSON in request body",
      },
    };

    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorResponse),
    };
  }

  // Step 1: Validate request
  const validation = validateRequest(requestData);
  if (!validation.valid) {
    const errorResponse: ContactFormErrorResponse = {
      success: false,
      error: validation.error,
    };

    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorResponse),
    };
  }

  // Step 2: Verify reCAPTCHA
  const recaptchaResult = await verifyRecaptcha(
    requestData.recaptchaToken,
    event.requestContext.http.sourceIp,
  );
  if (!recaptchaResult.success) {
    const errorResponse: ContactFormErrorResponse = {
      success: false,
      error: recaptchaResult.error,
    };

    return {
      statusCode: 403,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorResponse),
    };
  }

  // Step 3: Check rate limiting
  const rateLimitCheck = await checkRateLimit(
    event.requestContext.http.sourceIp,
    requestData.email.trim(),
  );
  if (!rateLimitCheck.allowed) {
    const errorResponse: ContactFormErrorResponse = {
      success: false,
      error: rateLimitCheck.error,
    };

    return {
      statusCode: 429,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorResponse),
    };
  }

  // Step 4: Send initial contact email (to both user and admin)
  const emailResult = await sendInitialContactEmail(requestData, requestId);

  // Check if email send failed
  if (!emailResult.success) {
    const errorResponse: ContactFormErrorResponse = {
      success: false,
      error: emailResult.error,
    };

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorResponse),
    };
  }

  // Step 5: Record rate limit (after successful email send)
  await recordRateLimit(
    event.requestContext.http.sourceIp,
    requestData.email.trim(),
    requestId,
    requestData.service,
    requestData.metadata?.userAgent,
  );

  // Step 6: Return success response
  const successResponse: ContactFormSuccessResponse = {
    success: true,
    message: "Message sent successfully",
    requestId,
    estimatedResponse: "as soon as possible",
  };

  console.log("Contact form submission successful:", {
    requestId,
    email: requestData.email,
    service: requestData.service,
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(successResponse),
  };
};

// Export handler wrapped with New Relic instrumentation and custom attributes
export const handler = wrapWithNewRelic(contactHandler, "/v1/contact");
