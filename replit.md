# Génesis - AI Adoption Platform

## Overview
Génesis is an AI Adoption Platform centered on "Inverse Training" — where AI trains humans to become superhuman. It measures AI readiness through the SQ (Superagency Quotient, scored 0–100), delivers gamified personalized learning experiences, and drives organizational adoption through champions, governance tools, and analytics. The core concept: "From Employee to Human Superagent."

## Architecture
- **Frontend**: React + TypeScript + Vite + TailwindCSS + Shadcn/UI + Framer Motion + Recharts
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter

## Structure
```
client/src/
  pages/
    landing.tsx          - Public landing page (aspirational, visual)
    calculator.tsx       - SQ Calculator
    dashboard/
      home.tsx           - User dashboard home
      my-nq.tsx          - SQ score and skill radar
      learning.tsx       - Duolingo-style learning path
      assessments.tsx    - Skill assessments
      tools.tsx          - AI tools directory
      policies.tsx       - AI governance policies + chat
      champions.tsx      - Champion network
      company.tsx        - Company overview
    admin/
      overview.tsx       - Admin KPI dashboard
      teams.tsx          - Team management
      admin-tools.tsx    - Tool governance
      admin-learning.tsx - Learning analytics
      admin-assessments.tsx - Assessment analytics
      admin-policies.tsx - Policy management
      admin-champions.tsx - Champion program
      agentic-score.tsx  - Agentic Enterprise Score
      alerts.tsx         - Alert management
      settings.tsx       - Organization settings
  components/
    nq-ring.tsx          - Animated SQ score ring (SQRing component)
    seo.tsx              - SEO metadata component
    user-sidebar.tsx     - User dashboard sidebar
    admin-sidebar.tsx    - Admin dashboard sidebar
server/
  db.ts                  - Database connection
  storage.ts             - Storage interface + implementation
  routes.ts              - API endpoints
  seed.ts                - Seed data
shared/
  schema.ts              - Drizzle schemas + types
```

## Key Routes
- `/` - Landing page
- `/calculator` - SQ Calculator
- `/dashboard` - User dashboard (all sub-routes)
- `/dashboard/sq` - My SQ score page
- `/admin` - Admin dashboard (all sub-routes)

## Design System
- Primary: #7C3AED (violet)
- Dark: #5B21B6 (deep violet)
- Highlight: #A78BFA (lavender)
- Uses Shadcn/UI components with violet theme
- Framer Motion animations
- Recharts for data visualization

## Key Terminology
- SQ = Superagency Quotient (formerly NQ)
- Inverse Training = AI training humans to become superhuman
- Superagent = A human operating at peak capability alongside AI
- DB columns still use nq_score/avg_nq but app displays as SQ
