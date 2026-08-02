import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import StickyEvaluationFooter from "@/components/StickyEvaluationFooter";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const faviconPath = "/images/Susie_favicon.png?v=4";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.susiesculpts.com"),
  title: "Susie Sculpts | Body Reset, PEMF, Synergie & Sculpting in Gilbert AZ",
  description:
    "Private body reset, Synergie Vacuum Massage, lymphatic, PEMF, and body sculpting support for women in Gilbert, Queen Creek, and the East Valley who want to feel lighter, clearer, and more like themselves again.",
  keywords:
    "Synergie Vacuum Massage Gilbert AZ, Synergie Vacuum Massage Queen Creek AZ, body sculpting Gilbert AZ, PEMF Gilbert AZ, lymphatic massage Gilbert AZ, body reset Gilbert AZ, wellness support East Valley, non-invasive body sculpting Gilbert",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: faviconPath, type: "image/png" }],
    shortcut: [{ url: faviconPath, type: "image/png" }],
    apple: [{ url: faviconPath, type: "image/png" }],
  },
  openGraph: {
    title: "Susie Sculpts | Body Reset, PEMF, Synergie & Sculpting in Gilbert AZ",
    description:
      "Private body reset, Synergie Vacuum Massage, lymphatic, PEMF, and body sculpting support for women in Gilbert, Queen Creek, and the East Valley.",
    url: "https://www.susiesculpts.com",
    siteName: "Susie Sculpts",
    locale: "en_US",
    type: "website",
    images: [{ url: faviconPath, width: 512, height: 512, alt: "Susie from Susie Sculpts" }],
  },
  twitter: {
    card: "summary",
    title: "Susie Sculpts | Body Reset, PEMF, Synergie & Sculpting in Gilbert AZ",
    description:
      "Private body reset, lymphatic, PEMF, and body sculpting support for women in Gilbert and the East Valley.",
    images: [faviconPath],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-cream pb-[72px] font-sans antialiased sm:pb-[78px]">
        <AnalyticsScripts />
        {children}
        <StickyEvaluationFooter />
      </body>
    </html>
  );
}
