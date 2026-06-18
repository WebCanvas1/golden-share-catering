import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LogOut, Save, Plus, Trash2, ArrowUp, ArrowDown, RotateCcw, Eye, EyeOff,
  ChevronLeft, Lock,
} from "lucide-react";
import { ADMIN_PASSWORD, ADMIN_SESSION_KEY, ADMIN_USERNAME } from "@/lib/admin-config";
import { loadSiteData, saveSiteData, resetSiteData, uid } from "@/lib/data-store";
import type { AddOn, CateringPackage, GalleryImage, MenuItem, SiteData } from "@/lib/defaults";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Made to Share Catering" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(ADMIN_SESSION_KEY) === "1");
  }, []);

  if (authed === null) return null;
  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem(ADMIN_SESSION_KEY); setAuthed(false); }} />;
}

/* ============================== LOGIN ============================== */

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 sparkle-bg">
      <div className="w-full max-w-md card-elegant p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-gold flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-ink" />
          </div>
          <h1 className="font-display text-3xl text-gradient-gold">Admin Sign-in</h1>
          <p className="text-sm text-muted-foreground mt-1">Made to Share Catering</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-gold-soft">Username</label>
            <input autoFocus value={username} onChange={(e) => setUsername(e.target.value)} className="form-input mt-1 w-full" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gold-soft">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input mt-1 w-full" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" className="btn-gold w-full">Sign in</button>
          <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-gold mt-3">
            <ChevronLeft className="inline w-3 h-3" /> Back to site
          </Link>
        </form>
      </div>
      <style>{`
        .form-input {
          background: oklch(0.10 0.008 60);
          border: 1px solid oklch(0.82 0.13 85 / 0.25);
          border-radius: 0.6rem;
          padding: 0.7rem 1rem;
          color: var(--foreground);
          outline: none;
          width: 100%;
        }
        .form-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px oklch(0.82 0.13 85 / 0.2); }
      `}</style>
    </main>
  );
}

/* ============================ DASHBOARD ============================ */

type Tab = "hero" | "menu" | "packages" | "addons" | "gallery" | "business" | "delivery";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<SiteData>(() => loadSiteData());
  const [tab, setTab] = useState<Tab>("hero");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  function save(next: SiteData) {
    setData(next);
    saveSiteData(next);
    setSavedAt(Date.now());
  }

  function handleReset() {
    if (confirm("Reset all website content to defaults? This cannot be undone.")) {
      setData(resetSiteData());
      setSavedAt(Date.now());
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "hero", label: "Hero" },
    { id: "menu", label: "Menu Items" },
    { id: "packages", label: "Packages" },
    { id: "addons", label: "Add-ons" },
    { id: "gallery", label: "Gallery" },
    { id: "business", label: "Business" },
    { id: "delivery", label: "Delivery" },
  ];

  return (
    <main className="min-h-screen pb-20">
      <header className="border-b border-[oklch(0.82_0.13_85/0.2)] bg-ink sticky top-0 z-30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl text-gradient-gold">Admin</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">Made to Share Catering</span>
          </div>
          <div className="flex items-center gap-2">
            {savedAt && <span className="text-xs text-gold hidden sm:inline">Saved ✓</span>}
            <Link to="/" className="btn-outline-gold text-xs py-2 px-3"><Eye className="w-4 h-4" /> View site</Link>
            <button onClick={onLogout} className="btn-outline-gold text-xs py-2 px-3"><LogOut className="w-4 h-4" /> Logout</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-1 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm rounded-t-md whitespace-nowrap transition-colors ${
                tab === t.id ? "bg-[oklch(0.82_0.13_85/0.12)] text-gold border-b-2 border-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {tab === "hero" && <HeroEditor data={data} save={save} />}
        {tab === "menu" && <MenuEditor data={data} save={save} />}
        {tab === "packages" && <PackagesEditor data={data} save={save} />}
        {tab === "addons" && <AddOnsEditor data={data} save={save} />}
        {tab === "gallery" && <GalleryEditor data={data} save={save} />}
        {tab === "business" && <BusinessEditor data={data} save={save} />}
        {tab === "delivery" && <DeliveryEditor data={data} save={save} />}

        <div className="mt-10 pt-6 border-t border-[oklch(0.82_0.13_85/0.15)] flex justify-between text-xs text-muted-foreground">
          <span>Changes save instantly to your browser. Hooks for Cloudflare KV are in <code>src/routes/api/data.ts</code>.</span>
          <button onClick={handleReset} className="inline-flex items-center gap-1 hover:text-destructive">
            <RotateCcw className="w-3 h-3" /> Reset to defaults
          </button>
        </div>
      </div>

      <style>{`
        .form-input {
          background: oklch(0.10 0.008 60);
          border: 1px solid oklch(0.82 0.13 85 / 0.25);
          border-radius: 0.5rem;
          padding: 0.6rem 0.85rem;
          color: var(--foreground);
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }
        .form-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px oklch(0.82 0.13 85 / 0.2); }
        .field-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--gold-soft); margin-bottom: 0.3rem; display: block; }
      `}</style>
    </main>
  );
}

/* ----------- Field helpers ----------- */

function TextField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="form-input" />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="form-input resize-none" />
    </label>
  );
}

/* ----------- HERO ----------- */

function HeroEditor({ data, save }: { data: SiteData; save: (d: SiteData) => void }) {
  const h = data.hero;
  const set = (patch: Partial<typeof h>) => save({ ...data, hero: { ...h, ...patch } });
  return (
    <section className="space-y-4">
      <SectionTitle title="Hero Section" />
      <TextField label="Badge" value={h.badge} onChange={(v) => set({ badge: v })} />
      <TextField label="Headline" value={h.headline} onChange={(v) => set({ headline: v })} />
      <TextField label="Subheadline (script)" value={h.subheadline} onChange={(v) => set({ subheadline: v })} />
      <TextArea label="Description" value={h.description} onChange={(v) => set({ description: v })} />
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Primary button" value={h.ctaPrimary} onChange={(v) => set({ ctaPrimary: v })} />
        <TextField label="Secondary button" value={h.ctaSecondary} onChange={(v) => set({ ctaSecondary: v })} />
      </div>
    </section>
  );
}

/* ----------- MENU ITEMS ----------- */

function MenuEditor({ data, save }: { data: SiteData; save: (d: SiteData) => void }) {
  function update(idx: number, patch: Partial<MenuItem>) {
    const next = [...data.menuItems];
    next[idx] = { ...next[idx], ...patch };
    save({ ...data, menuItems: next });
  }
  function remove(idx: number) {
    if (!confirm("Delete this menu item?")) return;
    const next = data.menuItems.filter((_, i) => i !== idx);
    save({ ...data, menuItems: next });
  }
  function move(idx: number, dir: -1 | 1) {
    const next = [...data.menuItems];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    save({ ...data, menuItems: next });
  }
  function add() {
    const item: MenuItem = { id: uid("m"), name: "New Item", description: "", price: "$0", image: "", active: true };
    save({ ...data, menuItems: [...data.menuItems, item] });
  }

  return (
    <section className="space-y-4">
      <SectionTitle title="Menu Items" action={<button onClick={add} className="btn-gold text-xs py-2 px-3"><Plus className="w-4 h-4" /> Add item</button>} />
      {data.menuItems.map((m, i) => (
        <article key={m.id} className="card-elegant p-4">
          <div className="grid md:grid-cols-[120px_1fr_auto] gap-4 items-start">
            <div className="aspect-square overflow-hidden rounded-md bg-ink border border-[oklch(0.82_0.13_85/0.15)]">
              {m.image && <img src={m.image} alt={m.name} className="w-full h-full object-cover" />}
            </div>
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <TextField label="Name" value={m.name} onChange={(v) => update(i, { name: v })} />
                <TextField label="Price" value={m.price} onChange={(v) => update(i, { price: v })} />
              </div>
              <TextField label="Description" value={m.description} onChange={(v) => update(i, { description: v })} />
              <TextField label="Image URL" value={m.image} onChange={(v) => update(i, { image: v })} />
            </div>
            <div className="flex md:flex-col items-end gap-1.5">
              <ToggleActive active={m.active} onChange={(v) => update(i, { active: v })} />
              <IconBtn onClick={() => move(i, -1)} title="Move up"><ArrowUp className="w-4 h-4" /></IconBtn>
              <IconBtn onClick={() => move(i, 1)} title="Move down"><ArrowDown className="w-4 h-4" /></IconBtn>
              <IconBtn onClick={() => remove(i)} title="Delete" danger><Trash2 className="w-4 h-4" /></IconBtn>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

/* ----------- PACKAGES ----------- */

function PackagesEditor({ data, save }: { data: SiteData; save: (d: SiteData) => void }) {
  function update(idx: number, patch: Partial<CateringPackage>) {
    const next = [...data.packages];
    next[idx] = { ...next[idx], ...patch };
    save({ ...data, packages: next });
  }
  function move(idx: number, dir: -1 | 1) {
    const next = [...data.packages];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    save({ ...data, packages: next });
  }
  function remove(idx: number) {
    if (!confirm("Delete this package?")) return;
    save({ ...data, packages: data.packages.filter((_, i) => i !== idx) });
  }
  function add() {
    save({
      ...data,
      packages: [
        ...data.packages,
        { id: uid("p"), name: "New Package", description: "", price: "$0", priceLabel: "per person", image: "", inclusions: [], active: true },
      ],
    });
  }

  return (
    <section className="space-y-4">
      <SectionTitle title="Catering Packages" action={<button onClick={add} className="btn-gold text-xs py-2 px-3"><Plus className="w-4 h-4" /> Add package</button>} />
      {data.packages.map((p, i) => (
        <article key={p.id} className="card-elegant p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg text-gold-soft flex-1">{p.name}</h3>
            <div className="flex items-center gap-1.5">
              <ToggleActive active={p.active} onChange={(v) => update(i, { active: v })} />
              <IconBtn onClick={() => move(i, -1)} title="Up"><ArrowUp className="w-4 h-4" /></IconBtn>
              <IconBtn onClick={() => move(i, 1)} title="Down"><ArrowDown className="w-4 h-4" /></IconBtn>
              <IconBtn onClick={() => remove(i)} title="Delete" danger><Trash2 className="w-4 h-4" /></IconBtn>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <TextField label="Name" value={p.name} onChange={(v) => update(i, { name: v })} />
            <TextField label="Price" value={p.price} onChange={(v) => update(i, { price: v })} />
            <TextField label="Price label" value={p.priceLabel} onChange={(v) => update(i, { priceLabel: v })} />
          </div>
          <TextArea label="Description" value={p.description} onChange={(v) => update(i, { description: v })} />
          <TextField label="Image URL" value={p.image} onChange={(v) => update(i, { image: v })} />
          <TextArea
            label="Inclusions (one per line)"
            value={p.inclusions.join("\n")}
            onChange={(v) => update(i, { inclusions: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
            rows={5}
          />
        </article>
      ))}
    </section>
  );
}

/* ----------- ADD-ONS ----------- */

function AddOnsEditor({ data, save }: { data: SiteData; save: (d: SiteData) => void }) {
  function update(idx: number, patch: Partial<AddOn>) {
    const next = [...data.addOns];
    next[idx] = { ...next[idx], ...patch };
    save({ ...data, addOns: next });
  }
  function remove(idx: number) {
    if (!confirm("Delete this add-on?")) return;
    save({ ...data, addOns: data.addOns.filter((_, i) => i !== idx) });
  }
  function add() {
    save({ ...data, addOns: [...data.addOns, { id: uid("a"), name: "New Add-on", price: "$0", active: true }] });
  }
  return (
    <section className="space-y-4">
      <SectionTitle title="Add-ons / Extras" action={<button onClick={add} className="btn-gold text-xs py-2 px-3"><Plus className="w-4 h-4" /> Add</button>} />
      {data.addOns.map((a, i) => (
        <div key={a.id} className="card-elegant p-4 grid sm:grid-cols-[1fr_140px_auto] gap-3 items-end">
          <TextField label="Name" value={a.name} onChange={(v) => update(i, { name: v })} />
          <TextField label="Price" value={a.price} onChange={(v) => update(i, { price: v })} />
          <div className="flex items-center gap-1.5">
            <ToggleActive active={a.active} onChange={(v) => update(i, { active: v })} />
            <IconBtn onClick={() => remove(i)} title="Delete" danger><Trash2 className="w-4 h-4" /></IconBtn>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ----------- GALLERY ----------- */

function GalleryEditor({ data, save }: { data: SiteData; save: (d: SiteData) => void }) {
  function update(idx: number, patch: Partial<GalleryImage>) {
    const next = [...data.gallery];
    next[idx] = { ...next[idx], ...patch };
    save({ ...data, gallery: next });
  }
  function remove(idx: number) {
    if (!confirm("Delete this image?")) return;
    save({ ...data, gallery: data.gallery.filter((_, i) => i !== idx) });
  }
  function add() {
    save({ ...data, gallery: [...data.gallery, { id: uid("g"), url: "", caption: "" }] });
  }
  return (
    <section className="space-y-4">
      <SectionTitle title="Gallery" action={<button onClick={add} className="btn-gold text-xs py-2 px-3"><Plus className="w-4 h-4" /> Add image</button>} />
      <div className="grid sm:grid-cols-2 gap-3">
        {data.gallery.map((g, i) => (
          <div key={g.id} className="card-elegant p-3 grid grid-cols-[80px_1fr_auto] gap-3 items-center">
            <div className="w-20 h-20 rounded overflow-hidden bg-ink border border-[oklch(0.82_0.13_85/0.15)]">
              {g.url && <img src={g.url} alt={g.caption} className="w-full h-full object-cover" />}
            </div>
            <div className="space-y-2">
              <input value={g.url} onChange={(e) => update(i, { url: e.target.value })} placeholder="Image URL" className="form-input" />
              <input value={g.caption} onChange={(e) => update(i, { caption: e.target.value })} placeholder="Caption" className="form-input" />
            </div>
            <IconBtn onClick={() => remove(i)} title="Delete" danger><Trash2 className="w-4 h-4" /></IconBtn>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------- BUSINESS ----------- */

function BusinessEditor({ data, save }: { data: SiteData; save: (d: SiteData) => void }) {
  const b = data.business;
  const set = (patch: Partial<typeof b>) => save({ ...data, business: { ...b, ...patch } });
  return (
    <section className="space-y-4">
      <SectionTitle title="Business Details" />
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Business name" value={b.name} onChange={(v) => set({ name: v })} />
        <TextField label="Tagline" value={b.tagline} onChange={(v) => set({ tagline: v })} />
        <TextField label="Phone" value={b.phone} onChange={(v) => set({ phone: v })} />
        <TextField label="Location" value={b.location} onChange={(v) => set({ location: v })} />
        <TextField label="Facebook URL" value={b.facebook} onChange={(v) => set({ facebook: v })} />
        <TextField label="Instagram URL" value={b.instagram} onChange={(v) => set({ instagram: v })} />
        <TextField label="Instagram handle" value={b.instagramHandle} onChange={(v) => set({ instagramHandle: v })} />
      </div>
    </section>
  );
}

/* ----------- DELIVERY ----------- */

function DeliveryEditor({ data, save }: { data: SiteData; save: (d: SiteData) => void }) {
  const d = data.delivery;
  const set = (patch: Partial<typeof d>) => save({ ...data, delivery: { ...d, ...patch } });
  return (
    <section className="space-y-4">
      <SectionTitle title="Delivery Information" />
      <TextArea
        label="Free delivery areas (one per line)"
        value={d.freeDeliveryAreas.join("\n")}
        onChange={(v) => set({ freeDeliveryAreas: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
        rows={5}
      />
      <TextField label="Minimum spend note" value={d.minimumSpend} onChange={(v) => set({ minimumSpend: v })} />
      <div className="grid sm:grid-cols-[1fr_140px] gap-4">
        <TextArea
          label="Paid delivery areas (one per line)"
          value={d.paidDeliveryAreas.join("\n")}
          onChange={(v) => set({ paidDeliveryAreas: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
          rows={7}
        />
        <TextField label="Paid delivery fee" value={d.paidDeliveryFee} onChange={(v) => set({ paidDeliveryFee: v })} />
      </div>
      <TextArea label="Short notice message" value={d.shortNotice} onChange={(v) => set({ shortNotice: v })} />
    </section>
  );
}

/* ----------- UI bits ----------- */

function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className="font-display text-2xl text-gradient-gold">{title}</h2>
      {action}
    </div>
  );
}

function ToggleActive({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!active)}
      title={active ? "Active — click to hide" : "Hidden — click to show"}
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors ${
        active ? "border-gold/50 text-gold bg-[oklch(0.82_0.13_85/0.08)]" : "border-muted-foreground/30 text-muted-foreground"
      }`}
    >
      {active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
      {active ? "Active" : "Hidden"}
    </button>
  );
}

function IconBtn({ onClick, title, children, danger }: { onClick: () => void; title: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded border transition-colors ${
        danger
          ? "border-destructive/40 text-destructive hover:bg-destructive/10"
          : "border-[oklch(0.82_0.13_85/0.3)] text-muted-foreground hover:text-gold hover:border-gold/50"
      }`}
    >
      {children}
    </button>
  );
}
