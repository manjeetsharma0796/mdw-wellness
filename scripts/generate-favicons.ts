/**
 * Regenerate the favicon set from `src/app/icon.svg`.
 *
 * Outputs:
 *   - src/app/favicon.ico    (32x32, multi-size ICO for legacy browsers)
 *   - src/app/apple-icon.png (180x180 PNG for iOS home screen)
 *
 * Run: bun run scripts/generate-favicons.ts
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SOURCE_SVG = path.join(ROOT, "src/app/icon.svg");
const OUT_FAVICON_ICO = path.join(ROOT, "src/app/favicon.ico");
const OUT_APPLE_PNG = path.join(ROOT, "src/app/apple-icon.png");

async function renderPng(svgBuffer: Buffer, size: number): Promise<Buffer> {
  return await sharp(svgBuffer, { density: 384 })
    .resize(size, size)
    .png()
    .toBuffer();
}

async function main() {
  const svg = await readFile(SOURCE_SVG);

  // Multi-size ICO: 16, 32, 48 are the conventional Windows sizes.
  const icoSizes = [16, 32, 48];
  const icoPngs = await Promise.all(icoSizes.map((s) => renderPng(svg, s)));
  const ico = await pngToIco(icoPngs);
  await writeFile(OUT_FAVICON_ICO, ico);

  // Apple touch icon: iOS expects 180x180.
  const applePng = await renderPng(svg, 180);
  await writeFile(OUT_APPLE_PNG, applePng);

  console.log("Wrote:");
  console.log("  " + OUT_FAVICON_ICO);
  console.log("  " + OUT_APPLE_PNG);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
