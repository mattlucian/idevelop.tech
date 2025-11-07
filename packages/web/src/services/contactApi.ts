import type { ContactFormRequest, ContactFormResponse } from "@/types/api";

/**
 * API configuration
 */
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || "https://api.idevelop.tech",
  endpoints: {
    contact: "/v1/contact",
  },
  timeout: 10000, // 10 seconds
};

/**
 * Submit contact form to API
 */
export async function submitContactForm(
  data: ContactFormRequest,
): Promise<ContactFormResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.contact}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    const responseData = await response.json();

    // Handle non-200 responses
    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred. Please try again.",
        },
      };
    }

    return responseData;
  } catch (error) {
    clearTimeout(timeoutId);

    // Network or timeout error
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return {
          success: false,
          error: {
            code: "INTERNAL_ERROR",
            message:
              "Request timed out. Please check your connection and try again.",
          },
        };
      }

      return {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Unable to connect to server. Please try again later.",
        },
      };
    }

    return {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred. Please try again.",
      },
    };
  }
}
