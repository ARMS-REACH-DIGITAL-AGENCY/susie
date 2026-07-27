import Image from "next/image";

const heroTreatmentImage = "data:image/webp;base64,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";

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
