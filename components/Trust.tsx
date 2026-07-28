import Image from "next/image";

export default function Trust() {
  return (
    <section id="meet-susie" className="py-14 md:py-20 bg-cream scroll-mt-24">
      <div id="testimonials" className="max-w-5xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">

          {/* Photo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-sm overflow-hidden shadow-xl">
              <Image
                src="/images/susie.jpg"
                alt="Susie — Susie Sculpts Gilbert AZ, 30 years in health and wellness"
                fill
                className="object-cover object-top"
                sizes="320px"
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="section-label mb-4">Meet Susie · Helping Women Since 1995</p>
            <h2 className="section-heading mb-6">
              30 years. Real results.<br />No pressure. Ever.
            </h2>
            <p className="font-sans font-light text-muted text-base leading-relaxed mb-4">
              I&rsquo;ve been in the health and wellness field for over 30 years, helping people feel and look their very best. My body sculpting business uses advanced, non-invasive technology to target fat, contour the body, and improve overall wellness.
            </p>
            <p className="font-sans font-light text-muted text-base leading-relaxed mb-6">
              But true transformation isn&rsquo;t just physical. I take a holistic approach that supports mental, emotional, and spiritual well-being as well. My goal is to empower women to feel confident, healthy, and balanced in every aspect of their lives.
            </p>

            {/* Testimonial */}
            <div className="bg-white/75 border border-purple/15 rounded-sm px-5 py-5 mb-5 shadow-[0_8px_24px_rgba(60,40,80,0.06)]">
              <div className="text-gold text-lg mb-3">★★★★★</div>
              <p className="font-serif text-lg md:text-xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
                &ldquo;I am so grateful to Susie and her expertise on Synergie. I lost 26 pounds and went down 2 sizes.
              </p>
              <p className="font-serif text-lg md:text-xl font-light italic text-[#2c1f14] leading-relaxed mb-4">
                I must admit I was skeptical in the beginning, but I trusted her. I am thrilled with the results and I feel great. Added bonus — my skin is so much softer. It&rsquo;s safe and gets wonderful results.&rdquo;
              </p>
              <p className="text-xs font-sans font-medium tracking-widest uppercase text-purple/60 mb-2">
                — Leslie Y.
              </p>
              <p className="text-[11px] font-sans font-light text-muted/70 leading-relaxed">
                Individual results vary. Testimonial shared from a Susie Sculpts client.
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
