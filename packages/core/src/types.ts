// Shared types between frontend and backend

// API Request/Response types will go here in Phase 3
export interface ContactFormRequest {
  name: string;
  email: string;
  service: string;
  message?: string;
  recaptchaToken: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  requestId?: string;
}
