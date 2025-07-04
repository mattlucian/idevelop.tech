export interface Link {
  label: string;
  path: string;
  color: string;
  children?: Link[];
}

export const links: Link[] = [
  {
    label: "Home",
    path: "/",
    color: "#FF5D01", // neon orange
  },
  {
    label: "About",
    path: "/about",
    color: "#FF1B6B", // neon pink/magenta
  },
  {
    label: "Services",
    path: "/services",
    color: "#00F0FF", // electric cyan
    children: [
      {
        label: "Flxpoint",
        path: "/services/flxpoint",
        color: "#00F0FF",
      },
      {
        label: "Shopify",
        path: "/services/shopify",
        color: "#00F0FF",
      },
      {
        label: "Other Systems",
        path: "/services/other",
        color: "#00F0FF",
      },
    ],
  },
  {
    label: "Blog",
    path: "/blog",
    color: "#7B61FF", // electric purple
  },
  {
    label: "Contact",
    path: "/contact",
    color: "#4FC08D", // neon green
  },
];
