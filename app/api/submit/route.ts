import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      firstName:         body.firstName || "",
      lastName:          body.lastName || "",
      email:             body.email || "",
      phone:             body.phone || "",
      interest:          body.interest || "",
      timeline:          body.timeline || "",
      preferredNextStep: body.preferredNextStep || "",
      source:            "Susie Sculpts Landing Page",
      page:              "Body Reset Experience",
    };

    const webhookUrl = process.env.HIGHLEVEL_WEBHOOK_URL || "https://services.leadconnectorhq.com/hooks/QLS1wvtsvzL1YsLFxYcM/webhook-trigger/undefined";

    if (!webhookUrl) {
      console.warn(
        "[Susie Sculpts] HIGHLEVEL_WEBHOOK_URL is not set. " +
          "Add it to your Vercel environment variables. Submission logged below:"
      );
      console.log("[Susie Sculpts] Form submission:", JSON.stringify(payload, null, 2));
      return NextResponse.json({ success: true, note: "webhook_not_configured" });
    }

    const hlRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!hlRes.ok) {
      console.error(
        `[Susie Sculpts] HighLevel webhook returned ${hlRes.status}: ${await hlRes.text()}`
      );
      // Still return success to the user — don't expose backend errors
      return NextResponse.json({ success: true, note: "webhook_error_logged" });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Susie Sculpts] Submit error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
