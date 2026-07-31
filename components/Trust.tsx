import Image from "next/image";

export default function Trust() {
  return (
    <section className="pt-10 md:pt-14 pb-12 md:pb-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div id="meet-susie" className="grid md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-16 items-start scroll-mt-20 md:scroll-mt-24">

          {/* Photo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-md h-[440px] md:h-[560px] rounded-sm overflow-hidden shadow-xl bg-white/70">
              <Image
                src="/images/susie.jpg"
                alt="Susie — Susie Sculpts Gilbert AZ, 30 years in health and wellness"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="pt-0">
            <p className="section-label mb-4">Meet Susie · Helping Women Since 1995</p>
            <h2 className="section-heading mb-6">
              30 years. Real experience.<br />No pressure. Ever.
            </h2>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-4">
              I&rsquo;ve been in the health and wellness field for over 30 years, helping people feel and look their very best. My body sculpting business uses advanced, non-invasive technology to support contouring, recovery, lymphatic wellness, and overall body confidence.
            </p>
            <p className="font-sans font-light text-muted text-base md:text-lg leading-relaxed mb-4">
              But true transformation isn&rsquo;t just physical. I take a holistic approach that supports mental, emotional, and spiritual well-being as well. My goal is to help women feel confident, healthy, and balanced in every aspect of their lives.
            </p>
            <div className="bg-purple/5 border border-purple/15 rounded-sm px-5 py-5 my-6">
              <p className="section-label mb-3">Why this became personal</p>
              <div className="space-y-3 font-sans font-light text-muted text-base leading-relaxed">
                <p className="font-serif text-2xl font-light text-[#2c1f14] leading-snug">
                  On January 1st, after living with pain for nearly 20 years, I woke up pain-free for the first time.
                </p>
                <p>
                  That moment changed everything — and it is why I am so passionate about helping other women discover therapies that support recovery, hope, and feeling like themselves again.
                </p>
                <p className="text-xs text-muted/70">
                  This is Susie&rsquo;s personal experience. Individual experiences vary, and services are wellness-focused.
                </p>
              </div>
            </div>
            <a
              href="tel:+14804400909"
              className="inline-flex items-center gap-3 bg-purple/8 border border-purple/20 rounded-sm px-5 py-4 hover:bg-purple/12 transition-colors group"
            >
              <span className="text-xl">📞</span>
              <div>
                <p className="text-xs font-sans font-medium tracking-widest uppercase text-purple mb-0.5">Call or Text Susie Directly</p>
                <p className="font-serif text-xl font-light text-[#2c1f14] group-hover:text-purple transition-colors">(480) 440-0909</p>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
