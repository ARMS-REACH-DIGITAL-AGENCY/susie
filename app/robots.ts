import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/body-reset", "/content-portal"],
    },
    sitemap: "https://www.susiesculpts.com/sitemap.xml",
    host: "https://www.susiesculpts.com",
  };
}
