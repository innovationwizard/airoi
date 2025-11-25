# Vercel Deployment Guide

This guide will help you deploy the AI ROI Calculator to Vercel.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub repository connected (already done ✅)
- Supabase project set up with database schema

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/new
   - Sign in with your GitHub account

2. **Import your repository:**
   - Click "Import Git Repository"
   - Select `innovationwizard/airoi` from the list
   - Click "Import"

3. **Configure the project:**
   - **Framework Preset:** Vite (should auto-detect)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add the following:
     - `VITE_SUPABASE_URL` = Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = Your Supabase anonymous key
   - Make sure to add them for all environments (Production, Preview, Development)

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy to production:**
   ```bash
   vercel --prod
   ```

3. **Set environment variables:**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

## Post-Deployment

### 1. Verify Environment Variables

After deployment, verify that your environment variables are set:
- Go to your project settings → Environment Variables
- Ensure both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present

### 2. Test the Deployment

1. Visit your deployed URL
2. Try submitting a calculation
3. Verify it saves to Supabase
4. Test admin login functionality

### 3. Set up Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy every push to `main` branch (production)
- Create preview deployments for pull requests
- Rebuild on every commit

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `package.json` has correct build script

### Environment Variables Not Working

- Make sure variables are prefixed with `VITE_`
- Redeploy after adding new environment variables
- Check that variables are set for the correct environment (Production/Preview/Development)

### 404 Errors on Routes

- The `vercel.json` file includes rewrites for SPA routing
- If issues persist, check that `vercel.json` is committed to the repository

## Configuration Files

- `vercel.json` - Vercel configuration (already created ✅)
- `.env.example` - Environment variable template
- `package.json` - Build scripts configured

## Support

For more help:
- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord

