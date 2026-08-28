import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const icons = ["lymphatic", "pemf", "muscle", "contour", "fascia", "pelvic"];
const imagesDirectory = path.join(process.cwd(), "public", "images");

for (const icon of icons) {
  const svgPath = path.join(imagesDirectory, `treatment-${icon}.svg`);
  const pngPath = path.join(imagesDirectory, `treatment-${icon}.png`);
  let svg;

  try {
    svg = await readFile(svgPath, "utf8");
  } catch (error) {
    if ((error).code !== "ENOENT") throw error;

    // The optimized PNGs are committed to the repository. When their original
    // SVG source files are not present, keep those valid build assets instead
    // of failing the entire application build.
    await access(pngPath);
    console.log(`Using existing ${pngPath}`);
    continue;
  }

  const match = svg.match(/(?:href|xlink:href)=["']data:image\/png;base64,([^"']+)["']/s);

  if (!match) {
    throw new Error(`No embedded PNG found in ${svgPath}`);
  }

  await writeFile(pngPath, Buffer.from(match[1], "base64"));
  console.log(`Created ${pngPath}`);
}
