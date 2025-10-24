# Configuration Files Reference

This document provides an overview of all configuration files in the project root directory, explaining their purpose and when you might need to modify them.

---

## Table of Contents

- [Package Management](#package-management)
- [Build & Development Tools](#build--development-tools)
- [Code Quality & Formatting](#code-quality--formatting)
- [TypeScript Configuration](#typescript-configuration)
- [Styling & CSS](#styling--css)
- [Editor & IDE](#editor--ide)
- [Version Control](#version-control)
- [Application Entry](#application-entry)

---

## Package Management

### `package.json`

**Purpose:** Defines project metadata, dependencies, and npm scripts.

**When to modify:**

- Adding/removing dependencies: `npm install <package>` or manually edit
- Creating new npm scripts (e.g., custom build commands)
- Updating project metadata (name, version, description)
- Changing Node.js version requirements

**Common changes:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "custom-script": "your-command-here"
  },
  "dependencies": {
    "new-package": "^1.0.0"
  }
}
```

**Docs:** [npm package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

---

### `package-lock.json`

**Purpose:** Locks exact versions of all dependencies for reproducible builds.

**When to modify:**

- **DON'T manually edit this file!**
- Auto-updated when running `npm install`
- Commit this file to version control

**Common actions:**

- `npm install` - Updates when dependencies change
- `npm ci` - Clean install from lockfile (CI/CD environments)

**Docs:** [npm package-lock.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json)

---

## Build & Development Tools

### `vite.config.ts`

**Purpose:** Configures Vite build tool and development server.

**When to modify:**

- Adding path aliases (like `@/components`)
- Configuring plugins
- Adjusting build output settings
- Setting up proxy for API calls
- Customizing dev server port

**Common changes:**

```typescript
export default defineConfig({
  server: {
    port: 3000, // Change dev server port
    proxy: {
      '/api': 'http://localhost:8080', // Proxy API calls
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
})
```

**Docs:** [Vite Configuration](https://vitejs.dev/config/)

---

### `index.html`

**Purpose:** Main HTML entry point for the application.

**When to modify:**

- Adding meta tags (SEO, social media)
- Including external scripts/stylesheets
- Changing page title
- Adding favicons
- Setting up analytics

**Common changes:**

```html
<head>
  <meta name="description" content="Your site description" />
  <meta property="og:title" content="Your Site" />
  <link rel="icon" href="/favicon.ico" />
  <script async src="https://analytics.example.com/script.js"></script>
</head>
```

**Docs:** [Vite index.html](https://vitejs.dev/guide/#index-html-and-project-root)

---

### `env.d.ts`

**Purpose:** TypeScript declarations for environment variables and Vite client types.

**When to modify:**

- Adding custom environment variable types
- Declaring types for `.vue` files
- Adding global type declarations

**Common changes:**

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

**Docs:** [Vite Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html)

---

## Code Quality & Formatting

### `eslint.config.ts`

**Purpose:** Configures ESLint for code linting and quality rules.

**When to modify:**

- Disabling/enabling specific rules
- Adding custom rules for your project
- Configuring Vue-specific linting
- Adjusting TypeScript linting rules

**Common changes:**

```typescript
export default [
  // ... existing config
  {
    rules: {
      'no-console': 'warn', // Warn on console.log
      'vue/multi-word-component-names': 'off', // Disable rule
      '@typescript-eslint/no-explicit-any': 'error', // Enforce no 'any'
    },
  },
]
```

**Docs:** [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)

---

### `.prettierrc.json`

**Purpose:** Configures Prettier code formatter.

**When to modify:**

- Changing code formatting style (tabs vs spaces, quote style, etc.)
- Setting line length
- Adjusting formatting preferences

**Common changes:**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

**Docs:** [Prettier Options](https://prettier.io/docs/en/options.html)

---

### `.editorconfig`

**Purpose:** Maintains consistent coding styles across different editors and IDEs.

**When to modify:**

- Setting indent style (spaces vs tabs)
- Configuring line endings
- Setting charset encoding
- File-specific formatting rules

**Common changes:**

```ini
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

**Docs:** [EditorConfig](https://editorconfig.org/)

---

## TypeScript Configuration

### `tsconfig.json`

**Purpose:** Base TypeScript configuration that extends app and node configs.

**When to modify:**

- Rarely modified directly (use tsconfig.app.json or tsconfig.node.json instead)
- Adjusting shared compiler options

**Docs:** [TypeScript tsconfig.json](https://www.typescriptlang.org/tsconfig)

---

### `tsconfig.app.json`

**Purpose:** TypeScript configuration for application source code.

**When to modify:**

- Adjusting strict mode settings
- Adding/removing included paths
- Configuring path mappings
- Enabling/disabling type checking features

**Common changes:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

**Docs:** [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig#compilerOptions)

---

### `tsconfig.node.json`

**Purpose:** TypeScript configuration for Node.js scripts (like Vite config).

**When to modify:**

- Adjusting module resolution for build scripts
- Adding types for Node.js

**Docs:** [TypeScript Node Configuration](https://www.typescriptlang.org/tsconfig)

---

## Styling & CSS

### `tailwind.config.js`

**Purpose:** Configures Tailwind CSS framework.

**When to modify:**

- Extending color palette
- Adding custom utilities
- Configuring content sources
- Adding plugins
- Customizing breakpoints or spacing

**Common changes:**

```javascript
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00ff00',
          secondary: '#0000ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

**Docs:** [Tailwind Configuration](https://tailwindcss.com/docs/configuration)

---

### `postcss.config.js`

**Purpose:** Configures PostCSS CSS processing.

**When to modify:**

- Adding PostCSS plugins
- Configuring Autoprefixer
- Setting up CSS transformations

**Common changes:**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: ['> 1%', 'last 2 versions'],
    },
  },
}
```

**Docs:** [PostCSS Configuration](https://postcss.org/)

---

## Editor & IDE

### `.vscode/` directory

**Purpose:** VS Code workspace settings and recommendations.

**Files:**

- `settings.json` - Workspace-specific VS Code settings
- `extensions.json` - Recommended VS Code extensions

**When to modify:**

- Adding workspace-specific editor settings
- Recommending extensions for team members
- Configuring file nesting patterns

**Common settings.json changes:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  "explorer.fileNesting.enabled": true
}
```

**Docs:** [VS Code Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings)

---

## Version Control

### `.gitignore`

**Purpose:** Specifies files/directories Git should ignore.

**When to modify:**

- Adding build artifacts to ignore
- Ignoring environment-specific files
- Excluding IDE-specific files
- Ignoring local configuration

**Common additions:**

```
# Environment variables
.env.local
.env.*.local

# IDE
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Build output
dist/
build/
```

**Docs:** [Git Ignore Documentation](https://git-scm.com/docs/gitignore)

---

### `.gitattributes`

**Purpose:** Defines attributes for path patterns (line endings, diff behavior, etc.).

**When to modify:**

- Enforcing line ending consistency
- Configuring merge strategies for specific files
- Setting up LFS (Large File Storage)

**Common patterns:**

```
# Normalize line endings
* text=auto

# Force LF for shell scripts
*.sh text eol=lf

# Binary files
*.png binary
*.jpg binary
```

**Docs:** [Git Attributes Documentation](https://git-scm.com/docs/gitattributes)

---

## Quick Reference Matrix

| Configuration        | Primary Purpose        | Frequency of Changes |
| -------------------- | ---------------------- | -------------------- |
| `package.json`       | Dependencies & scripts | Frequent             |
| `package-lock.json`  | Dependency locking     | Auto-managed         |
| `vite.config.ts`     | Build configuration    | Occasional           |
| `tsconfig.*.json`    | TypeScript settings    | Rare                 |
| `eslint.config.ts`   | Linting rules          | Occasional           |
| `.prettierrc.json`   | Code formatting        | Rare                 |
| `tailwind.config.js` | CSS framework          | Occasional           |
| `.editorconfig`      | Editor consistency     | Rare                 |
| `.gitignore`         | Version control        | Occasional           |
| `index.html`         | HTML entry point       | Occasional           |

---

## Best Practices

1. **Always commit lockfiles** (`package-lock.json`) to version control
2. **Document custom configurations** in this file or inline comments
3. **Test configuration changes** locally before committing
4. **Use extends/inheritance** where possible to keep configs DRY
5. **Keep configs minimal** - only override what you need
6. **Version control all configs** except environment-specific files

---

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ESLint Rules Reference](https://eslint.org/docs/latest/rules/)
