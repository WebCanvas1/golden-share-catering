# Cloudflare Deployment Guide

This site is built with **TanStack Start** and can be deployed to **Cloudflare Pages / Workers** with Cloudflare **KV** storing the editable site content.

## 1. Local development

```bash
bun install
bun run dev
```

The admin panel lives at **`/admin`**:

- **Username:** `admin`
- **Password:** `admin123`

> To change the password, edit `src/lib/admin-config.ts` and redeploy. For stronger production security, move the credential check to a server function and store the password hash in a Cloudflare secret.

In dev / preview, edits made in the admin panel are persisted to the browser's `localStorage` so everything works without any backend setup.

## 2. Wire Cloudflare KV (production)

1. **Create a KV namespace**

   ```bash
   wrangler kv:namespace create SITE_DATA
   ```

2. **Add the binding to `wrangler.toml`**

   ```toml
   name = "made-to-share-catering"
   compatibility_date = "2025-01-01"

   [[kv_namespaces]]
   binding = "SITE_DATA"
   id      = "<paste-id-from-step-1>"
   ```

3. **Flip the data layer to use the API**

   The API route is already scaffolded at `src/routes/api/data.ts`. Uncomment the `env.SITE_DATA.get(...) / .put(...)` lines, then update `src/lib/data-store.ts` so `loadSiteData()` and `saveSiteData()` `fetch("/api/data")` instead of using `localStorage`.

4. **Deploy**

   ```bash
   bun run build
   wrangler deploy
   ```

## 3. Data shape

A single KV key — `site_data` — stores the entire editable content tree:

```ts
{
  hero, business, delivery,
  menuItems[], packages[], addOns[], gallery[]
}
```

See `src/lib/defaults.ts` for the full schema and seed data (auto-loaded when KV is empty).

## 4. Email enquiries (optional next step)

The contact form in `src/routes/index.tsx` currently logs to the console and shows a thank-you screen. To send real emails, create a server function that calls Resend / Mailgun / SES, and post the form data to it from `handleSubmit`.
