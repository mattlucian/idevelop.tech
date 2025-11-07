/**
 * reCAPTCHA v3 integration composable
 */

interface RecaptchaConfig {
  siteKey: string;
  action: string;
}

/**
 * Get reCAPTCHA token for form submission
 */
export function useRecaptcha() {
  const config: RecaptchaConfig = {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || "",
    action: "contact_form_submit",
  };

  /**
   * Execute reCAPTCHA and get token
   */
  const executeRecaptcha = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Check if grecaptcha is loaded
      if (typeof window === "undefined" || !window.grecaptcha) {
        reject(new Error("reCAPTCHA not loaded"));
        return;
      }

      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(config.siteKey, {
            action: config.action,
          });
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  return {
    executeRecaptcha,
  };
}

/**
 * TypeScript declaration for grecaptcha global
 */
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}
