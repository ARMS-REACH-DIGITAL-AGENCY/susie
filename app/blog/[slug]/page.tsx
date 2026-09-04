import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogContent from "@/components/BlogContent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getPublishedPost } from "@/lib/blog";

type Props = { params: { slug: string } };

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost(params.slug);
  if (!post) return { title: "Article Not Found | Susie Sculpts" };

  const url = `https://www.susiesculpts.com/blog/${post.slug}`;
  return {
    title: `${post.title} | Susie Sculpts`,
    description: post.description || "Wellness education from Susie Sculpts.",
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description || "Wellness education from Susie Sculpts.",
      url,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || undefined,
      authors: post.authorName ? [post.authorName] : undefined,
      images: post.imageUrl ? [{ url: post.imageUrl, alt: post.imageAltText || post.title }] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const post = await getPublishedPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32">
        <article>
          <header className="border-b border-stone bg-[#f2ebe3] py-14 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <Link href="/blog" className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-purple hover:text-purple-dark">← Back to blog</Link>
              {post.categories[0] && <p className="section-label mt-8">{post.categories[0]}</p>}
              <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-[#2c1f14] md:text-6xl">{post.title}</h1>
              {post.description && <p className="mt-5 max-w-2xl font-sans text-base font-light leading-relaxed text-muted md:text-lg">{post.description}</p>}
              <p className="mt-7 font-sans text-[11px] uppercase tracking-[0.12em] text-muted">By {post.authorName || "Susie Sculpts"}{post.publishedAt ? ` · ${formatDate(post.publishedAt)}` : ""}</p>
            </div>
          </header>
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
            <BlogContent html={post.rawHTML} />
            <div className="mt-12 border-t border-stone pt-8">
              <Link href="/blog" className="btn-secondary">More from the blog</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
