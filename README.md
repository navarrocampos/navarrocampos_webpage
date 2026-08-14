# NavarroCampos Services — Next.js Site

## Stack
- **Next.js 14** (App Router, static export)
- **TypeScript** for type-safety
- **CSS Global** (same palette/classes as before — no Tailwind overhead)
- **Cloudflare Pages** for hosting (same as before, zero config change)

## Project structure
```
src/
  app/
    layout.tsx      ← HTML shell, metadata, font loading
    page.tsx        ← Assembles all sections
    globals.css     ← All your CSS (converted from style.css)
  components/
    Navbar.tsx          ← Announcement bar + navbar (client)
    NCLogo.tsx          ← SVG logo (reusable, light/dark)
    Hero.tsx            ← Static hero section
    Services.tsx        ← Plans grid (static)
    Maintenance.tsx     ← Maintenance ladder (static)
    Recommendations.tsx ← Tabs (client — needs state)
    Contact.tsx         ← Section shell + social links
    ContactForm.tsx     ← Form with React validation (client)
    Footer.tsx          ← Static footer
```

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build (what Cloudflare Pages runs)

```bash
npm run build        # produces /out folder — pure static HTML/CSS/JS
```

---

## Migrating your VS Code + GitHub + Cloudflare setup

### Step 1 — VS Code
1. Open VS Code → **File → Open Folder** → select `nc-website/`
2. Install the recommended extensions when prompted:
   - **ESLint** (`dbaeumer.vscode-eslint`)
   - **Prettier** (`esbenp.prettier-vscode`)
3. Run `npm install` in the integrated terminal.
4. Run `npm run dev` — your site is live at `localhost:3000`.

### Step 2 — GitHub
This replaces your old repo (or you can keep both).

```bash
# Inside the nc-website folder:
git init
git add .
git commit -m "chore: migrate to Next.js 14"

# On GitHub, create a new repo (e.g. nc-website), then:
git remote add origin https://github.com/YOUR_USERNAME/nc-website.git
git push -u origin main
```

### Step 3 — Cloudflare Pages (same dashboard, new settings)
1. Go to **Cloudflare dashboard → Pages → Create a project → Connect to Git**
2. Pick your new `nc-website` repo.
3. Set build settings:
   | Setting        | Value         |
   |----------------|---------------|
   | Framework      | Next.js       |
   | Build command  | `npm run build` |
   | Output dir     | `out`         |
   | Node version   | `20`          |
4. Click **Save and Deploy**. Done — same domain, same SSL, no server costs.

> **Your custom domain stays the same.**  
> In Cloudflare Pages → Custom domains, re-attach your existing domain.

---

## Wiring up the contact form (replace the mock delay)

In `src/components/ContactForm.tsx`, find the TODO block and replace it with one of:

**Option A — Formspree (5 min, free tier):**
```ts
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify(fields),
});
if (!res.ok) { setSubmitting(false); return; }
```

**Option B — Cloudflare Worker (already in your stack):**
Create a Worker at `/functions/api/contact.ts` that forwards to Resend or SendGrid.
Then `fetch('/api/contact', { method: 'POST', body: JSON.stringify(fields) })`.
