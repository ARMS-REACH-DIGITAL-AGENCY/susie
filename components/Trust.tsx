import Image from "next/image";

export default function Trust() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Photo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-sm overflow-hidden shadow-xl">
              <Image
                src="/images/susie.png"
                alt="Susie — Susie Sculpts Gilbert AZ, 30 years in health and wellness"
                fill
                className="object-cover object-top"
                sizes="320px"
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="section-label mb-4">Helping Women Since 1995</p>
            <h2 className="section-heading mb-6">
              30 years. Real results.<br />No pressure. Ever.
            </h2>
            <p className="font-sans font-light text-muted text-base leading-relaxed mb-4">
              I&rsquo;ve been in the health and wellness field for over 30 years, helping people feel and look their very best. My body sculpting business uses advanced, non-invasive technology to target fat, contour the body, and improve overall wellness.
            </p>
            <p className="font-sans font-light text-muted text-base leading-relaxed mb-6">
              But true transformation isn&rsquo;t just physical. I take a holistic approach that supports mental, emotional, and spiritual well-being as well. My goal is to empower women to feel confident, healthy, and balanced in every aspect of their lives.
            </p>

            {/* Phone CTA */}
            <a
              href="tel:+14804400909"
              className="inline-flex items-center gap-3 bg-purple/8 border border-purple/20 rounded-sm px-5 py-4 mb-6 hover:bg-purple/12 transition-colors group"
            >
              <span className="text-xl">📞</span>
              <div>
                <p className="text-xs font-sans font-medium tracking-widest uppercase text-purple mb-0.5">Call or Text Susie Directly</p>
                <p className="font-serif text-xl font-light text-[#2c1f14] group-hover:text-purple transition-colors">(480) 440-0909</p>
              </div>
            </a>

            {/* Testimonial placeholder */}
            <div className="bg-purple/5 border-l-2 border-purple/30 pl-5 py-4 mb-5">
              <p className="font-serif text-lg font-light italic text-[#2c1f14] leading-relaxed mb-2">
                &ldquo;Client testimonial coming soon — your story could be here after your first session.&rdquo;
              </p>
              <p className="text-xs font-sans font-medium tracking-widest uppercase text-purple/60">
                — Client Name, Gilbert AZ
              </p>
            </div>

            {/* Google review placeholder */}
            <div className="flex items-center gap-3 bg-stone/50 border border-stone rounded-sm px-4 py-3">
              <div className="text-gold text-lg">★★★★★</div>
              <p className="text-xs font-sans font-light text-muted">
                Google Reviews — link coming soon
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
