/**
 * Contact form API request/response types
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

export interface ContactFormSuccessResponse {
  success: true;
  message: string;
  requestId: string;
  estimatedResponse: string;
}

export interface ContactFormErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ContactFormResponse =
  | ContactFormSuccessResponse
  | ContactFormErrorResponse;

/**
 * Error codes from API
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
