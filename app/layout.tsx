import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Susie Sculpts | Body Reset, PEMF, Lymphatic & Sculpting in Gilbert AZ",
  description:
    "Private body reset, lymphatic, PEMF, and body sculpting support for women in Gilbert and the East Valley who want to feel lighter, clearer, and more like themselves again.",
  keywords:
    "body sculpting Gilbert AZ, PEMF Gilbert AZ, lymphatic massage Gilbert AZ, body reset Gilbert AZ, wellness support East Valley, non-invasive body sculpting Gilbert",
  openGraph: {
    title: "Susie Sculpts | Body Reset, PEMF, Lymphatic & Sculpting in Gilbert AZ",
    description:
      "Private body reset, lymphatic, PEMF, and body sculpting support for women in Gilbert and the East Valley.",
    url: "https://susiesculpts.com",
    siteName: "Susie Sculpts",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-cream font-sans antialiased">{children}</body>
    </html>
  );
}
