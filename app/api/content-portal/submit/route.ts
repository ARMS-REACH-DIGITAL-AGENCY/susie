import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_KEY_SHA256 = "f0886bee642d9fc4eb35d7cd108bca4cd3b79a4325dab886654cd913b81442da";
const BRIDGE_ENDPOINT =
  "https://client-bridge.armsreachdigital.agency/api/susie-blog-draft";

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validAccessKey(value: string): boolean {
  const digest = createHash("sha256").update(value).digest("hex");
  const expected = Buffer.from(ACCESS_KEY_SHA256, "hex");
  const actual = Buffer.from(digest, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const accessKey = stringValue(body.accessKey);

    if (!accessKey || !validAccessKey(accessKey)) {
      return NextResponse.json(
        { success: false, error: "invalid_access_key" },
        { status: 401 },
      );
    }

    const title = stringValue(body.title);
    const content = stringValue(body.content);
    const metaDescription = stringValue(body.metaDescription);
    const featuredImageUrl = stringValue(body.featuredImageUrl);
    const category = stringValue(body.category);
    const tags = stringValue(body.tags);
    const source = stringValue(body.source);
    const notes = stringValue(body.notes);

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "title_and_content_required" },
        { status: 400 },
      );
    }

    const response = await fetch(BRIDGE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        metaDescription,
        featuredImageUrl,
        category,
        tags,
        source,
        notes,
      }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({
      success: false,
      error: "invalid_bridge_response",
    }));

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("[Susie Sculpts] Content portal submission error", error);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 },
    );
  }
}
