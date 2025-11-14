/**
 * Email Template Preview Script
 *
 * Generates HTML preview files for email templates
 * Run: npx tsx scripts/preview-email.ts
 */

import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple template renderer for preview (bypasses Lambda-specific paths)
function renderTemplate(templateName: string, variables: Record<string, string>): string {
  const templatePath = join(__dirname, "..", "src", "email-templates", `${templateName}.html`);
  let template = readFileSync(templatePath, "utf-8");

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, "g");
    template = template.replace(regex, value);
  }

  return template;
}

// Sample data for preview
const logoUrl = "https://dxeay6n8brs8g.cloudfront.net/images/brand/logo-black.png";

const contactConfirmationData = {
  logoUrl,
  name: "John Smith",
  email: "john.smith@example.com",
  service: "E-commerce Integration",
  message: "I'm interested in integrating my Shopify store with our existing ERP system. We process about 500 orders per day and need real-time inventory sync. Can you help with this?",
  requestId: "preview-12345678-abcd-efgh-ijkl-123456789012",
  timestamp: new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }),
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  referrer: "https://idevelop.tech/services/e-commerce-integration",
};

// Create preview directory
const previewDir = join(__dirname, "..", "preview");
mkdirSync(previewDir, { recursive: true });

console.log("🎨 Generating email template preview...\n");

// Generate contact confirmation preview
try {
  const confirmationHtml = renderTemplate("contact-confirmation", contactConfirmationData);
  const confirmationPath = join(previewDir, "contact-confirmation.html");
  writeFileSync(confirmationPath, confirmationHtml, "utf-8");
  console.log(`✅ Contact Confirmation: ${confirmationPath}`);
} catch (error) {
  console.error("❌ Failed to generate contact confirmation:", error);
}

console.log("\n🌐 Open the HTML file in your browser to preview the email");
console.log(`   Preview directory: ${previewDir}\n`);
