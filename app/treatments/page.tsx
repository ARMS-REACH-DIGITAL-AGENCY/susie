import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TreatmentPricingHub from "@/components/TreatmentPricingHub";

export const metadata: Metadata = {
  title: "Treatments & Pricing | Susie Sculpts",
  description: "Explore Susie Sculpts treatment series, package options, transparent pricing, and secure checkout links in Gilbert, Arizona.",
  alternates: { canonical: "/treatments" },
  openGraph: {
    title: "Treatments & Pricing | Susie Sculpts",
    description: "Explore Susie Sculpts treatment series, package options, transparent pricing, and secure checkout links.",
    url: "https://www.susiesculpts.com/treatments",
  },
};

export default function TreatmentsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-24 md:pt-32">
        <section className="border-b border-purple/10 bg-purple/5 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="section-label">Treatments &amp; Pricing</p>
            <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-[#2c1f14] md:text-6xl">Choose the support that feels right for you.</h1>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-base font-light leading-relaxed text-muted md:text-lg">Explore every Susie Sculpts treatment series, compare package options, and purchase securely whenever you&apos;re ready.</p>
            <a href="/body-reset" className="btn-secondary mt-7">Not sure where to begin? Take the Body Reset</a>
          </div>
        </section>

        <section className="pt-12 md:pt-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="section-label">Your choice, your pace</p>
            <h2 className="mt-3 font-serif text-3xl font-light leading-tight text-[#2c1f14] md:text-4xl">Tap a treatment to view its options.</h2>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm font-light leading-relaxed text-muted">Every card shows what the series supports, its available package sizes, the per-treatment value where applicable, and a secure purchase link. If you would rather talk it through, Susie&apos;s free Body Reset evaluation is always available.</p>
          </div>
          <TreatmentPricingHub />
        </section>
      </main>
      <Footer />
    </>
  );
}
