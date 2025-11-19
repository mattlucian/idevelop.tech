# Configuration Reference

This document covers the key configuration files we customize in the project. For standard configuration files (package.json, .gitignore, etc.), refer to inline comments in those files.

---

## Application Constants

### `src/constants/index.ts`

**Purpose:** Centralized application-wide constants for URLs, contact information, and site configuration.

**When to modify:**

- Updating external URLs (scheduling links, social media)
- Changing contact information
- Modifying site metadata

**Important:** When updating constants, manually sync these static files:

- `/index.html` - Meta tags and JSON-LD structured data (lines 21-56, 83-129)
- `/public/robots.txt` - Sitemap URL (line 7)
- `/public/sitemap.xml` - All URL locations

**Usage in components:**

```typescript
import { SCHEDULING_LINK, CONTACT, SITE } from "@/constants";
```

---

## Build Configuration

### `vite.config.ts`

**Purpose:** Vite build tool and dev server configuration.

**Key customizations:**

- Path aliases: `@` → `./src`
- Vue plugin with JSX support
- TypeScript support with separate type checking

**Common modifications:**

```typescript
export default defineConfig({
  server: {
    port: 3000, // Change dev server port
    proxy: {
      "/api": "http://localhost:8080", // Proxy API calls
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

**Docs:** [Vite Configuration](https://vitejs.dev/config/)

---

## TypeScript Configuration

### `tsconfig.app.json`

**Purpose:** TypeScript configuration for application source code.

**Key settings:**

- Strict mode enabled
- Path mappings for `@/*`
- Vue-specific type checking

**Common modifications:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Docs:** [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig#compilerOptions)

---

## Code Quality

### `eslint.config.ts`

**Purpose:** ESLint linting and quality rules.

**Key customizations:**

- Vue-specific linting
- TypeScript rules
- Prettier integration

**Common modifications:**

```typescript
export default [
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];
```

**Docs:** [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)

---

### `.prettierrc.json`

**Purpose:** Code formatting rules.

**Current settings:**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

**Docs:** [Prettier Options](https://prettier.io/docs/en/options.html)

---

## Styling

### `tailwind.config.js`

**Purpose:** Tailwind CSS framework configuration.

**Key customizations:**

- Extended color palette (cyan, purple, emerald, slate)
- Content sources for purging
- Custom utilities and plugins

**Common modifications:**

```javascript
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#00ff00",
        },
      },
    },
  },
};
```

**Docs:** [Tailwind Configuration](https://tailwindcss.com/docs/configuration)

---

## Summary

**Customized configs** (documented above):

- `src/constants/index.ts` - App constants
- `vite.config.ts` - Build configuration
- `tsconfig.app.json` - TypeScript settings
- `eslint.config.ts` - Linting rules
- `.prettierrc.json` - Code formatting
- `tailwind.config.js` - CSS framework

**Standard configs** (use inline comments):

- `package.json` - Dependencies and scripts
- `.gitignore` - Version control
- `.editorconfig` - Editor consistency
- `postcss.config.js` - CSS processing
