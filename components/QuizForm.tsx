"use client";

import { useState } from "react";
import Image from "next/image";

type FormState = "idle" | "submitting" | "success" | "error";

const symptomCards = [
  {
    value: "Puffy or bloated",
    title: "Puffy or bloated",
    microcopy: "You feel swollen, uncomfortable, or like your body is holding onto everything.",
    image: "/images/symptom-puffy.png",
  },
  {
    value: "Inflamed or achy",
    title: "Inflamed or achy",
    microcopy: "Your body feels sore, irritated, or constantly \"off.\"",
    image: "/images/symptom-achy.png",
  },
  {
    value: "Heavy or sluggish",
    title: "Heavy or sluggish",
    microcopy: "You feel weighed down, slow, or like your body just isn't moving well.",
    image: "/images/symptom-heavy.png",
  },
  {
    value: "Tired all the time",
    title: "Tired all the time",
    microcopy: "Even after resting, your energy still feels low.",
    image: "/images/symptom-tired.png",
  },
  {
    value: "Foggy or unfocused",
    title: "Foggy or unfocused",
    microcopy: "Your mind feels cloudy, scattered, or hard to clear.",
    image: "/images/symptom-foggy.png",
  },
  {
    value: "Stuck — nothing works",
    title: "Stuck — nothing works",
    microcopy: "You've tried things before, but nothing seems to create lasting change.",
    image: "/images/symptom-stuck.png",
  },
  {
    value: "Uncomfortable in your body",
    title: "Uncomfortable in your body",
    microcopy: "You don't feel at ease in your skin right now.",
    image: "/images/symptom-uncomfortable.png",
  },
  {
    value: "Don't feel like yourself",
    title: "Don't feel like yourself",
    microcopy: "Something feels off, and you want to feel like you again.",
    image: "/images/symptom-yourself.png",
  },
];

const timelineOptions = [
  "This week",
  "Within 2 weeks",
  "This month",
  "Just researching",
];

const nextStepOptions = [
  "Book a consultation",
  "Send me more info",
  "Invite me to a grounding/PEMF experience",
  "I'm interested in a package",
];

export default function QuizForm() {
  const bookingLink = process.env.NEXT_PUBLIC_BOOKING_LINK;

  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    timeline: "",
    preferredNextStep: "",
    consent: false,
  });

  const set = (key: string, value: string | boolean) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.firstName.trim()) e.firstName = "First name is required.";
    if (!fields.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Please enter a valid email address.";
    if (!fields.consent) e.consent = "Please agree to receive follow-up messages.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("submitting");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("server_error");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <section id="quiz" className="py-20 md:py-28 bg-white/50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl mb-6 text-purple">✦</div>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#2c1f14] mb-4">
            Thank you, {fields.firstName}.
          </h2>
          <p className="font-sans font-light text-muted text-base leading-relaxed mb-8">
            Your inquiry has been received. Susie will be in touch with you personally to discuss the best next step for your body and goals.
          </p>
          {bookingLink ? (
            <a href={bookingLink} className="btn-primary">
              Book Your Consultation Now
            </a>
          ) : (
            <div className="bg-stone/60 border border-stone rounded-sm px-6 py-5 text-sm font-sans font-light text-muted">
              Booking link coming soon — Susie will follow up with you directly.
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 md:py-28 bg-white/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="section-label mb-4">Free · No Pressure · Private</p>
          <h2 className="section-heading mb-4">
            What feels most true for you right now?
          </h2>
          <p className="font-sans font-light text-muted text-base leading-relaxed">
            Choose the experience that sounds most like what your body has been telling you.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">

          {/* ── Image-based symptom cards ── */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {symptomCards.map((card) => {
                const selected = fields.interest === card.value;
                return (
                  <button
                    key={card.value}
                    type="button"
                    onClick={() => set("interest", card.value)}
                    className={`relative flex flex-col text-left rounded-[18px] overflow-hidden transition-all duration-200 focus:outline-none
                      ${selected
                        ? "border-2 border-purple bg-purple/5 shadow-[0_0_0_3px_rgba(140,110,180,0.15),0_6px_20px_rgba(60,40,80,0.10)]"
                        : "border border-[rgba(120,90,150,0.12)] bg-[#faf8f5] shadow-[0_6px_20px_rgba(60,40,80,0.06)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(60,40,80,0.10)] hover:border-[rgba(140,110,180,0.25)]"
                      }`}
                    aria-pressed={selected}
                  >
                    {/* Checkmark */}
                    {selected && (
                      <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-purple flex items-center justify-center shadow">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}

                    {/* Image — 1:1 square, top of card */}
                    <div className="relative w-full aspect-square">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover object-top rounded-t-[18px]"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>

                    {/* Text area */}
                    <div className="px-4 py-4 flex flex-col gap-1">
                      <p className={`font-sans font-semibold leading-snug text-[#6A5A6D]
                        text-[18px] sm:text-[20px]`}>
                        {card.title}
                      </p>
                      <p className="font-sans font-normal text-[13px] text-[#9a8fa0] leading-snug">
                        {card.microcopy}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Contact fields ── */}
          <div className="space-y-5 pt-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-warm mb-1.5">
                  First Name <span className="text-purple">*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Jane"
                  value={fields.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-warm mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Smith"
                  value={fields.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-medium tracking-widest uppercase text-warm mb-1.5">
                Email Address <span className="text-purple">*</span>
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="jane@example.com"
                value={fields.email}
                onChange={(e) => set("email", e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-sans font-medium tracking-widest uppercase text-warm mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                className="input-field"
                placeholder="(555) 000-0000"
                value={fields.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-xs font-sans font-medium tracking-widest uppercase text-warm mb-1.5">
                How soon would you like to take a next step?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timelineOptions.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => set("timeline", o)}
                    className={`px-3 py-2.5 text-xs font-sans font-light border rounded-sm transition-all duration-150 text-center ${
                      fields.timeline === o
                        ? "bg-purple text-white border-purple"
                        : "bg-stone/50 text-muted border-stone hover:border-purple/40"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred next step */}
            <div>
              <label className="block text-xs font-sans font-medium tracking-widest uppercase text-warm mb-1.5">
                Preferred next step
              </label>
              <div className="grid sm:grid-cols-2 gap-2">
                {nextStepOptions.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => set("preferredNextStep", o)}
                    className={`px-3 py-2.5 text-xs font-sans font-light border rounded-sm transition-all duration-150 text-left ${
                      fields.preferredNextStep === o
                        ? "bg-purple text-white border-purple"
                        : "bg-stone/50 text-muted border-stone hover:border-purple/40"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={fields.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-purple shrink-0"
                />
                <span className="text-xs font-sans font-light text-muted leading-relaxed">
                  I agree to receive follow-up messages from Susie Sculpts about my request. Message and data rates may apply. I can opt out anytime.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-xs text-red-500">{errors.consent}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === "submitting"}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formState === "submitting" ? "Sending…" : "Send My Inquiry →"}
            </button>

            {formState === "error" && (
              <p className="text-center text-sm text-red-500 font-sans font-light">
                Something went wrong. Please try again or call Susie directly at (480) 440-0909.
              </p>
            )}

            <p className="text-center text-xs font-sans font-light text-muted/50">
              Your information is private. We do not sell or share your data.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
