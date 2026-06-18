import { createFileRoute } from "@tanstack/react-router";

/**
 * Site data API — Cloudflare KV ready.
 *
 * In Cloudflare deployment, bind a KV namespace named `SITE_DATA` in wrangler.toml:
 *
 *   [[kv_namespaces]]
 *   binding = "SITE_DATA"
 *   id = "<namespace-id>"
 *
 * Then access it through the Worker `env`. The handlers below contain
 * commented-out KV calls — uncomment and wire them through your Worker
 * runtime (e.g. via getCloudflareContext()) when deploying.
 *
 * Today these routes are a clean stub so the project deploys anywhere
 * (including Lovable's preview) without breaking. The admin panel
 * currently writes to localStorage; flip the data-store.ts module to call
 * these endpoints when you move to KV.
 */

const KV_KEY = "site_data";

export const Route = createFileRoute("/api/data")({
  server: {
    handlers: {
      GET: async () => {
        // TODO (Cloudflare): const env = getCloudflareContext().env;
        // const raw = await env.SITE_DATA.get(KV_KEY);
        // return Response.json(raw ? JSON.parse(raw) : null);
        return Response.json({ source: "stub", key: KV_KEY, data: null });
      },
      POST: async ({ request }) => {
        const body = await request.json();
        // TODO (Cloudflare): const env = getCloudflareContext().env;
        // await env.SITE_DATA.put(KV_KEY, JSON.stringify(body));
        return Response.json({ ok: true, received: !!body });
      },
    },
  },
});
