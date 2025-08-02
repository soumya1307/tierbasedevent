# Eventify

Eventify is a tier-based event showcase platform built with Next.js, Clerk, and Supabase. Users can sign up, view events according to their subscription tier (Free, Silver, Gold, Platinum), and update their access level dynamically.

# Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Auth:** Clerk.dev
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS

# Demo Credentials

| Tier     | Email                 | Password     |
|----------|-----------------------|--------------|
| Free     | freetier@demo.com     | freetier     |
| Silver   | silvertier@demo.com   | silvertier   |
| Gold     | goldtier@demo.com     | goldtier     |
| Platinum | platinumtier@demo.com | platinumtier |

# Project Structure

app/
├── api/
│ └── updateTier/
│ └── route.ts # API to update tier
├── components/
│ ├── eventCard.tsx # Event card UI
│ └── navbar.tsx # Navigation bar
├── dashboard/
│ ├── dashboard.tsx # Dashboard logic
│ └──page.tsx # metadata
├── lib/
│ └── supabase.ts # Supabase client config
├── utils/
│ └── tierAccess.ts # Tier access logic
├── globals.css # Global styles
├── layout.tsx # Root layout
└── page.tsx # Landing page
middleware.ts

# Setup

```bash
npm install
npm run dev