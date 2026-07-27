const heroTreatmentImage = "data:image/jpeg;base64,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";

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
              You are not broken. Your body may just be asking for a different kind of reset.
            </p>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-7 max-w-lg">
              Susie Sculpts offers private body reset, lymphatic, PEMF, and sculpting support for women in Gilbert and the East Valley.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="btn-primary">
                View Services
              </a>
              <a href="tel:+14804400909" className="btn-secondary">
                Call Susie
              </a>
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

          <div className="order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md h-[360px] md:h-[500px] rounded-sm overflow-hidden shadow-2xl bg-white/70">
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
