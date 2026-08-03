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

export async function POST(req: NextRequest) {
  const submissionId = randomUUID();
  const submittedAt = new Date().toISOString();

  try {
    const body = await req.json();
    const firstName = normalizeString(body.firstName);
    const lastName = normalizeString(body.lastName);
    const email = normalizeString(body.email).toLowerCase();
    const phone = normalizeString(body.phone);

    if (!firstName || !email) {
      return NextResponse.json(
        { success: false, error: "missing_required_fields", submissionId },
        { status: 400 },
      );
    }

    const symptoms = normalizeList(body.symptoms) || normalizeString(body.symptom) || normalizeString(body.interest);
    const tried = normalizeList(body.tried) || normalizeString(body.triedText);
    const goals = normalizeList(body.goals) || normalizeString(body.goal) || normalizeString(body.preferredNextStep);
    const urgency = normalizeString(body.urgency) || normalizeString(body.timeline);

    const payload = {
      submissionId,
      submittedAt,
      firstName,
      lastName,
      fullName: [firstName, lastName].filter(Boolean).join(" "),
      email,
      phone,
      interest: normalizeString(body.interest) || symptoms,
      timeline: normalizeString(body.timeline) || urgency,
      preferredNextStep: normalizeString(body.preferredNextStep) || goals || normalizeString(body.recommendedOffer),
      symptom: normalizeString(body.symptom) || symptoms,
      symptoms,
      tried,
      goal: normalizeString(body.goal) || goals,
      goals,
      priority: normalizeString(body.priority),
      urgency,
      recommendedOffer: normalizeString(body.recommendedOffer),
      recommendationKey: normalizeString(body.recommendationKey),
      recommendationReasons: normalizeString(body.recommendationReasons),
      recommendationScoreSummary: normalizeString(body.recommendationScoreSummary),
      quizPath: normalizeString(body.quizPath) || "Smart Body Reset Evaluation Lead-First Funnel",
      leadStage: normalizeString(body.leadStage) || "Lead Captured",
      source: normalizeString(body.source) || "Susie Sculpts Quiz Funnel",
      page: normalizeString(body.page) || "Find My Best First Step",
    };

    const webhookUrl = process.env.HIGHLEVEL_WEBHOOK_URL || "https://services.leadconnectorhq.com/hooks/QLS1wvtsvzL1YsLFxYcM/webhook-trigger/14c03571-59aa-4b47-92f4-bf437144fb78";

    console.info("[Susie Sculpts] Sending HighLevel submission", {
      submissionId,
      submittedAt,
      email,
      source: payload.source,
      page: payload.page,
      recommendationKey: payload.recommendationKey,
    });

    const hlRes = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Susie-Submission-Id": submissionId,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const responseText = await hlRes.text();

    if (!hlRes.ok) {
      console.error("[Susie Sculpts] HighLevel webhook failed", {
        submissionId,
        status: hlRes.status,
        response: responseText.slice(0, 2000),
      });

      return NextResponse.json(
        { success: false, error: "highlevel_webhook_failed", submissionId },
        { status: 502 },
      );
    }

    console.info("[Susie Sculpts] HighLevel webhook accepted", {
      submissionId,
      status: hlRes.status,
      response: responseText.slice(0, 1000),
    });

    return NextResponse.json({ success: true, submissionId, submittedAt });
  } catch (err) {
    console.error("[Susie Sculpts] Submit error", { submissionId, err });
    return NextResponse.json(
      { success: false, error: "server_error", submissionId },
      { status: 500 },
    );
  }
}
