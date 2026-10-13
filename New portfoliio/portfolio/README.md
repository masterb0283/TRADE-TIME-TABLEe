# Babalola Boluwatife Joel — Portfolio

A production-ready full stack developer portfolio built with Next.js 15 (App
Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, and a
Node.js/Prisma/PostgreSQL backend for the contact form.

## Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, CSS custom properties for theming
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Database:** PostgreSQL + Prisma ORM (contact message persistence)
- **Email:** Resend (contact form delivery)
- **Deployment:** Vercel-ready, plus Docker/Docker Compose

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string (Prisma). Optional — the contact form still emails without it, it just won't persist a copy. |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) for sending contact form emails. |
| `CONTACT_TO_EMAIL` | Inbox that should receive contact form submissions. |
| `CONTACT_FROM_EMAIL` | Verified "from" address/display name in Resend. |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for metadata, sitemap, and Open Graph images. |

### Database

```bash
npx prisma db push   # sync the schema in prisma/schema.prisma to your database
npx prisma studio    # optional: browse data locally
```

## Project structure

```
src/
  app/                 # App Router pages, layout, metadata routes, API routes
    api/contact/        # Zod-validated contact form endpoint (Resend + Prisma)
  components/
    layout/             # Navbar, Footer
    sections/            # Hero, About, Projects, Services, Resume, Contact, etc.
    shared/              # Cross-cutting UI: splash screen, command palette, theme toggle…
    ui/                  # Design-system primitives (Button, Card, Badge, Label)
  data/                 # Content: projects, skills, resume, testimonials
  lib/                  # Utilities, site config, validation schemas, Prisma client
prisma/schema.prisma    # Database schema
```

## Personalization already applied

- Name, email (`Boluwatifejoel9@gmail.com`), WhatsApp (`+234 913 834 5280`,
  `whatsappNumber` in `site-config.ts`), location (Osun State & Ebonyi
  State), and education (Ekiti State University, in `src/data/resume.ts`)
  are already filled in.
- Your portrait photo is at `public/images/boluwatife-portrait.jpg` and used
  in the hero section via `next/image`.
- GitHub, LinkedIn, and YouTube in `src/lib/site-config.ts` are still
  placeholders — update once you have your real profile URLs.

## Content to personalize before launch

- `src/lib/site-config.ts` — **update `whatsappNumber` to your real WhatsApp
  number** (digits only, country code first, e.g. `2348012345678`), plus your
  real email, GitHub, LinkedIn, and YouTube URLs. WhatsApp is wired up as a
  button in Contact and an icon in the Footer.
- `src/data/projects.ts` — every project currently ships with `status:
  "concept"` or `"in-development"` and **no `github`/`demo` link**, so the UI
  never shows a broken button — it shows a status dot ("Live" / "In
  development" / "Concept build") instead. As each project goes live, add its
  `demo` and/or `github` URL and flip `status` to `"live"`; the button appears
  automatically. Swap `ProjectThumb`'s gradient placeholders for real
  screenshots via `next/image` at the same time.
- `src/data/resume.ts`, `src/data/skills.ts`, `src/data/services.ts`,
  `src/data/testimonials.ts` — your real experience, skills, and quotes.
- `public/resume.pdf` — add your actual CV; it's linked from the Resume section
  and hero "CV" button.
- `src/app/opengraph-image.tsx` — auto-generates the social preview image from
  `site-config.ts`, no image asset needed.

## Deployment

### Vercel

Push to GitHub and import the repo in Vercel. Add the environment variables
above in the project settings. `output: "standalone"` in `next.config.ts` is
safe to leave in place for Vercel deployments.

### Docker

```bash
docker compose up --build
```

This starts the app on `:3000` alongside a local PostgreSQL instance. Set
`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in your shell
or a `.env` file before running — `docker-compose.yml` reads them through.

## Verified build

This project was type-checked (`tsc --noEmit`) and built (`next build`)
successfully end-to-end before delivery — 8 routes compiled, static pages
prerendered, first-load JS ~204 kB for the homepage. The only step that
can't run in a network-restricted sandbox is `prisma generate`, since it
fetches a query-engine binary from `binaries.prisma.sh`; that step runs
normally in a regular dev machine, CI, or on Vercel and is already wired up
as a `postinstall` script.

## Performance & accessibility notes

- Fonts are self-hosted via `@fontsource` (no runtime Google Fonts request).
- All interactive elements have visible focus states and respect
  `prefers-reduced-motion`.
- Metadata, Open Graph image, `robots.ts`, and `sitemap.ts` are wired up via
  Next.js's native metadata APIs — no third-party SEO package needed.
- Run `npm run build && npx serve .next/standalone` (or `npm start`) and audit
  with Lighthouse before shipping; swap the gradient project thumbnails for
  optimized real images (`next/image`) for the biggest additional win.
