"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const interestOptions = [
  "Feeling less puffy, heavy, or inflamed",
  "Better energy and recovery",
  "PEMF / frequency wellness",
  "Lymphatic support",
  "Body sculpting / tone",
  "I'm not sure — I just need a reset",
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="section-label mb-4">Free · No Pressure · Private</p>
          <h2 className="section-heading mb-4">
            Take the 60-Second Body Reset Quiz
          </h2>
          <p className="font-sans font-light text-muted text-base leading-relaxed">
            Tell us a little about what you are feeling and what you are looking for. Susie will personally follow up with the right next step for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name row */}
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

          {/* Email */}
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

          {/* Phone */}
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

          {/* Interest */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase text-warm mb-1.5">
              What are you most interested in?
            </label>
            <div className="relative">
              <select
                className="select-field"
                value={fields.interest}
                onChange={(e) => set("interest", e.target.value)}
              >
                <option value="" disabled>Select one…</option>
                {interestOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-muted/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
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
              Something went wrong. Please try again or email us directly.
            </p>
          )}

          <p className="text-center text-xs font-sans font-light text-muted/50">
            Your information is private. We do not sell or share your data.
          </p>
        </form>
      </div>
    </section>
  );
}
