import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    slug: z.string().optional(),
    url: z.string().optional(),
    keywords: z.string().optional(),
    socialTagline: z.string().optional(),
    socialDescription: z.string().optional(),
    image: z.string().optional(),
    altImageText: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
