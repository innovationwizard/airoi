# AI ROI Calculator - Deployment Guide

## 1. Supabase Setup

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Save the project URL and anon key

### Run Schema
1. Go to SQL Editor in Supabase dashboard
2. Paste contents of `supabase/schema.sql`
3. Replace `tu-email@dominio.com` with your admin email
4. Run the script

### Create Admin User
1. Go to Authentication > Users
2. Click "Add User"
3. Enter your admin email and password
4. User must match email in `admin_users` table

---

## 2. Local Development

```bash
# Clone/create project
mkdir ai-roi-calculator && cd ai-roi-calculator

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Start dev server
npm run dev
```

---

## 3. Deploy to Vercel

### Option A: CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables when prompted
```

### Option B: Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy

---

## 4. Post-Deployment

### Add Custom Domain (optional)
1. In Vercel: Settings > Domains
2. Add your domain
3. Configure DNS as instructed

### Test Checklist
- [ ] Calculator form submits successfully
- [ ] Results display correctly
- [ ] PDF export works (browser print)
- [ ] Admin login works
- [ ] Admin dashboard shows leads
- [ ] Data persists in Supabase

---

## 5. File Structure Reference

```
ai-roi-calculator/
├── .env.local          # Your credentials (gitignored)
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx         # Main app (all components)
    ├── index.css
    ├── lib/
    │   ├── supabase.ts
    │   ├── constants.ts
    │   └── utils.ts
    ├── types/
    │   └── index.ts
    └── hooks/
        ├── useAuth.ts
        └── useCalculations.ts
```

---

## 6. Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists and has correct values
- Restart dev server after changing env vars

### Admin login fails
- Verify email exists in both Auth and `admin_users` table
- Check Supabase Auth logs for errors

### RLS errors
- Ensure schema.sql RLS policies were applied
- Check Supabase table policies in dashboard

### Print/PDF issues
- Use Chrome for best print results
- Check `@media print` styles are loading
