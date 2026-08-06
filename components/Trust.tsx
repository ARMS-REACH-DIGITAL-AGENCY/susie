import Image from "next/image";

const consultationBookingUrl = "https://api.armsreachdigital.com/widget/booking/3yvXSJo59kMORz5W3H4e";

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
    <section id="meet-susie" className="scroll-mt-[72px] bg-cream pb-10 pt-6 md:scroll-mt-[88px] md:pb-12 md:pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-7 md:grid-cols-[0.76fr_1.24fr] md:gap-12">
          <div className="md:order-1">
            <div className="mb-4 md:hidden">
              <p className="section-label mb-2">Helping Women Since 1995</p>
              <h2 className="font-serif text-[32px] font-light leading-[1.03] text-[#2c1f14]">You don&apos;t need another promise. You need a plan that fits your body.</h2>
            </div>

            <div className="relative mx-auto h-[300px] w-full max-w-sm overflow-hidden rounded-sm bg-white/70 shadow-xl md:h-[520px] md:max-w-none">
              <Image src="/images/susie.jpg" alt="Susie Bute, Susie Sculpts wellness specialist" fill className="object-cover object-top" sizes="(max-width: 768px) 92vw, 360px" />
            </div>

            <div className="mt-4 border border-purple/15 bg-white/75 p-4 shadow-[0_8px_24px_rgba(60,40,80,0.06)] md:p-5">
              <p className="mb-3 border-b border-purple/10 pb-3 text-sm font-semibold text-purple">Susie Bute <span className="font-light text-muted">| Body Sculpting and PEMF Specialist</span></p>
              <p className="section-label mb-3">Experience &amp; Credentials</p>
              <ul className="space-y-2">{credentials.map((credential) => <li key={credential} className="flex items-start gap-2.5 text-sm font-light leading-snug text-muted"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" /><span>{credential}</span></li>)}</ul>
              <p className="mt-4 border-t border-purple/10 pt-3 text-center text-xs font-medium uppercase tracking-[0.08em] text-purple">Ethical • Experienced • Empathetic • Effective</p>
            </div>
          </div>

          <div className="md:order-2">
            <div className="hidden md:block"><p className="section-label mb-3">Helping Women Since 1995</p><h2 className="mb-5 font-serif text-5xl font-light leading-[1.05] text-[#2c1f14]">You don&apos;t need another promise. You need a plan that fits your body.</h2></div>

            <div className="space-y-4 text-base font-light leading-relaxed text-muted md:text-[17px]">
              <p>Have you ever looked in the mirror and thought, “I know I don&apos;t feel like myself—but I have no idea where to start?” You are not alone. Most women come to me after trying things that sounded good, cost money, and still left them guessing.</p>

              <p>The problem is not that you failed. Your body is not one-size-fits-all. Instead of asking, “Which treatment should I buy?” I believe the better question is, “What does my body need first?”</p>

              <p>After more than 30 years in health and wellness and thousands of client sessions, I have learned that the best results begin with listening. I look at what you are feeling, what you have tried, and what you want to change—then help identify the most logical place to begin.</p>

              <div className="border-l-2 border-purple bg-purple/5 px-5 py-4">
                <p className="font-serif text-2xl font-light leading-snug text-[#2c1f14] md:text-3xl">“My goal is to help you feel stronger, healthier, more confident, and more like yourself again. My loyal clients tell me THAT is priceless!”</p>
              </div>

              <p>Susie Sculpts combines non-invasive body contouring, lymphatic wellness, muscle strengthening, pelvic-floor support, and PEMF technology with a personal, holistic approach. We begin with your desired result—not a machine or a sales pitch.</p>

              <p className="font-medium text-[#2c1f14]">The easiest first step is simply a conversation. No pressure. Ever.</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={consultationBookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex min-h-[56px] flex-1 items-center justify-center text-center">Book Your FREE Professional Consult</a>
              <a href="tel:+14804400909" className="flex min-h-[56px] flex-1 items-center justify-center border border-purple/25 bg-white/70 px-5 py-3 text-center hover:bg-purple/5"><span><span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-purple">Call or Text Susie</span><span className="mt-1 block font-serif text-xl font-light text-[#2c1f14]">(480) 440-0909</span></span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
