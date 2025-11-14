/**
 * TypeScript declarations for HTML file imports
 * Allows importing .html files as text strings when using esbuild loader
 */

declare module "*.html" {
  const content: string;
  export default content;
}
