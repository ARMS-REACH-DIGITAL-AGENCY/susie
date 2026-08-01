import type { Metadata } from "next";
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
      {children}
      <BodyResetCheckout />
    </>
  );
}
