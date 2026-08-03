import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const icons = ["lymphatic", "pemf", "muscle", "contour", "fascia", "pelvic"];
const imagesDirectory = path.join(process.cwd(), "public", "images");

for (const icon of icons) {
  const svgPath = path.join(imagesDirectory, `treatment-${icon}.svg`);
  const pngPath = path.join(imagesDirectory, `treatment-${icon}.png`);
  const svg = await readFile(svgPath, "utf8");
  const match = svg.match(/(?:href|xlink:href)=["']data:image\/png;base64,([^"']+)["']/s);

  if (!match) {
    throw new Error(`No embedded PNG found in ${svgPath}`);
  }

  await writeFile(pngPath, Buffer.from(match[1], "base64"));
  console.log(`Created ${pngPath}`);
}
