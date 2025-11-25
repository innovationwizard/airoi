# Database Schema Setup

This directory contains the SQL schema for the AI ROI Calculator application.

## Quick Setup (Recommended)

### Method 1: Using Supabase Dashboard (Easiest)

1. **Go to your Supabase project dashboard:**
   - Visit https://app.supabase.com
   - Select your project

2. **Open the SQL Editor:**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the schema:**
   - Copy the entire contents of `schema.sql`
   - Paste it into the SQL Editor
   - **IMPORTANT:** Before running, update line 119 with your admin email:
     ```sql
     INSERT INTO admin_users (email) VALUES ('your-admin-email@example.com');
     ```
   - Click "Run" or press `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows/Linux)

4. **Verify the tables were created:**
   - Go to "Table Editor" in the left sidebar
   - You should see two tables: `roi_calculations` and `admin_users`

### Method 2: Using Supabase CLI (Advanced)

If you have Supabase CLI installed:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run the schema
supabase db push
```

## Schema Overview

### Tables

1. **roi_calculations**
   - Stores all ROI calculation submissions
   - Includes input data and calculated results
   - Lead capture fields (company_name, email) are optional

2. **admin_users**
   - Stores admin user emails
   - Used to check if a user has admin access

### Functions

- **get_dashboard_stats()**: Returns aggregated statistics for the admin dashboard

### Security (RLS Policies)

- **Public INSERT**: Anyone can submit calculations (anon users)
- **Authenticated SELECT**: Only authenticated users can view calculations
- **Authenticated SELECT**: Only authenticated users can view admin_users table

## Next Steps

After running the schema:

1. **Create an admin user:**
   - The schema includes a placeholder admin email (line 119)
   - Update it with your actual admin email before running
   - Or manually insert after running:
     ```sql
     INSERT INTO admin_users (email) VALUES ('your-admin-email@example.com');
     ```

2. **Set up authentication:**
   - Go to Authentication → Users in Supabase dashboard
   - Create a user with the same email as your admin_users entry
   - This user will be able to log into the admin dashboard

3. **Test the connection:**
   - Make sure your `.env` file has the correct Supabase credentials
   - Start your dev server: `npm run dev`
   - Try submitting a calculation to verify the database connection

## Troubleshooting

- **Error: "relation already exists"**: Tables already exist. Drop them first or use `CREATE TABLE IF NOT EXISTS`
- **Error: "permission denied"**: Make sure you're using the correct database credentials
- **RLS policies not working**: Verify that Row Level Security is enabled on the tables

