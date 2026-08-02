import Image from "next/image";

const consultationBookingUrl =
  "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

const credentials = [
  "30+ Years in Health & Wellness",
  "Arizona School of Massage Therapy Graduate (1994)",
  "Former Wellness Center Owner",
  "5 Years Serving Patients Referred Through a Local Cancer Clinic",
  "Thousands of Client Sessions",
  "Specializing in Non-Invasive Wellness Technologies",
];

export default function Trust() {
  return (
    <section className="bg-cream pb-12 pt-10 md:pb-16 md:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          id="meet-susie"
          className="grid scroll-mt-20 items-start gap-10 md:grid-cols-[0.92fr_1.08fr] md:gap-14 md:scroll-mt-24"
        >
          <div className="space-y-6">
            <div className="relative h-[470px] w-full overflow-hidden rounded-sm bg-white/70 shadow-xl md:h-[610px]">
              <Image
                src="/images/susie.jpg"
                alt="Susie Bute, Susie Sculpts wellness specialist"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 92vw, 440px"
              />
            </div>

            <div className="border border-purple/15 bg-white/75 p-5 shadow-[0_8px_24px_rgba(60,40,80,0.06)] md:p-6">
              <div className="mb-5 border-b border-purple/10 pb-4">
                <p className="font-sans text-sm font-semibold text-purple md:text-base">
                  Susie Bute
                  <span className="font-light text-muted"> | Body Sculpting and PEMF Specialist</span>
                </p>
              </div>

              <p className="section-label mb-4">Experience &amp; Credentials</p>
              <ul className="space-y-3">
                {credentials.map((credential) => (
                  <li
                    key={credential}
                    className="flex items-start gap-3 font-sans text-sm font-light leading-relaxed text-muted md:text-[15px]"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-purple" />
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-purple/10 pt-4 text-center font-sans text-xs font-medium uppercase tracking-[0.08em] text-purple">
                Experienced • Empathetic • Ethical • Effective
              </p>
            </div>
          </div>

          <div className="pt-0 md:pt-1">
            <p className="section-label mb-4">Meet Susie · Helping Women Since 1995</p>

            <h2 className="section-heading mb-6">
              You don&apos;t need another promise.
              <br />
              You need a plan that fits your body.
            </h2>

            <div className="space-y-5 font-sans text-base font-light leading-relaxed text-muted md:text-lg">
              <p>
                Have you ever looked in the mirror and thought, “I know I don&apos;t feel like myself—but I have no idea where to start?” You are not alone. Most women come to me after trying things that sounded good, cost money, and still left them guessing.
              </p>

              <p>
                The problem is not that you have failed. The problem is that your body is not one-size-fits-all. So instead of asking, “Which treatment should I buy?” I believe the better question is, “What does my body need first?”
              </p>

              <p>
                After more than 30 years in health and wellness and thousands of client sessions, I have learned that the best results begin with listening. I look at what you are feeling, what you have already tried, and what you want to change—then help you identify the most logical place to begin.
              </p>

              <div className="border-l-2 border-purple bg-purple/5 px-5 py-5">
                <p className="font-serif text-2xl font-light leading-snug text-[#2c1f14] md:text-3xl">
                  My goal is not to pressure you into a package. It is to help you feel stronger, healthier, more confident, and more like yourself again.
                </p>
              </div>

              <p>
                That is why Susie Sculpts combines non-invasive body contouring, lymphatic wellness, muscle strengthening, pelvic-floor support, and PEMF technology with a personal, holistic approach. We begin with your desired result—not a machine or a sales pitch.
              </p>

              <p className="font-medium text-[#2c1f14]">
                The easiest first step is simply a conversation. No pressure. Ever.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <a
                href={consultationBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex min-h-[58px] flex-1 items-center justify-center text-center"
              >
                Book Your FREE Professional Consult
              </a>

              <a
                href="tel:+14804400909"
                className="flex min-h-[58px] flex-1 items-center justify-center border border-purple/25 bg-white/70 px-5 py-3 text-center transition-colors hover:bg-purple/5"
              >
                <span>
                  <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-purple">
                    Call or Text Susie
                  </span>
                  <span className="mt-1 block font-serif text-xl font-light text-[#2c1f14]">
                    (480) 440-0909
                  </span>
                </span>
              </a>
            </div>

            <p className="mt-4 font-sans text-xs font-light leading-relaxed text-muted/70">
              Services are wellness-focused and are not intended to diagnose, treat, cure, or prevent disease. Individual experiences vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
