// Shared types between frontend and backend

/**
 * Contact form request payload
 */
export interface ContactFormRequest {
  name: string;
  email: string;
  service: string;
  message?: string;
  recaptchaToken: string;
  metadata?: {
    userAgent?: string;
    referrer?: string;
    timestamp: string;
  };
}

/**
 * Successful contact form response
 */
export interface ContactFormSuccessResponse {
  success: true;
  message: string;
  requestId: string;
  estimatedResponse: string;
}

/**
 * Error response from contact form API
 */
export interface ContactFormErrorResponse {
  success: false;
  error: {
    code: ContactFormErrorCode;
    message: string;
    details?: Record<string, unknown>;
  };
}

/**
 * Contact form response (discriminated union)
 */
export type ContactFormResponse =
  | ContactFormSuccessResponse
  | ContactFormErrorResponse;

/**
 * Error codes for contact form validation and processing
 */
export enum ContactFormErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_EMAIL = "INVALID_EMAIL",
  MESSAGE_TOO_LONG = "MESSAGE_TOO_LONG",
  RECAPTCHA_FAILED = "RECAPTCHA_FAILED",
  RECAPTCHA_LOW_SCORE = "RECAPTCHA_LOW_SCORE",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  EMAIL_SEND_FAILED = "EMAIL_SEND_FAILED",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

/**
 * DynamoDB rate limiting record
 */
export interface RateLimitRecord {
  pk: string; // "IP#{ip}" or "EMAIL#{email}"
  sk: string; // Timestamp ISO string
  ttl: number; // Unix timestamp for DynamoDB TTL
  requestId: string;
  metadata?: {
    service?: string;
    userAgent?: string;
  };
}
