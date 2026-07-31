const heroTreatmentImage = "/images/susie-treatment-hero.png";

export default function Hero() {
  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-24 overflow-hidden bg-gradient-to-br from-cream via-stone/40 to-cream">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-1">
            <p className="section-label mb-4">Gilbert &amp; East Valley Arizona · Since 1995</p>
            <h1 className="font-serif text-[44px] sm:text-5xl lg:text-6xl font-light leading-[1.04] text-[#2c1f14] mb-5">
              Feel puffy, tired, foggy, inflamed, heavy, or stuck?
            </h1>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-4 max-w-lg">
              You don&rsquo;t have to settle for feeling this way. Let&rsquo;s help your body feel like itself again.
            </p>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-7 max-w-lg">
              Susie Sculpts offers private body reset, lymphatic, PEMF, and sculpting support for women in Gilbert and the East Valley.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="btn-primary">
                View Services
              </a>
              <a href="#meet-susie" className="btn-secondary">
                Meet Susie
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4 md:hidden">
              <div className="relative w-20 h-16 rounded-md overflow-hidden shadow-md shrink-0 bg-white/70">
                <img
                  src={heroTreatmentImage}
                  alt="Susie providing a Susie Sculpts treatment"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className="font-sans font-medium text-sm text-[#2c1f14]">Private help from Susie</p>
                <p className="font-sans font-light text-xs text-muted leading-relaxed">
                  Body reset, lymphatic, PEMF, and sculpting support for women in Gilbert and the East Valley.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="tel:+14804400909"
                className="flex items-center gap-2 text-sm font-sans font-light text-muted hover:text-purple transition-colors"
              >
                <span className="text-purple">📞</span>
                <span>(480) 440-0909</span>
              </a>
              <span className="hidden sm:inline text-stone">·</span>
              <p className="text-xs text-muted/60 font-sans font-light tracking-wide">
                Gilbert · Chandler · Queen Creek · Mesa
              </p>
            </div>
          </div>

          <div className="order-2 hidden md:flex justify-center md:justify-end">
            <div className="relative w-full max-w-md h-[500px] rounded-sm overflow-hidden shadow-2xl bg-white/70">
              <img
                src={heroTreatmentImage}
                alt="Susie providing a Susie Sculpts treatment in her wellness studio"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
