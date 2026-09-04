"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type SubmitState =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const categories = [
  "Body Sculpting",
  "Lymphatic Wellness",
  "Pelvic Floor Wellness",
  "Fascia & Cellulite",
  "PEMF Recovery",
  "Women's Wellness",
  "Education & FAQs",
];

export default function ContentPortalPage() {
  const [state, setState] = useState<SubmitState>({ type: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ type: "submitting" });

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/content-portal/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        const messages: Record<string, string> = {
          invalid_access_key: "The access key is not valid.",
          title_and_content_required: "Please provide both an article title and article content.",
          blog_not_initialized:
            "The Susie Sculpts blog is not initialized in HighLevel yet. Your portal is working, but the blog container and author must be created before drafts can be accepted.",
        };
        setState({
          type: "error",
          message: messages[data.error] || data.message || "The article could not be submitted.",
        });
        return;
      }

      setState({
        type: "success",
        message: "Article submitted. It has been saved to Susie Sculpts as a draft for review.",
      });
      formElement.reset();
    } catch {
      setState({
        type: "error",
        message: "The article could not be submitted. Please try again.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <Image
            src="/images/logo.png"
            alt="Susie Sculpts"
            width={220}
            height={54}
            priority
            className="mx-auto h-auto w-[190px] sm:w-[220px]"
          />
          <p className="mt-5 font-sans text-xs font-medium uppercase tracking-[0.22em] text-purple">
            Content Partner Portal
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium text-[#2c1f14] sm:text-5xl">
            Submit an article for Susie to review
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-7 text-muted sm:text-base">
            Submit educational content, product information, treatment guidance, and supporting source material here. Submissions are never published automatically; they are created as drafts for Susie Sculpts to review, edit, approve, and schedule.
          </p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-purple/15 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1f14]">Partner access key *</span>
              <input name="accessKey" type="password" required autoComplete="off" className="w-full rounded-lg border border-stone bg-cream/40 px-4 py-3 font-sans text-sm outline-none transition focus:border-purple" placeholder="Enter your private access key" />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1f14]">Article title *</span>
              <input name="title" required maxLength={180} className="w-full rounded-lg border border-stone px-4 py-3 font-sans text-sm outline-none transition focus:border-purple" placeholder="Suggested article title" />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1f14]">Article content *</span>
              <textarea name="content" required rows={18} className="w-full rounded-lg border border-stone px-4 py-3 font-sans text-sm leading-7 outline-none transition focus:border-purple" placeholder="Paste the full article here. Plain text and basic HTML are accepted." />
            </label>

            <label>
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1f14]">Suggested category</span>
              <select name="category" defaultValue="" className="w-full rounded-lg border border-stone bg-white px-4 py-3 font-sans text-sm outline-none transition focus:border-purple">
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1f14]">Tags / keywords</span>
              <input name="tags" className="w-full rounded-lg border border-stone px-4 py-3 font-sans text-sm outline-none transition focus:border-purple" placeholder="lymphatic, recovery, body sculpting" />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1f14]">Suggested meta description</span>
              <textarea name="metaDescription" rows={3} maxLength={320} className="w-full rounded-lg border border-stone px-4 py-3 font-sans text-sm outline-none transition focus:border-purple" placeholder="Optional search-result description" />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1f14]">Featured image URL</span>
              <input name="featuredImageUrl" type="url" className="w-full rounded-lg border border-stone px-4 py-3 font-sans text-sm outline-none transition focus:border-purple" placeholder="https://..." />
              <span className="mt-1.5 block font-sans text-xs text-muted">If you need to send image files instead, include a share link in the notes below.</span>
            </label>

            <label>
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1f14]">Source / manufacturer</span>
              <input name="source" className="w-full rounded-lg border border-stone px-4 py-3 font-sans text-sm outline-none transition focus:border-purple" placeholder="Company, product, study, or source" />
            </label>

            <label>
              <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1f14]">Notes for Susie</span>
              <input name="notes" className="w-full rounded-lg border border-stone px-4 py-3 font-sans text-sm outline-none transition focus:border-purple" placeholder="Anything Susie should know before review" />
            </label>
          </div>

          {state.type === "success" && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 font-sans text-sm text-green-800" role="status">{state.message}</div>
          )}
          {state.type === "error" && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800" role="alert">{state.message}</div>
          )}

          <div className="mt-7 flex flex-col gap-3 border-t border-stone pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-xs leading-5 text-muted">Nothing submitted through this portal can publish automatically.</p>
            <button type="submit" disabled={state.type === "submitting"} className="rounded-sm bg-purple px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-purple-dark disabled:cursor-wait disabled:opacity-60">
              {state.type === "submitting" ? "Submitting..." : "Submit for review"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
