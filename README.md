# FlinkFreight 

A application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **MongoDB**.

This is a mostly-static informational website. The **career** and **tracking** pages from the original site are intentionally **not** implemented. Dynamic functionality is limited to the contact form and newsletter sign-up, which persist submissions to MongoDB.

## Pages

- `/` — Home (hero, services overview, why-us, values, CTA)
- `/about-us` — Company story, mission, vision, values
- `/services` — Ocean, Air, Ground, Warehousing, Customs, Supply Chain
- `/carriers` — Carrier partnership info & onboarding steps
- `/contact` — Contact form (saved to MongoDB)

## Tech Stack

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Framework      | Next.js 14 (App Router)         |
| Language       | TypeScript                      |
| Styling        | Tailwind CSS                    |
| Database       | MongoDB via Mongoose            |
| Forms / API    | Next.js Route Handlers          |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# then set MONGODB_URI in .env

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable      | Description                                            |
| ------------- | ----------------------------------------------------- |
| `MONGODB_URI` | MongoDB connection string (local or Atlas). Required for the contact form & newsletter to persist data. |

## API Routes

- `POST /api/contact` — `{ name, email, phone?, subject?, message }` → stores a contact submission.
- `POST /api/subscribe` — `{ email }` → stores a newsletter subscriber (duplicates ignored).

## Project Structure

```
src/
  app/
    api/contact/route.ts     # contact form handler
    api/subscribe/route.ts   # newsletter handler
    about-us/page.tsx
    carriers/page.tsx
    contact/page.tsx
    services/page.tsx
    page.tsx                 # home
    layout.tsx
    globals.css
  components/                # Navbar, Footer, forms, Icon, PageHero
  lib/
    site.ts                  # all static site content
    mongodb.ts               # cached Mongoose connection
  models/                    # Contact, Subscriber schemas
```
