<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCookieConsent } from "@/composables/useCookieConsent";
import PrimaryButton from "../elements/buttons/PrimaryButton.vue";
import OutlineButton from "../elements/buttons/OutlineButton.vue";

const showBanner = ref(false);

const {
  hasConsent,
  loadConsent,
  acceptConsent,
  declineConsent,
  loadRecaptchaScript,
  loadGoogleAnalytics,
  hasAnalyticsConsent,
} = useCookieConsent();

/**
 * Check if user has already made a choice
 * If not, show the banner
 * If yes, load appropriate scripts based on consent
 */
onMounted(() => {
  loadConsent();

  if (!hasConsent.value) {
    showBanner.value = true;
  } else {
    // Always load essential cookies (reCAPTCHA)
    loadRecaptchaScript();
    // Load analytics only if user accepted
    if (hasAnalyticsConsent.value) {
      loadGoogleAnalytics();
    }
  }
});

/**
 * Handle user declining analytics (essential only)
 */
const handleDecline = () => {
  declineConsent();
  showBanner.value = false;
};

/**
 * Handle user accepting all cookies
 */
const handleAccept = () => {
  acceptConsent();
  showBanner.value = false;
};
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f0f] border-t border-slate-700 shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-notice-title"
      aria-describedby="cookie-notice-description"
    >
      <div class="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div
          class="flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <!-- Icon -->
          <div class="shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h3
              id="cookie-notice-title"
              class="text-base font-semibold text-white mb-1"
            >
              Cookie Notice
            </h3>
            <p id="cookie-notice-description" class="text-sm text-gray-200">
              We use essential cookies for spam protection on our contact forms.
              We also use analytics cookies to improve your experience.
              <RouterLink
                to="/privacy"
                class="text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                Learn more about our privacy policy
              </RouterLink>
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="shrink-0 w-full md:w-auto flex gap-3">
            <OutlineButton
              color-scheme="gray"
              class="flex-1 md:flex-initial opacity-70"
              @click="handleDecline"
            >
              Decline
            </OutlineButton>
            <PrimaryButton class="flex-1 md:flex-initial" @click="handleAccept">
              Accept
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
