/**
 * Application-wide constants
 */

/**
 * Scheduling and contact links
 */
export const SCHEDULING_LINK = "https://calendar.app.google/RvTusoYgRC3Xm1iEA";

/**
 * Contact information
 */
export const CONTACT = {
  email: "matt@idevelop.tech",
  location: "Florida, USA",
  linkedin: "https://www.linkedin.com/in/matt-lucian/",
  github: "https://github.com/mattlucian",
} as const;

/**
 * Article author byline and bio
 */
export const AUTHOR = {
  name: "Matt Myers",
  company: "I Develop Tech",
  bio: "Matt Myers has built software since 2013 and has led engineering teams since 2016, including CTO roles since 2020. Through I Develop Tech, Matt helps small businesses with system integrations, cloud infrastructure, and AI adoption.",
} as const;

// Link previews load images from the stage that served the page, so a dev
// link shows dev's images before they reach production
const SHARE_ORIGIN =
  import.meta.env.VITE_SHARE_ORIGIN || "https://idevelop.tech";

/**
 * Site configuration
 */
export const SITE = {
  name: "idevelop.tech",
  url: "https://idevelop.tech",
  companyName: "I Develop Tech LLC",
  repository: "https://github.com/mattlucian/idevelop.tech",
  shareOrigin: SHARE_ORIGIN,
  ogImage: `${SHARE_ORIGIN}/images/brand/og-image.png`,
} as const;
