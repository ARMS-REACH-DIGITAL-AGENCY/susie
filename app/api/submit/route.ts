import { NextRequest, NextResponse } from "next/server";

function normalizeList(value: unknown): string {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  if (typeof value === "string") return value;
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const symptoms = normalizeList(body.symptoms) || body.symptom || body.interest || "";
    const tried = normalizeList(body.tried) || body.triedText || "";
    const goals = normalizeList(body.goals) || body.goal || body.preferredNextStep || "";

    const payload = {
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      email: body.email || "",
      phone: body.phone || "",
      interest: body.interest || symptoms,
      timeline: body.timeline || body.urgency || "",
      preferredNextStep: body.preferredNextStep || goals || body.recommendedOffer || "",
      symptom: body.symptom || symptoms,
      symptoms,
      tried,
      goal: goals,
      goals,
      urgency: body.urgency || body.timeline || "",
      recommendedOffer: body.recommendedOffer || "",
      quizPath: body.quizPath || "Body Reset Credit Lead-First Funnel",
      leadStage: body.leadStage || "Lead Captured",
      source: body.source || "Susie Sculpts Quiz Funnel",
      page: body.page || "Claim $100 Body Reset Credit",
    };

    const webhookUrl = process.env.HIGHLEVEL_WEBHOOK_URL || "https://services.leadconnectorhq.com/hooks/QLS1wvtsvzL1YsLFxYcM/webhook-trigger/14c03571-59aa-4b47-92f4-bf437144fb78";

    if (!webhookUrl) {
      console.warn("[Susie Sculpts] HIGHLEVEL_WEBHOOK_URL is not set.");
      console.log("[Susie Sculpts] Form submission:", JSON.stringify(payload, null, 2));
      return NextResponse.json({ success: true, note: "webhook_not_configured" });
    }

    const hlRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!hlRes.ok) {
      console.error(`[Susie Sculpts] HighLevel webhook returned ${hlRes.status}: ${await hlRes.text()}`);
      return NextResponse.json({ success: true, note: "webhook_error_logged" });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Susie Sculpts] Submit error:", err);
    return NextResponse.json({ success: false, error: "server_error" }, { status: 500 });
  }
}
