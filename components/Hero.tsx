import Image from "next/image";

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

            <div className="mt-6 flex items-center gap-4 md:hidden">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md shrink-0">
                <Image
                  src="/images/susie.jpg"
                  alt="Susie — founder of Susie Sculpts"
                  fill
                  className="object-cover object-[center_8%]"
                  sizes="64px"
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
