import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

function normalizeList(value: unknown): string {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  if (typeof value === "string") return value.trim();
  return "";
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeConsent(value: unknown): "Yes" | "No" {
  if (value === true) return "Yes";
  if (typeof value === "string" && ["true", "yes", "1", "on"].includes(value.trim().toLowerCase())) return "Yes";
  return "No";
}

function recommendationKeyFromTreatment(value: string): string {
  const treatment = value.toLowerCase();
  if (treatment.includes("lymphatic")) return "lymphatic";
  if (treatment.includes("pemf")) return "pemf";
  if (treatment.includes("muscle")) return "muscle";
  if (treatment.includes("contour")) return "contour";
  if (treatment.includes("fascia")) return "fascia";
  if (treatment.includes("pelvic")) return "pelvic";
  if (treatment.includes("ultimate")) return "ultimate";
  return "";
}

export async function POST(req: NextRequest) {
  const submissionId = randomUUID();
  const submittedAt = new Date().toISOString();

  try {
    const body = await req.json();

    // Accept both current camelCase website properties and the canonical ARMS
    // snake_case contract so this endpoint remains backward-compatible.
    const firstName = normalizeString(body.first_name) || normalizeString(body.firstName);
    const lastName = normalizeString(body.last_name) || normalizeString(body.lastName);
    const email = normalizeString(body.email).toLowerCase();
    const phone = normalizeString(body.phone);

    if (!firstName || !email) {
      return NextResponse.json(
        { success: false, error: "missing_required_fields", submissionId },
        { status: 400 },
      );
    }

    const symptoms =
      normalizeList(body.symptoms) ||
      normalizeString(body.symptom) ||
      normalizeString(body.interest);
    const previouslyTried =
      normalizeList(body.previously_tried) ||
      normalizeList(body.previouslyTried) ||
      normalizeList(body.tried) ||
      normalizeString(body.triedText);
    const goals =
      normalizeList(body.goals) ||
      normalizeString(body.goal) ||
      normalizeString(body.preferred_next_step) ||
      normalizeString(body.preferredNextStep);
    const urgency = normalizeString(body.urgency) || normalizeString(body.timeline);
    const recommendedTreatment =
      normalizeString(body.recommended_treatment) ||
      normalizeString(body.recommendedTreatment) ||
      normalizeString(body.recommendedOffer);
    const recommendationKey =
      normalizeString(body.recommendation_key) ||
      normalizeString(body.recommendationKey) ||
      recommendationKeyFromTreatment(recommendedTreatment);
    const preferredNextStep =
      normalizeString(body.preferred_next_step) ||
      normalizeString(body.preferredNextStep);
    const leadStage =
      normalizeString(body.lead_stage) ||
      normalizeString(body.leadStage) ||
      normalizeString(body.stage) ||
      "Lead Captured";
    const funnelPath =
      normalizeString(body.funnel_path) ||
      normalizeString(body.quizPath) ||
      "Smart Body Reset Evaluation Lead-First Funnel";

    const canonicalPayload = {
      submission_id: normalizeString(body.submission_id) || submissionId,
      submitted_at: normalizeString(body.submitted_at) || submittedAt,
      first_name: firstName,
      last_name: lastName,
      full_name:
        normalizeString(body.full_name) ||
        normalizeString(body.fullName) ||
        [firstName, lastName].filter(Boolean).join(" "),
      email,
      phone,
      consent: normalizeConsent(body.consent),
      interest: normalizeString(body.interest) || symptoms,
      symptoms,
      previously_tried: previouslyTried,
      goals,
      priority: normalizeString(body.priority),
      urgency,
      preferred_next_step: preferredNextStep,
      recommended_treatment: recommendedTreatment,
      recommendation_key: recommendationKey,
      recommendation_reasons:
        normalizeString(body.recommendation_reasons) ||
        normalizeString(body.recommendationReasons),
      score_summary:
        normalizeString(body.score_summary) ||
        normalizeString(body.scoreSummary) ||
        normalizeString(body.recommendationScoreSummary),
      lead_stage: leadStage,
      funnel_path: funnelPath,
      source: normalizeString(body.source) || "Susie Sculpts Quiz Funnel",
      page: normalizeString(body.page) || "Find My Best First Step",
    };

    // Keep the canonical snake_case contract as the source of truth, but also
    // emit the legacy camelCase aliases that older HighLevel workflow mappings
    // may still reference. This lets the workflow be repaired without dropping
    // contact names or evaluation fields during the transition.
    const payload = {
      ...canonicalPayload,
      firstName: canonicalPayload.first_name,
      lastName: canonicalPayload.last_name,
      fullName: canonicalPayload.full_name,
      previouslyTried: canonicalPayload.previously_tried,
      preferredNextStep: canonicalPayload.preferred_next_step,
      recommendedTreatment: canonicalPayload.recommended_treatment,
      recommendationKey: canonicalPayload.recommendation_key,
      recommendationReasons: canonicalPayload.recommendation_reasons,
      scoreSummary: canonicalPayload.score_summary,
      leadStage: canonicalPayload.lead_stage,
      funnelPath: canonicalPayload.funnel_path,
      raw_payload: JSON.stringify(canonicalPayload),
    };

    const webhookUrl =
      process.env.HIGHLEVEL_WEBHOOK_URL ||
      "https://services.leadconnectorhq.com/hooks/QLS1wvtsvzL1YsLFxYcM/webhook-trigger/14c03571-59aa-4b47-92f4-bf437144fb78";

    console.info("[Susie Sculpts] Sending canonical ARMS intake submission", {
      submissionId: payload.submission_id,
      submittedAt: payload.submitted_at,
      firstName: payload.first_name,
      lastName: payload.last_name,
      email,
      source: payload.source,
      page: payload.page,
      recommendationKey: payload.recommendation_key,
    });

    const hlRes = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Susie-Submission-Id": payload.submission_id,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const responseText = await hlRes.text();

    if (!hlRes.ok) {
      console.error("[Susie Sculpts] HighLevel webhook failed", {
        submissionId: payload.submission_id,
        status: hlRes.status,
        response: responseText.slice(0, 2000),
      });

      return NextResponse.json(
        { success: false, error: "highlevel_webhook_failed", submissionId: payload.submission_id },
        { status: 502 },
      );
    }

    console.info("[Susie Sculpts] HighLevel webhook accepted", {
      submissionId: payload.submission_id,
      status: hlRes.status,
      response: responseText.slice(0, 1000),
    });

    return NextResponse.json({
      success: true,
      submissionId: payload.submission_id,
      submittedAt: payload.submitted_at,
    });
  } catch (err) {
    console.error("[Susie Sculpts] Submit error", { submissionId, err });
    return NextResponse.json(
      { success: false, error: "server_error", submissionId },
      { status: 500 },
    );
  }
}
