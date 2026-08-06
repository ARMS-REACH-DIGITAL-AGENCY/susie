const heroTreatmentImage = "/images/susie-treatment-hero.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-stone/40 to-cream pb-3 pt-[72px] md:pb-16 md:pt-24">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-purple/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gold/8 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="md:hidden">
          <p className="mb-3 whitespace-nowrap text-left font-sans text-[clamp(9.5px,2.7vw,11px)] font-medium uppercase tracking-[0.16em] text-gold sm:tracking-[0.22em]">Start With What Your Body Needs</p>

          <h1 className="mb-4 text-left font-serif text-[40px] font-light leading-[0.95] text-[#2c1f14] sm:text-5xl">
            Feel puffy, tired, foggy, inflamed, heavy, or stuck?
          </h1>

          <div className="space-y-3 text-left font-sans text-[15px] font-light leading-[1.55] text-muted">
            <p>You don’t have to settle for feeling this way. Let’s help your body feel like itself again.</p>
            <p>Susie Sculpts offers private body reset, lymphatic, PEMF, and sculpting support for women in Gilbert and the East Valley.</p>
          </div>

          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] items-stretch gap-3">
            <div className="flex h-full flex-col overflow-hidden rounded-md border border-purple/10 bg-white/90 shadow-[0_8px_22px_rgba(60,40,80,0.10)]">
              <div className="aspect-[1.02/1] w-full overflow-hidden bg-white/70">
                <img
                  src={heroTreatmentImage}
                  alt="Susie providing a treatment"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-2.5 py-2 text-left">
                <p className="whitespace-nowrap font-sans text-[12px] font-semibold leading-tight text-[#2c1f14]">Private help from Susie</p>
                <p className="mt-0.5 font-sans text-[10px] font-light leading-snug text-muted">A personal, professional first step based on what your body needs.</p>
              </div>
            </div>

            <div className="grid h-full grid-rows-[1fr_1fr_1fr_auto] gap-2 rounded-md border border-purple/10 bg-white/55 p-2 shadow-[0_8px_22px_rgba(60,40,80,0.08)]">
              <a href="#meet-susie" className="flex min-h-[44px] items-center justify-center rounded-sm bg-gold px-3 py-2.5 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#a88449]">
                Meet Susie
              </a>
              <a href="tel:+14804400909" className="flex min-h-[44px] items-center justify-center rounded-sm border border-purple/25 bg-white px-3 py-2.5 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-purple transition-colors hover:bg-purple/5">
                Call or Text Susie
              </a>
              <a href="#treatments" className="flex min-h-[44px] items-center justify-center rounded-sm bg-purple px-3 py-2.5 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-purple-dark">
                View Treatments
              </a>
              <a href="#testimonials" className="flex items-center justify-center py-1 text-center font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-purple underline-offset-4 hover:underline">
                Read Reviews
              </a>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-12 md:grid md:grid-cols-2">
          <div className="text-left">
            <p className="section-label mb-3 whitespace-nowrap">Start With What Your Body Needs</p>
            <h1 className="mb-4 font-serif text-5xl font-light leading-[1.02] text-[#2c1f14] lg:text-6xl">
              Feel puffy, tired, foggy, inflamed, heavy, or stuck?
            </h1>
            <p className="mb-4 max-w-lg font-sans text-lg font-light leading-relaxed text-muted">
              You do not have to settle for feeling this way. Susie offers private body reset, lymphatic, PEMF, and sculpting support to help you feel more like yourself again.
            </p>

            <div className="flex flex-row justify-start gap-3">
              <a href="#meet-susie" className="btn-primary px-4 py-3">Meet Susie</a>
              <a href="#treatments" className="btn-secondary px-4 py-3">View Treatments</a>
            </div>

            <div className="mt-4 flex flex-col items-start gap-1">
              <a href="tel:+14804400909" className="font-sans text-sm font-light text-muted transition-colors hover:text-purple">(480) 440-0909</a>
              <p className="font-sans text-xs font-light tracking-wide text-muted/60">Gilbert · Chandler · Queen Creek · Mesa</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="relative h-[460px] w-full max-w-md overflow-hidden rounded-sm bg-white/70 shadow-2xl">
              <img
                src={heroTreatmentImage}
                alt="Susie providing a treatment in her wellness studio"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
