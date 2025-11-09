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

    // Frontend Static Site
    const web = new sst.aws.StaticSite("Web", {
      path: "packages/web",
      build: {
        command: "npm run build",
        output: "dist",
      },
      // Custom domain disabled for initial deployment
      // Will enable in future PR after testing CloudFront deployment
      // ...(isProduction && {
      //   domain: {
      //     name: "idevelop.tech",
      //     redirects: ["www.idevelop.tech"],
      //   },
      // }),
      environment: {
        VITE_API_URL: "", // Will add API URL when backend is implemented
        VITE_RECAPTCHA_SITE_KEY: "6Lc2tf0rAAAAADcg5fae_hlq6hWoUUdtu_CQsjcw",
        // Only enable Google Analytics in production
        VITE_GA_MEASUREMENT_ID: isProduction ? "G-XS6QVSG7MS" : "",
      },
    });

    return {
      web: web.url,
      stage: stage,
    };
  },
});
