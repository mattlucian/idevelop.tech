<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMeta } from "@/composables/useMeta";
import { CONTACT } from "@/constants";
import OutlineButton from "@/components/elements/buttons/OutlineButton.vue";

useMeta({
  title: "Privacy Policy - idevelop.tech",
  description:
    "Simple, transparent privacy. We use cookies for spam protection and analytics. We don't sell your data. Marketing emails require opt-in consent.",
});

const COOKIE_CONSENT_KEY = "cookie_consent";

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  timestamp: string;
}

const consentStatus = ref<CookieConsent | null>(null);
const showRevokeSuccess = ref(false);
const successMessage = ref("");
const isGALoaded = ref(false);

/**
 * Check if Google Analytics is actually loaded
 */
const checkGALoaded = (): boolean => {
  return (
    typeof window.gtag !== "undefined" &&
    typeof window.dataLayer !== "undefined"
  );
};

/**
 * Load current consent status from localStorage
 */
onMounted(() => {
  const consentJson = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (consentJson) {
    consentStatus.value = JSON.parse(consentJson);
  }

  // Check if GA is actually loaded
  isGALoaded.value = checkGALoaded();
});

/**
 * Delete Google Analytics cookies
 * Note: This only deletes cookies on our domain (localhost/idevelop.tech).
 * Third-party cookies on Google's domains (.google.com) cannot be deleted
 * from our code due to browser security restrictions.
 */
const deleteAnalyticsCookies = () => {
  const hostname = window.location.hostname;
  const cookiesToDelete = ["_ga", "_gid", "_gat"];

  // Helper function to delete a single cookie with all domain variations
  const deleteCookie = (name: string) => {
    // Delete without domain (works for localhost)
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // Delete with dot-prefixed domain (e.g., .idevelop.tech)
    // Skip for localhost as it doesn't support dot-prefix
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;

      // Also try parent domain if applicable (e.g., .tech from idevelop.tech)
      const parts = hostname.split(".");
      if (parts.length > 2) {
        const parentDomain = parts.slice(1).join(".");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${parentDomain};`;
      }
    }
  };

  // Delete standard GA cookies
  cookiesToDelete.forEach(deleteCookie);

  // Delete property-specific GA cookies (pattern: _ga_*)
  const allCookies = document.cookie.split(";");
  allCookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0]?.trim();
    if (cookieName?.startsWith("_ga_")) {
      deleteCookie(cookieName);
    }
  });
};

/**
 * Revoke analytics consent
 */
const revokeConsent = () => {
  // Delete GA cookies immediately (if any exist on our domain)
  deleteAnalyticsCookies();

  // Update consent preference to analytics = false
  const newConsent: CookieConsent = {
    essential: true,
    analytics: false,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
  consentStatus.value = newConsent;

  // Show success message
  successMessage.value =
    "Analytics consent revoked successfully. Google Analytics will not load on future visits. Reloading page...";
  showRevokeSuccess.value = true;
  setTimeout(() => {
    showRevokeSuccess.value = false;
  }, 5000);

  // Reload page to stop any running GA scripts
  setTimeout(() => {
    window.location.reload();
  }, 1500);
};

/**
 * Re-enable analytics consent
 */
const enableConsent = () => {
  // Update consent preference to analytics = true
  const newConsent: CookieConsent = {
    essential: true,
    analytics: true,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
  consentStatus.value = newConsent;

  // Show success message
  successMessage.value =
    "Analytics consent enabled successfully. Google Analytics will start tracking on reload. Reloading page...";
  showRevokeSuccess.value = true;
  setTimeout(() => {
    showRevokeSuccess.value = false;
  }, 5000);

  // Reload page to load GA scripts
  setTimeout(() => {
    window.location.reload();
  }, 1500);
};
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white pt-16">
    <!-- Header -->
    <div
      class="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border-b border-slate-700"
    >
      <div class="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p class="text-lg text-gray-300">
          Simple, transparent privacy. We don't sell your data. Marketing emails
          require your consent.
        </p>
        <p class="text-sm text-gray-400 mt-2">Last Updated: October 31, 2025</p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <div class="prose prose-invert max-w-none space-y-8">
        <!-- Quick Summary -->
        <section
          class="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6"
        >
          <h2 class="text-xl font-semibold text-cyan-400 mb-3">
            Quick Summary
          </h2>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-1">✓</span>
              <span>We use cookies for spam protection on contact forms</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-1">✓</span>
              <span>We use analytics to improve the site experience</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-1">✓</span>
              <span
                >We may send marketing emails if you opt-in (you can unsubscribe
                anytime)</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-1">✓</span>
              <span>We don't sell or rent your personal information</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-1">✓</span>
              <span>You can contact us anytime about your data</span>
            </li>
          </ul>
        </section>

        <!-- Cookie Consent Status -->
        <section
          v-if="consentStatus"
          class="bg-slate-900/60 border border-slate-700 rounded-xl p-6"
        >
          <h2 class="text-xl font-semibold text-white mb-4">
            Your Cookie Consent Status
          </h2>

          <!-- Consent Info -->
          <div class="space-y-3 mb-4">
            <div class="flex items-center gap-3">
              <span class="text-emerald-400 text-lg">✓</span>
              <span class="text-gray-300"
                ><strong class="text-white">Essential Cookies:</strong> Enabled
                (required for contact forms)</span
              >
            </div>
            <div class="flex items-center gap-3">
              <span
                :class="
                  consentStatus.analytics
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                "
              >
                {{ consentStatus.analytics ? "✓" : "✗" }}
              </span>
              <span class="text-gray-300">
                <strong class="text-white">Analytics Cookies:</strong>
                {{ consentStatus.analytics ? "Enabled" : "Disabled" }}
              </span>
            </div>

            <!-- Google Analytics Loading Status -->
            <div class="flex items-center gap-3 pl-6">
              <span
                :class="isGALoaded ? 'text-emerald-400' : 'text-slate-500'"
                class="text-sm"
              >
                {{ isGALoaded ? "●" : "○" }}
              </span>
              <span class="text-sm text-gray-400">
                <strong class="text-gray-300">Google Analytics Script:</strong>
                {{ isGALoaded ? "Currently Loaded" : "Not Loaded" }}
              </span>
            </div>

            <p class="text-sm text-gray-400 mt-2">
              Last updated:
              {{ new Date(consentStatus.timestamp).toLocaleDateString() }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <!-- Revoke Button (only show if analytics enabled) -->
            <div v-if="consentStatus.analytics">
              <OutlineButton color-scheme="gray" @click="revokeConsent">
                Revoke Analytics Consent
              </OutlineButton>
              <p class="text-sm text-gray-400 mt-2">
                This will prevent Google Analytics from loading and stop future
                tracking. Any existing cookies on our domain will be deleted.
                Essential cookies (reCAPTCHA) will remain active for contact
                form security. The page will reload after revoking consent.
              </p>
            </div>

            <!-- Enable Button (only show if analytics disabled) -->
            <div v-else>
              <OutlineButton color-scheme="cyan" @click="enableConsent">
                Enable Analytics Cookies
              </OutlineButton>
              <p class="text-sm text-gray-400 mt-2">
                This will enable Google Analytics tracking to help us improve
                the site experience. The page will reload after enabling.
              </p>
            </div>
          </div>

          <!-- Success Message -->
          <div
            v-if="showRevokeSuccess"
            class="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3"
          >
            <p class="text-emerald-400 text-sm">✓ {{ successMessage }}</p>
          </div>
        </section>

        <!-- No Consent Yet -->
        <section
          v-else
          class="bg-slate-900/60 border border-slate-700 rounded-xl p-6"
        >
          <h2 class="text-xl font-semibold text-white mb-3">
            Your Cookie Consent Status
          </h2>
          <p class="text-gray-300 mb-3">
            You haven't made a choice about cookies yet. When you visit other
            pages on this site, you'll see a cookie notice banner at the bottom
            of the screen.
          </p>
          <p class="text-sm text-gray-400">
            You can choose to accept analytics cookies or decline them
            (essential cookies for spam protection will always be active).
          </p>
        </section>

        <!-- What Data We Collect -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            What Data We Collect
          </h2>

          <h3 class="text-xl font-semibold text-white mb-3">Contact Forms</h3>
          <p class="text-gray-300 mb-4">
            When you submit a contact form, we collect:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-300 mb-6">
            <li>Your name and email address (required)</li>
            <li>The service you're interested in</li>
            <li>Your message (optional)</li>
            <li>Technical information (IP address, browser type, timestamp)</li>
          </ul>

          <h3 class="text-xl font-semibold text-white mb-3">Cookies</h3>
          <p class="text-gray-300 mb-4">
            We use cookies to protect our contact forms from spam. These cookies
            are set by Google reCAPTCHA and help us distinguish real users from
            automated bots.
          </p>

          <h3 class="text-xl font-semibold text-white mb-3">Analytics</h3>
          <p class="text-gray-300">
            We use Google Analytics to understand how visitors use our site and
            improve the experience. Google Analytics may track your activity
            across websites. See
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              class="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Google's Privacy Policy
            </a>
            for details.
          </p>
        </section>

        <!-- How We Use Your Data -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            How We Use Your Data
          </h2>
          <p class="text-gray-300 mb-4">We use your information to:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Respond to your inquiries and provide information about our
              services
            </li>
            <li>Protect our contact forms from spam and abuse</li>
            <li>Improve our website and services (analytics)</li>
            <li>
              Send you marketing communications about our services (only with
              your explicit consent)
            </li>
            <li>Comply with legal obligations</li>
          </ul>
          <p class="text-gray-300 mt-4">
            <strong class="text-white">Marketing Communications:</strong> If you
            opt-in to receive marketing emails, we may use third-party email
            marketing platforms to send you updates about our services. You can
            unsubscribe at any time using the link in any marketing email.
          </p>
        </section>

        <!-- Cookies in Detail -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">Cookies in Detail</h2>
          <p class="text-gray-300 mb-4">
            Cookies are small text files stored on your device. We use two types
            of cookies:
          </p>

          <div class="space-y-4">
            <div
              class="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4"
            >
              <h4 class="text-lg font-semibold text-emerald-400 mb-2">
                Essential Cookies (Always Active)
              </h4>
              <p class="text-gray-300 mb-3">
                These cookies are necessary for the website to function and
                cannot be declined.
              </p>

              <div
                class="bg-[#0f0f0f] border border-slate-700 rounded-lg p-3 mb-2"
              >
                <h5 class="text-base font-semibold text-white mb-2">
                  reCAPTCHA Cookies
                </h5>
                <p class="text-sm text-gray-300 mb-2">
                  Required to protect contact forms from spam and bots. Without
                  these, contact forms cannot function securely.
                </p>
                <ul
                  class="list-disc list-inside space-y-1 text-sm text-gray-400"
                >
                  <li><code>_GRECAPTCHA</code> - Bot detection (6 months)</li>
                  <li>
                    <code>rc::a</code>, <code>rc::b</code>, <code>rc::c</code> -
                    Session analysis
                  </li>
                </ul>
                <p class="text-xs text-gray-500 mt-2">
                  Managed by Google. See
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Google's Privacy Policy
                  </a>
                </p>
              </div>

              <div class="bg-[#0f0f0f] border border-slate-700 rounded-lg p-3">
                <h5 class="text-base font-semibold text-white mb-2">
                  Cookie Consent Preference
                </h5>
                <p class="text-sm text-gray-300">
                  Stored in your browser's local storage (not a cookie) to
                  remember your cookie choice.
                </p>
              </div>
            </div>

            <div
              class="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4"
            >
              <h4 class="text-lg font-semibold text-cyan-400 mb-2">
                Analytics Cookies (Optional)
              </h4>
              <p class="text-gray-300 mb-3">
                These cookies help us understand how visitors use our site. You
                can decline these.
              </p>

              <div class="bg-[#0f0f0f] border border-slate-700 rounded-lg p-3">
                <h5 class="text-base font-semibold text-white mb-2">
                  Google Analytics Cookies
                </h5>
                <p class="text-sm text-gray-300 mb-2">
                  Tracks page views, user behavior, and site usage statistics.
                </p>
                <ul
                  class="list-disc list-inside space-y-1 text-sm text-gray-400"
                >
                  <li>
                    <code>_ga</code> - Unique user identification (2 years)
                  </li>
                  <li><code>_ga_*</code> - Session state (2 years)</li>
                  <li><code>_gid</code> - User identification (24 hours)</li>
                </ul>
                <p class="text-xs text-gray-500 mt-2">
                  Managed by Google. See
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Google's Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- We Don't Sell Your Data -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            We Don't Sell Your Data
          </h2>
          <p class="text-gray-300 mb-4">Let's be clear:</p>
          <div
            class="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4"
          >
            <p class="text-gray-300 mb-3">
              <strong class="text-emerald-400"
                >We do not sell or rent your personal information to third
                parties.</strong
              >
              Your contact information is used to respond to your inquiries,
              improve our services, and (with your explicit consent) send you
              marketing communications about our services.
            </p>
            <p class="text-gray-300">
              We may use third-party service providers (such as email marketing
              platforms) to send marketing communications to those who have
              opted in. These providers have their own privacy policies.
            </p>
          </div>
        </section>

        <!-- Third-Party Services -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            Third-Party Services
          </h2>
          <p class="text-gray-300 mb-4">We use these third-party services:</p>

          <div class="space-y-4">
            <div class="bg-[#0f0f0f] border border-slate-700 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-white mb-2">
                Google reCAPTCHA
              </h4>
              <p class="text-gray-300">
                Protects our contact forms from spam. Subject to
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Google's Privacy Policy
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
                .
              </p>
            </div>

            <div class="bg-[#0f0f0f] border border-slate-700 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-white mb-2">
                Amazon Web Services (AWS)
              </h4>
              <p class="text-gray-300">
                Hosts our API and stores form submissions securely. Subject to
                <a
                  href="https://aws.amazon.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  AWS Privacy Notice
                </a>
                .
              </p>
            </div>

            <div class="bg-[#0f0f0f] border border-slate-700 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-white mb-2">
                Google Analytics
              </h4>
              <p class="text-gray-300">
                Tracks site usage and visitor behavior. Subject to
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Google's Privacy Policy
                </a>
                and
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  How Google uses data
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <!-- Your Rights (GDPR Compliance) -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">Your Data Rights</h2>
          <p class="text-gray-300 mb-4">
            Under applicable privacy laws (including GDPR for EU residents), you
            may:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>Access:</strong> Request information about data we have
              about you
            </li>
            <li>
              <strong>Correction:</strong> Request we correct inaccurate
              information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your contact
              information
            </li>
            <li>
              <strong>Opt-out:</strong> Decline cookies (note: contact forms
              require cookies)
            </li>
            <li>
              <strong>Unsubscribe:</strong> Opt out of marketing emails at any
              time using the unsubscribe link in emails
            </li>
          </ul>
          <p class="text-gray-300 mt-4">
            To make a request, contact us at
            <a
              :href="`mailto:${CONTACT.email}`"
              class="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {{ CONTACT.email }}
            </a>
            . We'll respond within a reasonable timeframe.
          </p>
        </section>

        <!-- Security -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">Security</h2>
          <p class="text-gray-300">
            We take reasonable measures to protect your data from unauthorized
            access, disclosure, alteration, or destruction. This includes
            encryption in transit (HTTPS) and at rest (AWS encryption), access
            controls, and regular security reviews.
          </p>
        </section>

        <!-- Children's Privacy -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
          <p class="text-gray-300">
            Our services are not directed to children under 13. We do not
            knowingly collect personal information from children. If you believe
            we have collected information from a child, please contact us
            immediately.
          </p>
        </section>

        <!-- Changes to This Policy -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-4">
            Changes to This Policy
          </h2>
          <p class="text-gray-300">
            We may update this privacy policy from time to time. Changes will be
            posted on this page with an updated "Last Updated" date. For
            significant changes, we'll provide prominent notice.
          </p>
        </section>

        <!-- Contact Us -->
        <section class="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-4">Questions?</h2>
          <p class="text-gray-300 mb-4">
            If you have questions about this privacy policy or how we handle
            your data, contact us:
          </p>
          <div class="space-y-2">
            <p class="text-gray-300">
              <strong class="text-white">Email:</strong>
              <a
                :href="`mailto:${CONTACT.email}`"
                class="text-cyan-400 hover:text-cyan-300 transition-colors ml-2"
              >
                {{ CONTACT.email }}
              </a>
            </p>
            <p class="text-gray-300">
              <strong class="text-white">Location:</strong>
              <span class="ml-2">{{ CONTACT.location }}</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
