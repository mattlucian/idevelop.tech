// Logos live in src/assets/images so the build gives them content-hashed URLs
// (cached long term by browsers, never stale after a deploy).
// Files referenced by a fixed URL from outside the site (email logo, share
// image, favicons, app icons) stay in public/images/brand instead.
const imageUrls = import.meta.glob<string>("../assets/images/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export interface LogoUrls {
  logo: string;
  logoWebp?: string;
}

function resolveLogo(folder: string, file: string): LogoUrls {
  const key = `../assets/images/${folder}/${file}`;
  const logo = imageUrls[key];
  if (!logo) {
    throw new Error(`Image not found: src/assets/images/${folder}/${file}`);
  }
  const webpKey = key.replace(/\.(png|jpe?g)$/, ".webp");
  return {
    logo,
    logoWebp: webpKey === key ? undefined : imageUrls[webpKey],
  };
}

/** Client logo from src/assets/images/partners, with its .webp copy if present */
export const partnerLogo = (file: string): LogoUrls =>
  resolveLogo("partners", file);

/** Platform logo from src/assets/images/platforms, with its .webp copy if present */
export const platformLogo = (file: string): LogoUrls =>
  resolveLogo("platforms", file);
