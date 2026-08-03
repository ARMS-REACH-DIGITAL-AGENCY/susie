import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const validIcons = new Set([
  "lymphatic",
  "pemf",
  "muscle",
  "contour",
  "fascia",
  "pelvic",
]);

export const dynamic = "force-static";

export async function GET(
  _request: Request,
  { params }: { params: { name: string } },
) {
  const name = params.name.toLowerCase();

  if (!validIcons.has(name)) {
    return new NextResponse("Treatment icon not found", { status: 404 });
  }

  try {
    const svgPath = path.join(
      process.cwd(),
      "public",
      "images",
      `treatment-${name}.svg`,
    );
    const svg = await readFile(svgPath, "utf8");
    const match = svg.match(
      /(?:href|xlink:href)=["']data:image\/png;base64,([^"']+)["']/s,
    );

    if (!match) {
      return new NextResponse("Embedded PNG not found", { status: 500 });
    }

    return new NextResponse(Buffer.from(match[1], "base64"), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Unable to load treatment icon", { status: 500 });
  }
}
