"use client";

import Image from "next/image";

const socials = [
  ["Instagram", "https://www.instagram.com/susiesculpts"],
  ["Facebook", "#"],
  ["Google", "https://g.page/susiesculpts"],
  ["X", "#"],
  ["YouTube", "#"],
  ["TikTok", "#"],
];

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
            <ul className="space-y-2 text-xs font-light">
              <li><a href="tel:+14804400909" className="transition-colors hover:text-cream">(480) 440-0909</a></li>
              <li><a href="mailto:susiesculpts@gmail.com" className="transition-colors hover:text-cream">susiesculpts@gmail.com</a></li>
            </ul>
            <p className="mb-2 mt-5 text-xs font-medium uppercase tracking-widest text-gold">Social Media</p>
            <div className="flex flex-wrap gap-2">
              {socials.map(([label, href]) => <a key={label} href={href} target={href === "#" ? undefined : "_blank"} rel={href === "#" ? undefined : "noopener noreferrer"} aria-label={label} className="flex h-8 min-w-8 items-center justify-center rounded-full border border-cream/20 px-2 text-[10px] font-medium uppercase tracking-wide transition hover:border-cream/50 hover:text-cream">{label === "Instagram" ? "IG" : label === "Facebook" ? "FB" : label === "YouTube" ? "YT" : label === "TikTok" ? "TT" : label}</a>)}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gold">Service Area</p>
            <p className="text-xs font-light leading-relaxed text-cream/50">Gilbert · Chandler · Queen Creek · Mesa · East Valley Arizona</p>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gold">Services</p>
            <p className="text-xs font-light leading-relaxed text-cream/50">Synergie Vacuum Massage · PEMF Wellness · EMShape Neo · Ultrasonic Cavitation &amp; RF · Holistic Wellness</p>
          </div>
        </div>

        <div className="mt-8 space-y-3 border-t border-cream/10 pt-6">
          <p className="max-w-3xl text-xs font-light leading-relaxed text-cream/40"><strong className="font-medium text-cream/50">Disclaimer:</strong> Services are wellness-focused and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary. Results are not guaranteed.</p>
          <div className="flex flex-col gap-1 text-xs font-light text-cream/30 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Susie Sculpts · susiesculpts.com · Gilbert, AZ</p>
            <p>Powered by <a href="https://armsreachdigital.agency" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream">ARMS REACH Digital Agency</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
