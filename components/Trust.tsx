import Image from "next/image";

export default function Trust() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Photo placeholder */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-sm overflow-hidden shadow-xl">
              <Image
                src="/images/susie.jpg"
                alt="Susie — Susie Sculpts Gilbert AZ"
                fill
                className="object-cover object-top"
                sizes="320px"
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="section-label mb-4">Meet Susie</p>
            <h2 className="section-heading mb-6">
              You do not have to know exactly what you need before you start.
            </h2>
            <p className="font-sans font-light text-muted text-base leading-relaxed mb-6">
              The first step is a private conversation to understand what you are feeling, what you have tried, and what kind of support may make sense for your body right now.
            </p>
            <p className="font-sans font-light text-muted text-base leading-relaxed mb-8">
              Susie works with women in Gilbert, Chandler, Queen Creek, Mesa, and the East Valley who are ready to feel better — without the pressure, the hard sell, or the one-size-fits-all approach.
            </p>

            {/* Testimonial placeholder */}
            <div className="bg-purple/5 border-l-2 border-purple/30 pl-5 py-4 mb-6">
              <p className="font-serif text-lg font-light italic text-[#2c1f14] leading-relaxed mb-2">
                &ldquo;Client testimonial coming soon — add yours after your first session.&rdquo;
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
