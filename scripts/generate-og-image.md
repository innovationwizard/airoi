# Generate OG Image for WhatsApp

WhatsApp requires PNG or JPEG images for Open Graph, not SVG. Follow these steps to generate the PNG:

## Option 1: Using Browser Screenshot (Easiest)

1. Open `public/og-image.html` in your browser
2. Take a screenshot at exactly 1200x630px
3. Save as `public/og-image.png`

## Option 2: Using Online Tool

1. Use a service like:
   - https://www.screely.com/
   - https://htmlcsstoimage.com/
   - https://screenshotapi.net/
2. Upload `public/og-image.html` or provide the URL
3. Set dimensions to 1200x630px
4. Download as PNG
5. Save as `public/og-image.png`

## Option 3: Using Puppeteer (Automated)

```bash
npm install puppeteer --save-dev
```

Then run:
```bash
node scripts/generate-og-png.js
```

## After Generating

1. Make sure `og-image.png` is in the `public/` folder
2. Update `index.html` to use `.png` instead of `.svg`
3. Deploy to Vercel

