/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "idevelop-tech",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // Stage-specific configuration
    const stage = $app.stage;
    const isProduction = stage === "production";

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
      handler: "packages/functions/src/contact.handler",
      runtime: "nodejs20.x",
      memory: "512 MB",
      timeout: "10 seconds",
      environment: {
        RATE_LIMIT_TABLE_NAME: rateLimitTable.name,
        RECAPTCHA_SECRET_PARAMETER: `/idevelop-tech/${stage}/recaptcha-secret`,
        SES_FROM_EMAIL: "matt@idevelop.tech", // Using matt@ for now, will change to noreply@ later
        SES_TO_EMAIL: "matt@idevelop.tech",
        STAGE: stage,
      },
      permissions: [
        {
          actions: ["dynamodb:PutItem", "dynamodb:Query"],
          resources: [rateLimitTable.arn],
        },
        {
          actions: ["ses:SendEmail", "ses:SendRawEmail"],
          // Scoped to verified SES identities for security
          resources: [
            'arn:aws:ses:us-east-1:*:identity/matt@idevelop.tech',
            'arn:aws:ses:us-east-1:*:identity/idevelop.tech',
          ],
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
        },
      },
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
                  value:
                    "default-src 'self'; " +
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com; " +
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                    "font-src 'self' https://fonts.gstatic.com; " +
                    "img-src 'self' data: https:; " +
                    "connect-src 'self' " +
                    (isProduction
                      ? "https://api.idevelop.tech https://www.google-analytics.com https://analytics.google.com"
                      : "https://dev-api.idevelop.tech http://localhost:5173") +
                    "; " +
                    "frame-src https://www.google.com; " +
                    "base-uri 'self'; " +
                    "form-action 'self';",
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
