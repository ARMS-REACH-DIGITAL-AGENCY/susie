import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-br from-cream via-stone/40 to-cream">
      {/* Soft background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">

          {/* Copy */}
          <div className="order-2 md:order-1">
            <p className="section-label mb-4">Gilbert &amp; East Valley Arizona · Since 1995</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-[#2c1f14] mb-6">
              Feel Lighter, Clearer,<br />
              <em className="text-purple not-italic font-normal">and More Like Yourself Again</em>
            </h1>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-5 max-w-lg">
              Private body reset, lymphatic, PEMF, and sculpting support for women whose bodies have changed — and who want a safe, simple place to begin.
            </p>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              If you feel puffy, tired, foggy, inflamed, heavy, or stuck, Susie can help you figure out where to start.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/body-reset#quiz-funnel" className="btn-primary">
                Tell Me What To Try First
              </a>
              <a href="/body-reset" className="btn-secondary">
                Let Susie Help Me
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="tel:+14804400909"
                className="flex items-center gap-2 text-sm font-sans font-light text-muted hover:text-purple transition-colors"
              >
                <span className="text-purple">📞</span>
                <span>(480) 440-0909</span>
              </a>
              <span className="text-stone">·</span>
              <p className="text-xs text-muted/60 font-sans font-light tracking-wide">
                Gilbert · Chandler · Queen Creek · Mesa
              </p>
            </div>
          </div>

          {/* Susie photo */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            {/* On mobile: fixed square. On desktop: stretches to match copy column height */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-full md:h-full min-h-[320px] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/susie.jpg"
                alt="Susie — founder of Susie Sculpts, body sculpting and wellness in Gilbert AZ"
                fill
                className="object-cover object-[center_8%]"
                priority
                sizes="(max-width: 768px) 320px, 448px"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
