/**
 * Email template utilities
 * Provides rendering functions for HTML email templates
 */

import { readFileSync } from "fs";
import { join } from "path";

/**
 * Logo URL for email templates
 * Uses production CDN URL for reliable email delivery
 */
const LOGO_URL = process.env.LOGO_URL || "https://dxeay6n8brs8g.cloudfront.net/images/brand/logo-black.png";

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
 * Templates are copied to email-templates/ directory in Lambda package via copyFiles
 * @throws Error if template file cannot be loaded or is invalid
 */
export function loadAndRenderTemplate(
  templateName: string,
  variables: TemplateVariables,
): string {
  try {
    // In Lambda, copied files are in email-templates/ relative to process.cwd()
    const templatePath = join(process.cwd(), "email-templates", `${templateName}.html`);
    const template = readFileSync(templatePath, "utf-8");

    if (!template || template.trim().length === 0) {
      throw new Error(`Template file "${templateName}.html" is empty`);
    }

    return renderTemplate(template, variables);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Failed to load email template "${templateName}":`, errorMessage);
    throw new Error(
      `Failed to load email template "${templateName}": ${errorMessage}. ` +
      `Ensure template file exists in email-templates/ directory.`
    );
  }
}

/**
 * Contact confirmation template variables
 */
export interface ContactConfirmationVariables {
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
 * Render contact confirmation email (sent to both user and admin)
 */
export function renderContactConfirmation(
  variables: ContactConfirmationVariables,
): string {
  return loadAndRenderTemplate("contact-confirmation", {
    logoUrl: LOGO_URL,
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
    logoUrl: LOGO_URL,
    name: variables.name,
    service: variables.service,
    message: variables.message || "(no message provided)",
    timestamp: variables.timestamp,
  });
}
