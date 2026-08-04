import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function BodyResetLayout({ children }: { children: React.ReactNode }) {
  return <div className="body-reset-route">{children}</div>;
}
