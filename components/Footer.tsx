"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-purple-dark text-cream/70 py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Image
              src="/images/logo.png"
              alt="Susie Sculpts"
              width={160}
              height={40}
              className="h-9 w-auto mb-4 brightness-0 invert opacity-80"
            />
            <p className="text-xs font-sans font-light leading-relaxed text-cream/50 mb-4">
              Private body reset, lymphatic, PEMF, and sculpting support for women in Gilbert and the East Valley. Helping women since 1995.
            </p>
            <a
              href="tel:+14804400909"
              className="inline-flex items-center gap-2 text-sm font-sans font-light text-cream/70 hover:text-cream transition-colors"
            >
              <span>📞</span>
              <span>(480) 440-0909</span>
            </a>
          </div>

          <div>
            <p className="text-xs font-sans font-medium tracking-widest uppercase text-gold mb-4">Contact</p>
            <ul className="space-y-2 text-xs font-sans font-light">
              <li><a href="tel:+14804400909" className="hover:text-cream transition-colors">📞 (480) 440-0909</a></li>
              <li><a href="mailto:hello@susiesculpts.com" className="hover:text-cream transition-colors">✉️ hello@susiesculpts.com</a></li>
              <li>
                <a href="https://www.instagram.com/susiesculpts" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">
                  📸 @susiesculpts on Instagram
                </a>
              </li>
              <li>
                <a href="https://g.page/susiesculpts" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">
                  📍 Google Business Profile
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-sans font-medium tracking-widest uppercase text-gold mb-4">Service Area</p>
            <p className="text-xs font-sans font-light leading-relaxed text-cream/50 mb-4">
              Gilbert · Chandler · Queen Creek · Mesa · East Valley Arizona
            </p>
            <p className="text-xs font-sans font-medium tracking-widest uppercase text-gold mb-2">Services</p>
            <p className="text-xs font-sans font-light leading-relaxed text-cream/50">
              Synergie Vacuum Massage · PEMF Frequency Wellness · EMShape Neo Body Sculpting · Ultrasonic Cavitation & RF · Holistic Wellness & Nutrition
            </p>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 space-y-3">
          <p className="text-xs font-sans font-light text-cream/40 leading-relaxed max-w-3xl">
            <strong className="font-medium text-cream/50">Disclaimer:</strong> Services are wellness-focused and are not intended to diagnose, treat, cure, or prevent any disease. Individual experiences vary. Results are not guaranteed.
          </p>
          <p className="text-xs font-sans font-light text-cream/30">
            © {new Date().getFullYear()} Susie Sculpts · susiesculpts.com · Gilbert, AZ · Helping Women Since 1995
          </p>
        </div>
      </div>
    </footer>
  );
}
