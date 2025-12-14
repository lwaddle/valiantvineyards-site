import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const news = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/news" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      featuredImage: image().optional(),
      featuredImageAlt: z.string().optional(),
      pinned: z.boolean().optional().default(false),
      draft: z.boolean().optional().default(false),
    }),
});

const stories = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/stories" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      featuredImage: image().optional(),
      featuredImageAlt: z.string().optional(),
      pinned: z.boolean().optional().default(false),
      draft: z.boolean().optional().default(false),
    }),
});

export const collections = { news, stories };
