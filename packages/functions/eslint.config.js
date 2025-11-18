import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  // Ignore config files and build artifacts
  {
    ignores: [
      "node_modules",
      "*.d.ts",
      "eslint.config.js", // Ignore this config file itself
      "scripts/**/*", // Ignore scripts directory
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"], // Only apply to TypeScript source files
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Code quality rules (catch DeepSource issues locally)
      "default-case": "warn", // Catch missing default in switch statements (DeepSource JS-0047)
      "prefer-template": "warn", // Prefer template literals over string concatenation
      "no-useless-concat": "error", // Catch useless string concatenation

      // Development rules
      "no-console": "off", // Console is fine in Lambda functions (goes to CloudWatch)

      // TypeScript unused vars
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
