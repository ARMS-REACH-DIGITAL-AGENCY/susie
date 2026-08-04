const heroTreatmentImage = "/images/susie-treatment-hero.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-stone/40 to-cream pb-8 pt-20 md:pb-16 md:pt-24">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gold/8 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
          <div className="text-center md:text-left">
            <p className="section-label mb-3">Gilbert &amp; East Valley Arizona · Since 1995</p>
            <h1 className="mb-4 font-serif text-[34px] font-light leading-[1.02] text-[#2c1f14] sm:text-5xl lg:text-6xl">
              Feel puffy, tired, foggy, inflamed, heavy, or stuck?
            </h1>
            <p className="mx-auto mb-4 max-w-lg font-sans text-[15px] font-light leading-relaxed text-muted md:mx-0 md:text-lg">
              You do not have to settle for feeling this way. Susie offers private body reset, lymphatic, PEMF, and sculpting support to help you feel more like yourself again.
            </p>

            <div className="mx-auto mb-4 flex max-w-md items-center gap-3 text-left md:hidden">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-white/70 shadow-md">
                <img src={heroTreatmentImage} alt="Susie providing a treatment" className="h-full w-full object-cover object-center" />
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-[#2c1f14]">Private help from Susie</p>
                <p className="font-sans text-xs font-light leading-snug text-muted">A personal, professional first step based on what your body needs.</p>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-3 md:justify-start">
              <a href="#meet-susie" className="btn-primary flex-1 px-4 py-3 sm:flex-none">Meet Susie</a>
              <a href="#treatments" className="btn-secondary flex-1 px-4 py-3 sm:flex-none">View Treatments</a>
            </div>

            <div className="mt-4 flex flex-col items-center gap-1 md:items-start">
              <a href="tel:+14804400909" className="text-sm font-sans font-light text-muted transition-colors hover:text-purple">(480) 440-0909</a>
              <p className="text-xs font-sans font-light tracking-wide text-muted/60">Gilbert · Chandler · Queen Creek · Mesa</p>
            </div>
          </div>

          <div className="hidden justify-end md:flex">
            <div className="relative h-[460px] w-full max-w-md overflow-hidden rounded-sm bg-white/70 shadow-2xl">
              <img src={heroTreatmentImage} alt="Susie providing a treatment in her wellness studio" className="h-full w-full object-cover object-center" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
