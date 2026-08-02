import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ReturningVisitorResults from "@/components/ReturningVisitorResults";
import BodyResetCheckout from "@/components/BodyResetCheckout";

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
      <div className="body-reset-route">{children}</div>
      <style>{`.body-reset-route > header:first-child { display: none !important; }`}</style>
      <ReturningVisitorResults />
      <BodyResetCheckout />
    </>
  );
}
