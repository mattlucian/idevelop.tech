import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import * as tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/no-required-prop-with-default': 'off',

      // General rules
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off', // Vue Composition API uses props without explicit usage
    },
  },
  {
    ignores: ['dist', 'node_modules', '*.d.ts'],
  },
]
