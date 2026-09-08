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
      <main className="min-h-screen bg-cream pb-4 pt-24 md:pt-28">
        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 md:pb-10">
          <div className="rounded-[20px] border border-purple/15 bg-white px-5 py-6 text-center shadow-[0_8px_24px_rgba(60,40,80,.05)] md:px-8 md:py-8">
            <p className="section-label">Treatments &amp; Pricing</p>
            <h1 className="mt-3 font-serif text-3xl font-light leading-tight text-[#2c1f14] md:text-4xl">Select your treatment package.</h1>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm font-light leading-relaxed text-muted">Choose a series, select the package that fits your goals, and purchase securely. Not sure which treatment is right for you? Take the free Body Reset evaluation first.</p>
            <a href="/body-reset" className="btn-secondary mt-5 px-5 py-3">Take the Body Reset</a>
          </div>
        </section>

        <section>
          <TreatmentPricingHub />
        </section>
      </main>
      <Footer />
    </>
  );
}
