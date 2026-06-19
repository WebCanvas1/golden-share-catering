import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, Facebook, Instagram, Truck, Clock, MapPin, Heart, Cake, Briefcase,
  Users, GlassWater, Sparkles, Mail, ChevronRight, Check,
} from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import heroImg from "@/assets/hero-spread.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Made to Share Catering — Fresh, Local Catering in Albury-Wodonga" },
      { name: "description", content: "Homemade catering by Cass for birthdays, wakes, business lunches and family gatherings across Albury, Wodonga and Thurgoona." },
      { property: "og:title", content: "Made to Share Catering" },
      { property: "og:description", content: "Fresh. Local. Made To Share. Premium catering in Albury-Wodonga." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [data] = useSiteData();
  const { hero, business, delivery, menuItems, packages, addOns, gallery } = data;

  const phoneHref = `tel:${business.phone.replace(/\s+/g, "")}`;

  return (
    <main className="min-h-screen">
      <Header business={business} />
      <Hero hero={hero} phoneHref={phoneHref} />
      <Occasions />
      <About />
      <Menu items={menuItems.filter((m) => m.active)} />
      <Packages packages={packages.filter((p) => p.active)} />
      <AddOns addOns={addOns.filter((a) => a.active)} />
      <Delivery delivery={delivery} />
      <Gallery gallery={gallery} />
      <Contact packages={packages} menuItems={menuItems} />
      <Footer business={business} phoneHref={phoneHref} />
    </main>
  );
}

/* ============================== HEADER ============================== */

function Header({ business }: { business: ReturnType<typeof useSiteData>[0]["business"] }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-[rgba(250,248,244,0.85)] border-b border-[rgba(200,168,107,0.2)] shadow-[0_2px_18px_-12px_rgba(43,43,43,0.18)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold" />
          <span className="font-display text-lg md:text-xl text-gold-soft tracking-wide">
            Made to Share
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#menu" className="hover:text-gold transition-colors">Menu</a>
          <a href="#packages" className="hover:text-gold transition-colors">Packages</a>
          <a href="#delivery" className="hover:text-gold transition-colors">Delivery</a>
          <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        </nav>
        <a href={`tel:${business.phone.replace(/\s+/g, "")}`} className="btn-gold text-sm py-2 px-4">
          <Phone className="w-4 h-4" /> <span className="hidden sm:inline">{business.phone}</span>
        </a>
      </div>
    </header>
  );
}

/* =============================== HERO =============================== */

function Hero({
  hero,
  phoneHref,
}: {
  hero: ReturnType<typeof useSiteData>[0]["hero"];
  phoneHref: string;
}) {
  return (
    <section
      id="top"
      className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#F6F1E8] via-[#FAF8F4] to-[#EFE5D6]"
    >
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-[#8C6A35]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gold/30 shadow-sm text-xs tracking-widest uppercase text-[#8C6A35] mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            {hero.badge}
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-[#2B2B2B] mb-6">
            {hero.headline}
          </h1>

          <p className="font-script text-3xl md:text-4xl text-[#8C6A35] mb-5">
            {hero.subheadline}
          </p>

          <p className="max-w-xl text-base md:text-lg text-[#555555] leading-relaxed mb-9">
            {hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#menu" className="btn-gold">
              {hero.ctaPrimary}
              <ChevronRight className="w-4 h-4" />
            </a>

            <a href="#contact" className="btn-outline-gold">
              {hero.ctaSecondary}
            </a>

            <a href={phoneHref} className="btn-outline-gold">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>

        <div className="relative animate-fade-up">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white bg-white">
            <img
              src={heroImg}
              alt="Premium catering spread"
              width={900}
              height={700}
              className="w-full h-[420px] md:h-[560px] object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl border border-gold/25 px-6 py-5 max-w-[260px]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8C6A35] mb-1">
              Fresh Local Catering
            </p>
            <p className="font-display text-2xl text-[#2B2B2B]">
              Made To Share
            </p>
          </div>

          <div className="absolute -top-5 -right-4 md:-right-6 bg-[#2B2B2B] text-white rounded-2xl shadow-xl px-5 py-4">
            <p className="text-xs uppercase tracking-widest text-gold mb-1">
              Homemade
            </p>
            <p className="font-display text-xl text-gold-soft">
              By Cass
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ OCCASIONS ============================ */

function Occasions() {
  const items = [
    { icon: Cake, label: "Birthday Parties" },
    { icon: Heart, label: "Funerals & Wakes" },
    { icon: Briefcase, label: "Business Meetings" },
    { icon: GlassWater, label: "Special Events" },
    { icon: Users, label: "Family Gatherings" },
  ];
  return (
    <section className="py-16 bg-ink border-y border-[oklch(0.82_0.13_85/0.15)]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center font-display text-2xl md:text-3xl text-gold-soft tracking-widest uppercase mb-10">
          Perfect for any occasion
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3 p-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-gold/40 bg-[oklch(0.82_0.13_85/0.06)]">
                <Icon className="w-7 h-7 text-gold" />
              </div>
              <span className="text-xs tracking-widest uppercase text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== ABOUT ============================== */

function About() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 text-center animate-fade-up">
        <p className="font-script text-3xl text-gold mb-3">From our table to yours</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6">
          Homemade catering, <span className="text-gradient-gold">made fresh by Cass</span>
        </h2>
        <div className="gold-divider mb-8"><Heart className="w-4 h-4 fill-gold text-gold" /></div>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          Cass is a local Thurgoona mum with a passion for feeding people well. Every platter,
          every package and every home-cooked meal is made by hand from fresh, local ingredients —
          ready to share with the people who matter most.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          From family birthdays and quiet wakes, to business lunches and casual gatherings —
          we make catering reliable, beautiful and delicious.
        </p>
      </div>
    </section>
  );
}

/* ============================== MENU ============================== */

function Menu({ items }: { items: ReturnType<typeof useSiteData>[0]["menuItems"] }) {
  return (
    <section id="menu" className="py-24 bg-ink relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="Our Menu" title="Fresh, delicious & made to share" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {items.map((item) => (
            <article key={item.id} className="card-elegant group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2B2B2B] leading-tight">
  {item.name}
</h3>

<span className="gold-tag text-xl md:text-2xl font-bold whitespace-nowrap">
  {item.price}
</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="text-center mt-12 font-script text-2xl text-gold">
          Custom menus available — just ask!
        </p>
      </div>
    </section>
  );
}

/* ============================ PACKAGES ============================ */

function Packages({ packages }: { packages: ReturnType<typeof useSiteData>[0]["packages"] }) {
  return (
    <section id="packages" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="Catering Packages" title="Made for every occasion" />
        <div className="grid md:grid-cols-2 gap-7 mt-12">
          {packages.map((pkg) => (
            <article key={pkg.id} className="card-elegant flex flex-col md:flex-row overflow-hidden">
              <div className="md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden">
                <img src={pkg.image} alt={pkg.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="font-display text-2xl text-gold-soft mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {pkg.inclusions.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-[oklch(0.82_0.13_85/0.15)]">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{pkg.priceLabel}</div>
                    <div className="font-display text-3xl text-gradient-gold">{pkg.price}</div>
                  </div>
                  <a href="#contact" className="btn-gold text-sm py-2 px-5">Enquire</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= ADD-ONS ============================= */

function AddOns({ addOns }: { addOns: ReturnType<typeof useSiteData>[0]["addOns"] }) {
  return (
    <section className="py-20 bg-ink">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader eyebrow="Add Extras" title="Make it perfect" />
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {addOns.map((a) => (
            <div key={a.id} className="card-elegant px-5 py-4 flex items-center justify-between">
              <span className="text-foreground/90">{a.name}</span>
              <span className="text-gold font-semibold">{a.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ DELIVERY ============================ */

function Delivery({ delivery }: { delivery: ReturnType<typeof useSiteData>[0]["delivery"] }) {
  return (
    <section id="delivery" className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        <div className="card-elegant p-7">
          <Truck className="w-8 h-8 text-gold mb-4" />
          <h3 className="font-display text-xl text-gold-soft mb-3 tracking-wide">Free Delivery</h3>
          <ul className="text-sm text-muted-foreground space-y-1 mb-3">
            {delivery.freeDeliveryAreas.map((a) => <li key={a}>• {a}</li>)}
          </ul>
          <div className="text-xs uppercase tracking-widest text-gold">{delivery.minimumSpend}</div>
        </div>

        <div className="card-elegant p-7">
          <MapPin className="w-8 h-8 text-gold mb-4" />
          <h3 className="font-display text-xl text-gold-soft mb-3 tracking-wide">
            Delivery {delivery.paidDeliveryFee}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">To places including:</p>
          <p className="text-sm text-foreground/85 leading-relaxed">
            {delivery.paidDeliveryAreas.join(" • ")}
          </p>
        </div>

        <div className="card-elegant p-7">
          <Clock className="w-8 h-8 text-gold mb-4" />
          <h3 className="font-display text-xl text-gold-soft mb-3 tracking-wide">Short Notice</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{delivery.shortNotice}</p>
          <p className="mt-4 font-script text-xl text-gold">We'll do our best to help!</p>
        </div>
      </div>
    </section>
  );
}

/* ============================ GALLERY ============================ */

function Gallery({ gallery }: { gallery: ReturnType<typeof useSiteData>[0]["gallery"] }) {
  return (
    <section id="gallery" className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="Gallery" title="A taste of what we make" />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {gallery.map((g, i) => (
            <figure
              key={g.id}
              className={`group relative overflow-hidden rounded-lg border border-[oklch(0.82_0.13_85/0.15)] ${
                i % 5 === 0 ? "row-span-2 aspect-square md:aspect-[3/4]" : "aspect-square"
              }`}
            >
              <img
                src={g.url}
                alt={g.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-xs text-gold-soft opacity-0 group-hover:opacity-100 transition-opacity">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ CONTACT ============================ */

function Contact({
  packages,
  menuItems,
}: {
  packages: ReturnType<typeof useSiteData>[0]["packages"];
  menuItems: ReturnType<typeof useSiteData>[0]["menuItems"];
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", eventDate: "",
    eventType: "", guests: "", selection: "", message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: hook up to an email service (Resend, Mailgun, etc) via a server fn.
    console.log("Enquiry submitted:", form);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader eyebrow="Let's make your event delicious" title="Request a catering quote" />

        <div className="mt-12 card-elegant p-6 md:p-10">
          {submitted ? (
            <div className="text-center py-12 animate-fade-up">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-gold flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-3xl text-gradient-gold mb-3">Thank you!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your enquiry has been received. Cass will be in touch shortly to confirm your event details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              <Field label="Your name" required>
                <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="form-input" />
              </Field>
              <Field label="Phone" required>
                <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="form-input" />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="form-input" />
              </Field>
              <Field label="Event date">
                <input type="date" value={form.eventDate} onChange={(e) => update("eventDate", e.target.value)} className="form-input" />
              </Field>
              <Field label="Event type">
                <select value={form.eventType} onChange={(e) => update("eventType", e.target.value)} className="form-input">
                  <option value="">Select…</option>
                  <option>Birthday Party</option>
                  <option>Funeral / Wake</option>
                  <option>Business Meeting</option>
                  <option>Special Event</option>
                  <option>Family Gathering</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Number of guests">
                <input type="number" min={1} value={form.guests} onChange={(e) => update("guests", e.target.value)} className="form-input" />
              </Field>
              <Field label="Selected package / menu item" className="sm:col-span-2">
                <select value={form.selection} onChange={(e) => update("selection", e.target.value)} className="form-input">
                  <option value="">No preference yet</option>
                  <optgroup label="Packages">
                    {packages.map((p) => <option key={p.id}>{p.name}</option>)}
                  </optgroup>
                  <optgroup label="Menu items">
                    {menuItems.map((m) => <option key={m.id}>{m.name}</option>)}
                  </optgroup>
                </select>
              </Field>
              <Field label="Tell us about your event" className="sm:col-span-2">
                <textarea rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="form-input resize-none" />
              </Field>
              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-xs text-muted-foreground">
                  We'll be in touch within 24 hours.
                </p>
                <button type="submit" className="btn-gold">
                  <Mail className="w-4 h-4" /> Send enquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label, required, className = "", children,
}: { label: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs uppercase tracking-widest text-gold-soft">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

/* ============================== FOOTER ============================== */

function Footer({
  business, phoneHref,
}: { business: ReturnType<typeof useSiteData>[0]["business"]; phoneHref: string }) {
  return (
    <footer className="bg-footer-dark border-t border-[rgba(200,168,107,0.25)] py-14">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="gold-divider mb-6"><Heart className="w-4 h-4 fill-gold text-gold" /></div>
        <p className="font-script text-3xl text-gold mb-2">Let's make your next event delicious</p>
        <a href={phoneHref} className="inline-flex items-center gap-3 font-display text-3xl md:text-4xl text-gold-soft mb-2 hover:text-gold transition-colors">
          <Phone className="w-7 h-7" /> {business.phone}
        </a>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Call or message today
        </p>

        <div className="flex items-center justify-center gap-5 mb-8">
          <a href={business.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
             className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-ink transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
             className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-ink transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href={phoneHref} aria-label="Call"
             className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-ink transition-colors">
            <Phone className="w-5 h-5" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          Made fresh • Made local • Made for you — {business.location}
        </p>
        <p className="text-[10px] text-muted-foreground/60 mt-4">
          © {new Date().getFullYear()} {business.name}. ·{" "}
          <Link to="/admin" className="hover:text-gold">Admin</Link>
        </p>
      </div>

      {/* Floating call button (mobile) */}
      <a href={phoneHref}
         className="md:hidden fixed bottom-5 right-5 z-50 btn-gold shadow-gold rounded-full p-4">
        <Phone className="w-5 h-5" />
      </a>

      <style>{`
        .form-input {
          background: #FFFFFF;
          border: 1px solid rgba(43, 43, 43, 0.15);
          border-radius: 0.6rem;
          padding: 0.8rem 1rem;
          color: #2B2B2B;
          font-size: 0.95rem;
          transition: all 0.2s;
          outline: none;
        }
        .form-input:focus {
          border-color: #C8A86B;
          box-shadow: 0 0 0 3px rgba(200, 168, 107, 0.25);
        }
      `}</style>
    </footer>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center animate-fade-up">
      <p className="font-script text-2xl md:text-3xl text-gold mb-2">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-5xl text-gradient-gold tracking-wide">{title}</h2>
      <div className="gold-divider mt-5"><Sparkles className="w-4 h-4 text-gold" /></div>
    </div>
  );
}
