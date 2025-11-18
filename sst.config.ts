/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "idevelop-tech",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      // Use AWS profile locally, OIDC role in CI/CD
      providers: process.env.CI
        ? undefined // CI/CD uses OIDC role from GitHub Actions
        : {
            aws: {
              profile: "idevelop-tech", // Local development profile
            },
          },
    };
  },
  async run() {
    // Stage-specific configuration
    const stage = $app.stage;
    const isProduction = stage === "production";

    // New Relic observability configuration
    const newRelicLicenseKey = new sst.Secret("NewRelicLicenseKey");
    const newRelicAccountId = "7377610"; // New Relic account ID (not sensitive)

    // DynamoDB Table for Rate Limiting
    const rateLimitTable = new sst.aws.Dynamo("RateLimitTable", {
      fields: {
        pk: "string", // Primary key: "IP#{ip}" or "EMAIL#{email}"
        sk: "string", // Sort key: Timestamp ISO string
      },
      primaryIndex: { hashKey: "pk", rangeKey: "sk" },
      ttl: "ttl", // Auto-delete old records
    });

    // API Gateway HTTP API
    const api = new sst.aws.ApiGatewayV2("Api", {
      domain: isProduction ? "api.idevelop.tech" : "dev-api.idevelop.tech",
      cors: {
        allowOrigins: isProduction
          ? ["https://idevelop.tech", "https://www.idevelop.tech"]
          : ["http://localhost:5173", "https://dev.idevelop.tech"],
        allowMethods: ["POST", "OPTIONS"],
        allowHeaders: ["Content-Type"],
      },
    });

    // Lambda Function for Contact Form
    const contactHandler = new sst.aws.Function("ContactHandler", {
      handler: "packages/functions/src/contact.handler", // Contact handler with New Relic instrumentation
      runtime: "nodejs20.x",
      architecture: "arm64",
      memory: "512 MB",
      timeout: "30 seconds",

      // Lambda layers for observability
      layers: [
        // New Relic Node.js 20 APM Agent + Extension - ARM64
        // Includes full APM instrumentation for code-level tracing
        // Latest versions: https://layers.newrelic-external.com/
        "arn:aws:lambda:us-east-1:451483290750:layer:NewRelicNodeJS20XARM64:95",
      ],

      environment: {
        // Application environment variables
        RATE_LIMIT_TABLE_NAME: rateLimitTable.name,
        RECAPTCHA_SECRET_PARAMETER: `/idevelop-tech/${stage}/recaptcha-secret`,
        SES_FROM_EMAIL: "matt@idevelop.tech",
        SES_TO_EMAIL: "matt@idevelop.tech",
        STAGE: stage,

        // New Relic observability configuration
        NEW_RELIC_LICENSE_KEY: newRelicLicenseKey.value,
        NEW_RELIC_ACCOUNT_ID: newRelicAccountId,
        NEW_RELIC_APP_NAME: isProduction
          ? "api-idevelop-tech" // Production: api.idevelop.tech
          : "dev-api-idevelop-tech", // Development: dev-api.idevelop.tech
        NEW_RELIC_LAMBDA_HANDLER: "packages/functions/src/contact.handler", // Path to actual handler for ESM wrapper
        NEW_RELIC_LOG_LEVEL: "info", // APM agent log level (controls trace verbosity)
        NEW_RELIC_EXTENSION_SEND_FUNCTION_LOGS: "true", // Send Lambda logs to New Relic
        NEW_RELIC_LAMBDA_EXTENSION_ENABLED: "true", // Enable New Relic extension
        NEW_RELIC_DATA_COLLECTION_TIMEOUT: "10s", // Timeout for data collection
        NEW_RELIC_EXTENSION_LOG_LEVEL: "INFO", // Extension log level
      },

      // Link New Relic secret for runtime access
      link: [newRelicLicenseKey],
      permissions: [
        {
          actions: ["dynamodb:PutItem", "dynamodb:Query"],
          resources: [rateLimitTable.arn],
        },
        {
          actions: ["ses:SendEmail", "ses:SendRawEmail"],
          // Allow sending from verified identities to any email address
          // Note: In SES sandbox mode, can only send to verified addresses
          // In production mode, can send to any address
          resources: ["*"],
        },
        {
          actions: ["ssm:GetParameter"],
          // Scoped to stage-specific parameters in us-east-1
          resources: [
            `arn:aws:ssm:us-east-1:*:parameter/idevelop-tech/${stage}/*`,
          ],
        },
      ],
      nodejs: {
        esbuild: {
          minify: isProduction,
          sourcemap: !isProduction,
          external: ["newrelic"], // Provided by New Relic Lambda layer at runtime
        },
      },
      copyFiles: [
        {
          from: "packages/functions/src/email-templates/contact-confirmation.html",
          to: "email-templates/contact-confirmation.html",
        },
      ],
    });

    // API Routes
    api.route("POST /v1/contact", contactHandler.arn);

    // Frontend Static Site
    const web = new sst.aws.StaticSite("Web", {
      path: "packages/web",
      build: {
        command: "npm run build",
        output: "dist",
      },
      // IMPORTANT: Custom domain disabled for production until Phase 7
      // Current production site: idevelop.tech (Wix) - intentionally not migrated yet
      // New CloudFront site available for testing at CloudFront URL
      // Phase 7 will migrate DNS from Wix to CloudFront
      domain: isProduction
        ? undefined // No custom domain - uses CloudFront URL
        : {
            name: "dev.idevelop.tech",
          },
      environment: {
        VITE_API_URL: $interpolate`${api.url}`,
        VITE_RECAPTCHA_SITE_KEY: "6Lc2tf0rAAAAADcg5fae_hlq6hWoUUdtu_CQsjcw",
        // Only enable Google Analytics in production
        VITE_GA_MEASUREMENT_ID: isProduction ? "G-XS6QVSG7MS" : "",
      },
      transform: {
        cdn: {
          // CloudFront response headers for security and performance
          responseHeadersPolicy: {
            customHeadersConfig: {
              items: [
                {
                  header: "Content-Security-Policy",
                  value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' ${isProduction ? 'https://api.idevelop.tech https://www.google-analytics.com https://analytics.google.com' : 'https://dev-api.idevelop.tech http://localhost:5173'}; frame-src https://www.google.com; base-uri 'self'; form-action 'self';`,
                  override: true,
                },
                {
                  header: "X-Content-Type-Options",
                  value: "nosniff",
                  override: true,
                },
                {
                  header: "X-Frame-Options",
                  value: "SAMEORIGIN",
                  override: true,
                },
                {
                  header: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                  override: true,
                },
                {
                  header: "Permissions-Policy",
                  value:
                    "geolocation=(), microphone=(), camera=(), payment=()",
                  override: true,
                },
              ],
            },
            securityHeadersConfig: {
              strictTransportSecurity: {
                accessControlMaxAgeSec: 31536000,
                includeSubdomains: true,
                preload: true,
                override: true,
              },
            },
          },
        },
      },
    });

    return {
      web: web.url,
      api: api.url,
      stage,
    };
  },
});
