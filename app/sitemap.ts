import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = await getPublishedPosts();

  return [
    {
      url: "https://www.susiesculpts.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.susiesculpts.com/blog",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://www.susiesculpts.com/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: "https://www.susiesculpts.com/privacy",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.susiesculpts.com/terms",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
