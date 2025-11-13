/**
 * Email template utilities
 * Provides rendering functions for HTML email templates
 */

import { readFileSync } from "fs";
import { join } from "path";

/**
 * Color scheme matching site design
 */
export const EMAIL_COLORS = {
  primary: "#06b6d4", // cyan-500
  secondary: "#a855f7", // purple-500
  background: "#0a0a0a",
  cardBg: "#0f0f0f",
  text: "#ffffff",
  textMuted: "#94a3b8", // slate-400
  border: "#334155", // slate-700
};

/**
 * Gradients matching site design
 */
export const EMAIL_GRADIENTS = {
  primary: "linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)",
  header:
    "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
};

/**
 * Template variable substitution
 */
export interface TemplateVariables {
  [key: string]: string;
}

/**
 * Render template by substituting variables
 * Variables in templates use {{variableName}} syntax
 */
export function renderTemplate(
  template: string,
  variables: TemplateVariables,
): string {
  let rendered = template;

  // Replace all {{variableName}} with actual values
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, "g");
    rendered = rendered.replace(regex, value);
  }

  return rendered;
}

/**
 * Load and render an email template
 */
export function loadAndRenderTemplate(
  templateName: string,
  variables: TemplateVariables,
): string {
  const templatePath = join(__dirname, `${templateName}.html`);
  const template = readFileSync(templatePath, "utf-8");
  return renderTemplate(template, variables);
}

/**
 * Admin notification template variables
 */
export interface AdminNotificationVariables {
  name: string;
  email: string;
  service: string;
  message: string;
  requestId: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
}

/**
 * Sender confirmation template variables
 */
export interface SenderConfirmationVariables {
  name: string;
  service: string;
  message: string;
  timestamp: string;
}

/**
 * Render admin notification email
 */
export function renderAdminNotification(
  variables: AdminNotificationVariables,
): string {
  return loadAndRenderTemplate("admin-notification", {
    name: variables.name,
    email: variables.email,
    service: variables.service,
    message: variables.message || "(no message provided)",
    requestId: variables.requestId,
    timestamp: variables.timestamp,
    userAgent: variables.userAgent || "N/A",
    referrer: variables.referrer || "N/A",
  });
}

/**
 * Render sender confirmation email
 */
export function renderSenderConfirmation(
  variables: SenderConfirmationVariables,
): string {
  return loadAndRenderTemplate("sender-confirmation", {
    name: variables.name,
    service: variables.service,
    message: variables.message || "(no message provided)",
    timestamp: variables.timestamp,
  });
}
