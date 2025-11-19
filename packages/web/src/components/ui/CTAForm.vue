<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import PrimaryButton from "../elements/buttons/PrimaryButton.vue";
import { SCHEDULING_LINK } from "@/constants";
import { useRecaptcha } from "@/composables/useRecaptcha";
import { submitContactForm } from "@/services/contactApi";
import type { ContactFormRequest } from "@/types/api";
import { ContactFormErrorCode } from "@/types/api";
import { logger } from "@/utils/logger";

interface Props {
  serviceName?: string;
  variant?: "default" | "dark";
  showServiceSelector?: boolean;
  formTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  serviceName: "General Inquiry",
  variant: "default",
  showServiceSelector: false,
  formTitle: undefined,
});

const formClasses = computed(() => {
  if (props.variant === "dark") {
    return "bg-[#0a0a0a] border border-slate-800 rounded-xl p-6";
  }
  return "bg-linear-to-br from-slate-900/60 to-slate-800/60 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm";
});

const serviceOptions = [
  "General Inquiry",
  "Integration Services",
  "Tech Admin & Fractional CTO",
  "AI Enablement",
  "eCommerce Operations",
  "Web Design & Development",
  "Cloud & Infrastructure Consulting",
];

const formData = reactive({
  name: "",
  email: "",
  service: props.showServiceSelector ? serviceOptions[0] : props.serviceName,
  message: "",
});

const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const errorMessage = ref("");
const cookiesDisabled = ref(false);

const { executeRecaptcha } = useRecaptcha();

/**
 * Check if cookies are enabled
 */
const checkCookiesEnabled = (): boolean => {
  try {
    // Try to set a test cookie
    document.cookie = "cookietest=1; SameSite=Strict";
    const cookiesEnabled = document.cookie.indexOf("cookietest=") !== -1;
    // Delete test cookie
    document.cookie =
      "cookietest=1; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    return cookiesEnabled;
  } catch (_e) {
    return false;
  }
};

/**
 * Check cookies on mount
 */
onMounted(() => {
  cookiesDisabled.value = !checkCookiesEnabled();
});

/**
 * Get user-friendly error message based on error code
 */
const getErrorMessage = (code: string): string => {
  switch (code) {
    case ContactFormErrorCode.VALIDATION_ERROR:
      return "Please check your information and try again.";
    case ContactFormErrorCode.INVALID_EMAIL:
      return "Please enter a valid email address.";
    case ContactFormErrorCode.MESSAGE_TOO_LONG:
      return "Your message is too long. Please keep it under 1000 characters.";
    case ContactFormErrorCode.RECAPTCHA_FAILED:
    case ContactFormErrorCode.RECAPTCHA_LOW_SCORE:
      return "Security verification failed. Please try again or contact me directly.";
    case ContactFormErrorCode.RATE_LIMIT_EXCEEDED:
      return "Too many requests. Please try again in a few minutes.";
    case ContactFormErrorCode.EMAIL_SEND_FAILED:
      return "Failed to send message. Please try again or email me directly.";
    default:
      return "Something went wrong. Please try again or email me directly.";
  }
};

const handleSubmit = async () => {
  // Check if cookies are disabled
  if (!checkCookiesEnabled()) {
    cookiesDisabled.value = true;
    showError.value = true;
    errorMessage.value =
      "Cookies are required for spam protection. Please enable cookies in your browser to submit this form.";
    return;
  }

  isSubmitting.value = true;
  showSuccess.value = false;
  showError.value = false;
  errorMessage.value = "";

  try {
    // Step 1: Get reCAPTCHA token
    const recaptchaToken = await executeRecaptcha();

    // Step 2: Prepare request data
    const requestData: ContactFormRequest = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      service: formData.service || props.serviceName || "General Inquiry",
      message: formData.message.trim() || undefined,
      recaptchaToken,
      metadata: {
        userAgent: navigator.userAgent,
        referrer: window.location.href,
        timestamp: new Date().toISOString(),
      },
    };

    // Step 3: Submit to API
    const response = await submitContactForm(requestData);

    // Step 4: Handle response
    if (response.success) {
      showSuccess.value = true;

      // Reset form
      formData.name = "";
      formData.email = "";
      formData.message = "";
      if (props.showServiceSelector) {
        formData.service = serviceOptions[0];
      }

      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        showSuccess.value = false;
      }, 10000);
    } else {
      // Handle error
      showError.value = true;
      errorMessage.value = getErrorMessage(response.error.code);

      logger.error("Form submission failed", response.error, {
        component: "CTAForm",
        errorCode: response.error.code,
      });
    }
  } catch (error) {
    // Handle unexpected errors (reCAPTCHA load failure, network issues, etc.)
    logger.error("Form submission error", error, {
      component: "CTAForm",
      action: "submit",
    });
    showError.value = true;
    errorMessage.value =
      "Unable to submit form. Please try again or email me directly.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div :class="formClasses">
    <h3 v-if="formTitle" class="text-xl font-bold text-white mb-5">
      {{ formTitle }}
    </h3>

    <!-- Cookies Disabled Warning -->
    <div
      v-if="cookiesDisabled"
      role="alert"
      class="mb-5 text-sm text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4"
    >
      <div class="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div>
          <p class="font-semibold mb-1">Cookies Required</p>
          <p class="text-amber-300/90">
            This form requires cookies for spam protection (reCAPTCHA). Please
            enable cookies in your browser settings to submit this form, or use
            the alternative contact methods below.
          </p>
        </div>
      </div>
    </div>

    <form class="space-y-3.5" @submit.prevent="handleSubmit">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300 mb-1">
          Name *
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          maxlength="100"
          class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          placeholder="John Doe"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300 mb-1">
          Email *
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          placeholder="john@example.com"
        />
      </div>

      <!-- Service Selection (Optional) -->
      <div v-if="showServiceSelector">
        <label
          for="service"
          class="block text-sm font-medium text-gray-300 mb-1"
        >
          Interested In
        </label>
        <select
          id="service"
          v-model="formData.service"
          class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
        >
          <option
            v-for="option in serviceOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>

      <!-- Message -->
      <div>
        <label
          for="message"
          class="block text-sm font-medium text-gray-300 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="2"
          maxlength="1000"
          class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none text-sm"
          placeholder="Brief project description..."
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <PrimaryButton
          type="submit"
          :disabled="isSubmitting || cookiesDisabled"
          class="flex-1"
        >
          {{
            isSubmitting
              ? "Sending..."
              : cookiesDisabled
                ? "Cookies Required"
                : "Send Request"
          }}
        </PrimaryButton>
        <span class="text-gray-500 text-sm">or</span>
        <a
          :href="SCHEDULING_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0"
        >
          <button
            type="button"
            class="px-4 py-2.5 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span class="text-sm">Call</span>
          </button>
        </a>
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccess"
        role="status"
        aria-live="polite"
        class="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3"
      >
        ✓ Message sent! I'll get back to you within 24 hours.
      </div>

      <!-- Error Message -->
      <div
        v-if="showError"
        role="alert"
        aria-live="assertive"
        class="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3"
      >
        ⚠ {{ errorMessage }}
      </div>

      <!-- reCAPTCHA Badge Notice -->
      <div class="text-xs text-gray-500 text-center">
        This site is protected by reCAPTCHA and the Google
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          class="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Privacy Policy
        </a>
        and
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          class="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Terms of Service
        </a>
        apply.
      </div>
    </form>
  </div>
</template>
