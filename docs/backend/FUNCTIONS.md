# Lambda Functions

Backend Lambda functions for idevelop.tech.

## Contact Form Handler

**Handler:** `src/contact.ts`

Processes contact form submissions with:
- Request validation
- reCAPTCHA verification
- Rate limiting (IP and email based)
- Email delivery to both sender and admin

### Email Flow

When a user submits the contact form:
1. Single email sent to **both** sender and admin (creates shared thread)
2. Uses `contact-confirmation.html` template
3. Any reply automatically includes both parties

### Email Templates

**Active Template:**
- `src/email-templates/contact-confirmation.html` - Customer-facing confirmation email

**Archived Template:**
- `src/email-templates/sender-confirmation.html` - Kept for future use (not currently deployed)

### Preview Emails

Preview email templates locally without deployment:

```bash
npm run preview-emails
```

This generates an HTML preview file in `preview/contact-confirmation.html` that you can open in your browser.

### Template Customization

Templates support variable substitution using `{{variableName}}` syntax:
- `{{logoUrl}}` - Logo image URL
- `{{name}}` - User's name
- `{{email}}` - User's email
- `{{service}}` - Service they're interested in
- `{{message}}` - Their message
- `{{timestamp}}` - Human-friendly submission time with timezone
- `{{requestId}}` - Unique request ID for reference

### Logo Styling

The logo uses a CSS filter to match the website's teal branding:
```css
filter: brightness(0) saturate(100%) invert(70%) sepia(50%) saturate(500%) hue-rotate(130deg) brightness(100%) contrast(90%);
```

This converts the black logo to the same teal color used on service pages.
