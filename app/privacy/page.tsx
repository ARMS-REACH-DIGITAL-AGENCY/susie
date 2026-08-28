import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Susie Sculpts",
  description: "Privacy policy for Susie Sculpts website, evaluation forms, contact requests, and follow-up communications.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pb-16 pt-24 md:pt-28">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="section-label mb-3">Privacy</p>
          <h1 className="mb-6 font-serif text-4xl font-light text-[#2c1f14] md:text-5xl">Privacy Policy</h1>
          <p className="mb-8 text-sm font-light leading-relaxed text-muted">Last updated August 28, 2026.</p>

          <div className="space-y-7 text-[15px] font-light leading-relaxed text-muted md:text-base">
            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Information we collect</h2>
              <p>When you use this website, request a consultation, complete Susie’s evaluation, call or text, or otherwise contact Susie Sculpts, we may collect information you provide such as your name, email address, phone number, answers to evaluation questions, treatment interests, and message content. We may also collect basic website analytics and technical information such as device, browser, referring page, and pages viewed.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">How we use information</h2>
              <p>We use information to respond to inquiries, provide requested evaluations and recommendations, schedule consultations or services, follow up about your request, improve the website and client experience, maintain business records, and protect the security and operation of our services.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Text messages and email</h2>
              <p>If you expressly agree to receive service or evaluation messages, Susie Sculpts may contact you by text message or email about your evaluation, treatment recommendation, purchases, appointments, customer service, or related services. If you separately agree to marketing messages, we may also send occasional text messages about special offers, discounts, and services. Consent is optional and is not a condition of purchase. Message and data rates may apply. Message frequency varies. You may reply STOP to opt out of text messages and HELP for help.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Service providers</h2>
              <p>We may use service providers that help operate the website, forms, scheduling, communications, analytics, hosting, and customer relationship management. These providers may process information on our behalf as necessary to provide those services. We do not sell your personal information.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Mobile information and SMS consent</h2>
              <p>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Health and wellness information</h2>
              <p>Information submitted through this website is used for wellness and service-planning purposes. The website is not a medical service and is not intended for emergency or diagnostic use. Do not submit information through the website if you require emergency medical attention.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Your choices</h2>
              <p>You may ask to review, correct, or delete personal information that Susie Sculpts maintains about you, subject to legal or operational retention requirements. You may also opt out of non-essential follow-up communications at any time.</p>
            </section>

            <section>
              <h2 className="mb-2 font-serif text-2xl font-light text-[#2c1f14]">Contact</h2>
              <p>For privacy questions or requests, contact Susie Sculpts at <a className="text-purple underline underline-offset-4" href="mailto:susiesculpts@gmail.com">susiesculpts@gmail.com</a> or <a className="text-purple underline underline-offset-4" href="tel:+14805265656">(480) 526-5656</a>.</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
