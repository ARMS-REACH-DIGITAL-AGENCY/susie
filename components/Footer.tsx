"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const socials = [
  ["LinkedIn", "https://www.linkedin.com/in/susie-bute-7784a835?utm_source=share_via&utm_content=profile&utm_medium=member_android"],
  ["Instagram", "https://www.instagram.com/susiesculpts?igsh=bDZkd3lnd3J4OTlw"],
  ["Google", "https://www.google.com/search?q=Susie+Sculpts"],
  ["Facebook", "https://www.facebook.com/share/1HDw3mB8Ew/"],
  ["TikTok", "https://www.tiktok.com/@susiesculpts?_r=1&_t=ZT-98gx5ML4Rxd"],
] as const;

function SocialIcon({ label }: { label: string }) {
  const shared = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const icons: Record<string, ReactNode> = {
    LinkedIn: <svg {...shared}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10v7" /><path d="M7.5 7.5v.01" /><path d="M11.5 17v-4a3 3 0 0 1 6 0v4" /><path d="M11.5 10v7" /></svg>,
    Instagram: <svg {...shared}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>,
    Facebook: <svg {...shared}><path d="M14 8h3V4.5A16 16 0 0 0 14.4 4C11.8 4 10 5.6 10 8.5V11H7v4h3v6h4v-6h3l.6-4H14V8.8c0-.6.2-.8 0-.8Z" fill="currentColor" stroke="none" /></svg>,
    Google: <svg {...shared}><path d="M21 12.2c0-.7-.1-1.4-.2-2H12v3.7h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7Z" /><path d="M12 21c2.5 0 4.6-.8 6.3-2.2l-3.1-2.4c-.9.6-2 .9-3.2.9-2.4 0-4.5-1.6-5.2-3.8H3.6V16A9.5 9.5 0 0 0 12 21Z" /><path d="M6.8 13.5a5.7 5.7 0 0 1 0-3V8H3.6a9.5 9.5 0 0 0 0 8l3.2-2.5Z" /><path d="M12 6.7c1.4 0 2.6.5 3.5 1.4l2.7-2.7A9 9 0 0 0 3.6 8l3.2 2.5c.7-2.2 2.8-3.8 5.2-3.8Z" /></svg>,
    TikTok: <svg {...shared}><path d="M15 4v10.2a4.2 4.2 0 1 1-3.2-4.1" /><path d="M15 4c.8 2.2 2.4 3.5 5 3.7" /></svg>,
  };
  return icons[label] ?? null;
}

export default function Footer() {
  return (
    <footer className="bg-[#2c1f14] py-10 text-cream/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Image src="/images/logo.png" alt="Susie Sculpts" width={160} height={40} className="mb-3 h-9 w-auto brightness-0 invert opacity-80" />
            <p className="text-xs font-light leading-relaxed text-cream/50">Private body reset, lymphatic, PEMF, and sculpting support for women in Gilbert and the East Valley. Helping women since 1995.</p>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gold">Contact</p>
            <p className="mb-3 max-w-[240px] text-xs font-light leading-relaxed text-cream/50">Susie Sculpts | Gilbert, Arizona — serving Gilbert, Chandler, Queen Creek, Mesa &amp; the East Valley</p>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="tel:+14805265656" className="transition-colors hover:text-cream">(480) 526-5656</a></li>
              <li><a href="mailto:susiesculpts@gmail.com" className="transition-colors hover:text-cream">susiesculpts@gmail.com</a></li>
            </ul>
            <p className="mt-3 max-w-[220px] text-[11px] font-light leading-relaxed text-cream/45">Typical response time: within one business day.</p>
            <p className="mb-2 mt-5 text-xs font-medium uppercase tracking-widest text-gold">Social Media</p>
            <div className="flex flex-wrap gap-2">
              {socials.map(([label, href]) => {
                const classes = "flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:border-cream/70 hover:bg-cream/10";
                return (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label === "Google" ? "Google Business Profile" : label} title={label === "Google" ? "Google Business Profile" : label} className={classes}><SocialIcon label={label} /></a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gold">Service Area</p>
            <p className="text-xs font-light leading-relaxed text-cream/50">Gilbert · Chandler · Queen Creek · Mesa · East Valley Arizona</p>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gold">Services</p>
            <p className="text-xs font-light leading-relaxed text-cream/50">Synergie Vacuum Massage · PEMF Wellness · EMShape Neo · Ultrasonic Cavitation &amp; RF · Holistic Wellness</p>
            <Link href="/blog" className="mt-3 inline-block text-xs font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:text-gold">Blog</Link>
          </div>
        </div>

        <div className="mt-8 space-y-3 border-t border-cream/10 pt-6">
          <p className="text-xs font-light leading-relaxed text-cream/40">RHONDA S BUTE, doing business as HEALTHY LIFESTYLES AZ, operates Susie Sculpts.</p>
          <p className="max-w-3xl text-xs font-light leading-relaxed text-cream/40"><strong className="font-medium text-cream/50">Disclaimer:</strong> Services are wellness-focused and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary. Results are not guaranteed.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-light text-cream/40">
            <Link href="/privacy" className="transition-colors hover:text-cream">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-cream">Terms &amp; Messaging Terms</Link>
          </div>
          <div className="flex flex-col gap-1 text-xs font-light text-cream/30 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Susie Sculpts · susiesculpts.com · Gilbert, AZ</p>
            <p>Powered by <a href="https://armsreachdigital.agency" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream">ARMS REACH Digital Agency</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
