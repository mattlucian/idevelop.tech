import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // TypeScript files with type-aware linting
  {
    files: ["src/**/*.ts"],
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
  // JavaScript config files (no type-aware linting needed)
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  {
    ignores: ["node_modules", "*.d.ts"],
  },
];
