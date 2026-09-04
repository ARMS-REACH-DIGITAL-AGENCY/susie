import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Susie Sculpts",
  description: "Practical wellness education, body sculpting insights, and recovery guidance from Susie Sculpts.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Susie Sculpts",
    description: "Practical wellness education, body sculpting insights, and recovery guidance from Susie Sculpts.",
    url: "https://www.susiesculpts.com/blog",
  },
};

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32">
        <section className="border-b border-stone bg-[#f2ebe3] py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="section-label">Susie Sculpts Journal</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-light leading-tight text-[#2c1f14] md:text-6xl">Wellness education for feeling more at home in your body.</h1>
            <p className="mt-5 max-w-2xl font-sans text-base font-light leading-relaxed text-muted md:text-lg">Thoughtful guidance on body sculpting, lymphatic wellness, recovery, and women&apos;s wellbeing.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="flex flex-col rounded-sm border border-stone bg-white/70 p-6 shadow-sm transition-shadow hover:shadow-md md:p-7">
                  {post.categories[0] && <p className="section-label text-[10px]">{post.categories[0]}</p>}
                  <h2 className="mt-3 font-serif text-3xl font-light leading-tight text-[#2c1f14]">{post.title}</h2>
                  {post.description && <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted">{post.description}</p>}
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-stone pt-4 text-[10px] font-sans uppercase tracking-[0.13em] text-muted">
                    <span>{formatDate(post.publishedAt)}</span>
                    <Link href={`/blog/${post.slug}`} className="font-medium text-purple hover:text-purple-dark">Read article</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card max-w-2xl">
              <p className="section-label">Coming soon</p>
              <h2 className="mt-3 font-serif text-3xl font-light text-[#2c1f14]">The first Susie Sculpts article is on its way.</h2>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted">New articles will appear here after they are reviewed and published in the Susie Sculpts content workflow.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
