# AI ROI Calculator

A React + TypeScript application for calculating ROI (Return on Investment) for AI Refill inventory optimization.

## Project Structure

```
ai-roi-calculator/
├── .env.local                 # Environment variables (gitignored)
├── .env.example               # Template for env vars
├── .gitignore
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Main app component
│   ├── index.css             # Global styles
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client & helpers
│   │   ├── constants.ts     # Benchmarks, targets, industries
│   │   └── utils.ts         # Formatters, calculations, validators
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── hooks/
│   │   ├── useAuth.ts       # Authentication state management
│   │   └── useCalculations.ts # CRUD operations for calculations
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   ├── calculator/     # Calculator-specific components
│   │   │   ├── CalculatorForm.tsx
│   │   │   ├── ResultsView.tsx
│   │   │   ├── GoalCard.tsx
│   │   │   └── SummaryCard.tsx
│   │   ├── admin/          # Admin-specific components
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── StatCard.tsx
│   │   └── layout/        # Layout components
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   └── pages/             # Page-level components
│       ├── Calculator.tsx
│       └── Admin.tsx
├── supabase/
│   └── schema.sql         # Database schema
└── docs/                  # Documentation
    ├── deployment-guide.md
    └── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL script in `supabase/schema.sql`
   - Create an admin user in Authentication

5. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- **ROI Calculator**: Calculate ROI based on company financial data
- **Results View**: Display detailed ROI projections with benchmarks
- **PDF Export**: Export results as PDF using browser print
- **Admin Dashboard**: View and manage all calculations
- **Authentication**: Secure admin access

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Auth + Database)
- Lucide React (Icons)

## Deployment

See `docs/deployment-guide.md` for detailed deployment instructions.

