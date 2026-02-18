# Génesis - AI Adoption Platform

## Overview
Génesis is an AI Adoption Platform centered on "Inverse Training" — where AI trains humans to become superhuman. It measures AI readiness through the NQ (Native Quotient, scored 0–100), delivers gamified personalized learning experiences, and drives organizational adoption through champions, governance tools, and analytics.

## Architecture
- **Frontend**: React + TypeScript + Vite + TailwindCSS + Shadcn/UI + Framer Motion + Recharts
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter

## Structure
```
client/src/
  pages/
    landing.tsx          - Public landing page
    calculator.tsx       - NQ Calculator
    dashboard/
      home.tsx           - User dashboard home
      my-nq.tsx          - NQ score and skill radar
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
      agentic-score.tsx  - Agentic Enterprise Score
      alerts.tsx         - Alert management
  components/
    nq-ring.tsx          - Animated NQ score ring
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
- `/calculator` - NQ Calculator
- `/dashboard` - User dashboard (all sub-routes)
- `/admin` - Admin dashboard (all sub-routes)

## Design System
- Primary: #7C3AED (violet)
- Dark: #5B21B6 (deep violet)
- Highlight: #A78BFA (lavender)
- Uses Shadcn/UI components with violet theme
- Framer Motion animations
- Recharts for data visualization
