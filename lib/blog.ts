export type BlogPostSummary = {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  imageAltText: string;
  categories: string[];
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTimeInMinutes: number;
};

export type BlogPost = BlogPostSummary & {
  rawHTML: string;
  authorName: string;
};

const BRIDGE_URL = (
  process.env.SUSIE_BLOG_BRIDGE_URL ||
  "https://client-bridge.armsreachdigital.agency/api/susie-blog"
).replace(/\/$/, "");

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  const data = await getJson<{ posts?: BlogPostSummary[] }>(BRIDGE_URL);
  return Array.isArray(data?.posts) ? data.posts.filter((post) => post.slug && post.title) : [];
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const data = await getJson<{ post?: BlogPost }>(`${BRIDGE_URL}?slug=${encodeURIComponent(slug)}`);
  return data?.post?.slug === slug && data.post.title ? data.post : null;
}
