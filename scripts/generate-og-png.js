import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOGImage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to OG image size
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
  });

  // Load the HTML file
  const htmlPath = join(__dirname, '../public/og-image.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Take screenshot
  const screenshot = await page.screenshot({
    type: 'png',
    fullPage: false,
  });

  // Save to public folder
  const outputPath = join(__dirname, '../public/og-image.png');
  writeFileSync(outputPath, screenshot);

  console.log(`✅ OG image generated: ${outputPath}`);
  
  await browser.close();
}

generateOGImage().catch(console.error);

