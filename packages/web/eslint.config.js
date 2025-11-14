import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import vueEslintConfigPrettier from "@vue/eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig(),
  vueEslintConfigPrettier,
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Vue rules
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "warn",
      "vue/require-default-prop": "warn", // Catch missing prop defaults (DeepSource JS-0682)
      "vue/no-required-prop-with-default": "off",

      // Code quality rules (catch DeepSource issues locally)
      "default-case": "warn", // Catch missing default in switch statements (DeepSource JS-0047)

      // Development rules (allow during dev, should be removed before production)
      "no-console": "warn", // Warn but don't error (we gate these with import.meta.env.DEV)
      "no-debugger": "warn",

      // TypeScript handles unused vars better than ESLint for Vue
      "no-unused-vars": "off",
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
  {
    ignores: ["dist", "dev-dist", "node_modules", "*.d.ts"],
  },
];
