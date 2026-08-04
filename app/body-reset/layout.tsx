import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EvaluationPageController from "@/components/EvaluationPageController";
import EvaluationTrustSections from "@/components/EvaluationTrustSections";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function BodyResetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <EvaluationPageController />
      <div className="body-reset-route">{children}</div>
      <EvaluationTrustSections />
      <Footer />
    </>
  );
}
