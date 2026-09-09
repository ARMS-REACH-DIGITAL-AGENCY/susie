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
      <main className="min-h-screen bg-cream pt-20 md:pt-24">
        <TreatmentPricingHub />
      </main>
      <Footer />
    </>
  );
}
