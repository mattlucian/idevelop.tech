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
    // Frontend Static Site
    const web = new sst.aws.StaticSite("Web", {
      path: "packages/web",
      build: {
        command: "npm run build",
        output: "dist",
      },
      // NO custom domain - will use CloudFront URL
      // Custom domain will be added later after DNS migration
      environment: {
        VITE_API_URL: "", // Will add API URL in later step
        VITE_RECAPTCHA_SITE_KEY: "6Lc2tf0rAAAAADcg5fae_hlq6hWoUUdtu_CQsjcw",
        VITE_GA_MEASUREMENT_ID: "G-XS6QVSG7MS",
      },
    });

    return {
      web: web.url,
    };
  },
});
