import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Messaging Terms | Susie Sculpts",
  description: "Website, service, and messaging terms for Susie Sculpts.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pb-16 pt-24 md:pt-28">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="section-label mb-3">Terms</p>
          <h1 className="mb-6 font-serif text-4xl font-light text-[#2c1f14] md:text-5xl">Terms &amp; Messaging Terms</h1>
          <p className="mb-8 text-sm font-light leading-relaxed text-muted">Last updated August 28, 2026.</p>

          <div className="space-y-7 text-[15px] font-light leading-relaxed text-muted md:text-base">
            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Website information</h2>
              <p>Susie Sculpts provides this website for general information, wellness education, service discovery, scheduling, and client communication. Website content, evaluations, and recommendations are not medical diagnoses or medical advice and are not a substitute for care from a qualified healthcare professional.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Services and results</h2>
              <p>Services are wellness-focused and non-invasive unless otherwise stated. Individual experiences and results vary. No specific outcome is guaranteed. Susie Sculpts may recommend that a service be postponed or declined when appropriate for safety, comfort, or suitability.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Scheduling and purchases</h2>
              <p>Appointment availability, package terms, pricing, and service details may change. Any purchase-specific terms presented at checkout or at the time of booking also apply. Contact Susie Sculpts before purchase if you have questions about a package, treatment series, or scheduling requirements.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Text messaging terms</h2>
              <p>RHONDA S BUTE, doing business as HEALTHY LIFESTYLES AZ, operates Susie Sculpts. When you provide your mobile number and expressly consent to follow-up messages, you authorize us to send text messages related to your evaluation, consultation, appointments, service information, and, when permitted by your consent, promotional follow-up. Consent is not a condition of purchase.</p>
              <p className="mt-3">You can cancel the SMS service at any time by texting STOP to (480) 526-5656. After you send STOP, we will send an SMS message confirming that you have been unsubscribed. After that, you will no longer receive SMS messages from us. To rejoin, sign up again as you did the first time.</p><p className="mt-3">For help, reply HELP or contact us at susiesculpts@gmail.com or (480) 526-5656. Message frequency may vary. Message and data rates may apply. Contact your wireless provider with questions about your text or data plan. Carriers are not liable for delayed or undelivered messages. You are responsible for providing a mobile number that you are authorized to use.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Age requirement</h2>
              <p>You must be at least 18 years old to opt in to the SMS program or purchase services through this website.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Acceptable use</h2>
              <p>You agree not to misuse the website, attempt unauthorized access, interfere with website operation, submit unlawful or misleading information, or use the website in a manner that harms Susie Sculpts or other users.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Privacy</h2>
              <p>Use of personal information is described in the <a className="text-purple underline underline-offset-4" href="/privacy">Privacy Policy</a>.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Contact</h2>
              <p>Questions about these terms may be sent to <a className="text-purple underline underline-offset-4" href="mailto:susiesculpts@gmail.com">susiesculpts@gmail.com</a> or <a className="text-purple underline underline-offset-4" href="tel:+14805265656">(480) 526-5656</a>.</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
