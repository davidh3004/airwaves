"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Trash2,
} from "lucide-react";
import type { Lang } from "@/i18n/translations";
import type { SiteContent } from "@/types/site-content";
import { Field, SectionCard, ImageField, StringList } from "./admin-ui";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "nav", label: "Navigation" },
  { id: "trust", label: "Trust Bar" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "comfort", label: "Comfort Experience" },
  { id: "emergency", label: "Emergency" },
  { id: "maintenance", label: "Maintenance Plans" },
  { id: "financing", label: "Financing" },
  { id: "reviews", label: "Reviews" },
  { id: "areas", label: "Service Areas" },
  { id: "faq", label: "FAQ" },
  { id: "quote", label: "Quote Form" },
  { id: "cta", label: "Final CTA" },
  { id: "contact", label: "Contact Info" },
  { id: "footer", label: "Footer" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function ContentAdmin() {
  const [lang, setLang] = useState<Lang>("en");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [section, setSection] = useState<SectionId>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/content");
      if (!res.ok) throw new Error("Failed to load content");
      const data = await res.json();
      setContent(data[lang]);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, content }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Save failed");
      }
      setStatus("ok");
    } catch (e) {
      setStatus("err");
      setErrorMsg(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      return url as string;
    } catch {
      setStatus("err");
      setErrorMsg("Image upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const patch = (partial: Partial<SiteContent>) => {
    if (!content) return;
    setContent({ ...content, ...partial });
    setStatus("idle");
  };

  if (loading || !content) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-white/40">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading content…
      </div>
    );
  }

  const sidebar = (
    <nav className="flex flex-col gap-1 p-3">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => {
            setSection(s.id);
            setSidebarOpen(false);
          }}
          className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
            section === s.id
              ? "bg-sky-brand/20 text-sky-brand"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          }`}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      {/* Mobile section picker */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg border border-white/10 p-2 text-white/70"
        >
          <Menu className="h-5 w-5" />
        </button>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value as SectionId)}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        >
          {SECTIONS.map((s) => (
            <option key={s.id} value={s.id} className="bg-[#040e26]">
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sidebar — desktop */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-white/8 bg-white/[0.02]">
          {sidebar}
        </div>
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-[#040e26] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="font-semibold text-white">Sections</span>
              <button type="button" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5 text-white/60" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}

      {/* Editor panel */}
      <div className="min-w-0 flex-1 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex rounded-full border border-white/10 p-1">
            {(["en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${
                  lang === l
                    ? "bg-sky-brand text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-brand px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save {lang.toUpperCase()}
          </button>
        </div>

        {status === "ok" && (
          <div className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle2 className="h-4 w-4" /> Saved successfully
          </div>
        )}
        {status === "err" && (
          <div className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" /> {errorMsg}
          </div>
        )}

        {section === "hero" && (
          <SectionCard title="Hero">
            <Field label="Tag" value={content.hero.tag} onChange={(v) => patch({ hero: { ...content.hero, tag: v } })} />
            <Field label="Headline (use \\n for line break)" value={content.hero.headline} onChange={(v) => patch({ hero: { ...content.hero, headline: v } })} multiline />
            <Field label="Subheadline" value={content.hero.subheadline} onChange={(v) => patch({ hero: { ...content.hero, subheadline: v } })} multiline />
            <Field label="CTA — Free Estimate" value={content.hero.ctaEstimate} onChange={(v) => patch({ hero: { ...content.hero, ctaEstimate: v } })} />
            <Field label="CTA — Emergency" value={content.hero.ctaEmergency} onChange={(v) => patch({ hero: { ...content.hero, ctaEmergency: v } })} />
            <Field label="Scroll hint" value={content.hero.scroll} onChange={(v) => patch({ hero: { ...content.hero, scroll: v } })} />
          </SectionCard>
        )}

        {section === "nav" && (
          <SectionCard title="Navigation">
            {Object.entries(content.nav).map(([key, val]) => (
              <Field key={key} label={key} value={val} onChange={(v) => patch({ nav: { ...content.nav, [key]: v } })} />
            ))}
          </SectionCard>
        )}

        {section === "trust" && (
          <SectionCard title="Trust badges">
            {content.trustBadges.map((b, i) => (
              <Field
                key={i}
                label={`Badge ${i + 1}`}
                value={b.label}
                onChange={(v) => {
                  const badges = [...content.trustBadges];
                  badges[i] = { label: v };
                  patch({ trustBadges: badges });
                }}
              />
            ))}
          </SectionCard>
        )}

        {section === "services" && (
          <SectionCard title="Services">
            <Field label="Section label" value={content.services.label} onChange={(v) => patch({ services: { ...content.services, label: v } })} />
            <Field label="Heading" value={content.services.heading} onChange={(v) => patch({ services: { ...content.services, heading: v } })} />
            <Field label="Body" value={content.services.body} onChange={(v) => patch({ services: { ...content.services, body: v } })} multiline />
            {content.services.items.map((item, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-white/8 p-4">
                <p className="text-xs font-bold text-sky-brand">Service {i + 1}</p>
                <Field label="Title" value={item.title} onChange={(v) => {
                  const items = [...content.services.items];
                  items[i] = { ...items[i], title: v };
                  patch({ services: { ...content.services, items } });
                }} />
                <Field label="Description" value={item.description} onChange={(v) => {
                  const items = [...content.services.items];
                  items[i] = { ...items[i], description: v };
                  patch({ services: { ...content.services, items } });
                }} multiline />
              </div>
            ))}
          </SectionCard>
        )}

        {section === "gallery" && (
          <SectionCard title="Gallery">
            <Field label="Heading" value={content.gallery.heading} onChange={(v) => patch({ gallery: { ...content.gallery, heading: v } })} />
            <Field label="Body" value={content.gallery.body} onChange={(v) => patch({ gallery: { ...content.gallery, body: v } })} multiline />
            {content.gallery.images.map((img, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-white/8 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold text-sky-brand">Image {i + 1}</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        !window.confirm(
                          `Remove "${img.label || `image ${i + 1}`}" from the gallery? Click Save ${lang.toUpperCase()} to apply on the live site.`,
                        )
                      ) {
                        return;
                      }
                      patch({
                        gallery: {
                          ...content.gallery,
                          images: content.gallery.images.filter((_, j) => j !== i),
                        },
                      });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
                <ImageField
                  label={`Image ${i + 1}`}
                  src={img.src}
                  alt={img.alt}
                  uploading={uploading}
                  onSrc={(v) => {
                    const images = [...content.gallery.images];
                    images[i] = { ...images[i], src: v };
                    patch({ gallery: { ...content.gallery, images } });
                  }}
                  onAlt={(v) => {
                    const images = [...content.gallery.images];
                    images[i] = { ...images[i], alt: v };
                    patch({ gallery: { ...content.gallery, images } });
                  }}
                  onUpload={async (file) => {
                    const url = await uploadImage(file);
                    if (url) {
                      const images = [...content.gallery.images];
                      images[i] = { ...images[i], src: url };
                      patch({ gallery: { ...content.gallery, images } });
                    }
                  }}
                />
                <Field
                  label="Overlay label"
                  value={img.label}
                  onChange={(v) => {
                    const images = [...content.gallery.images];
                    images[i] = { ...images[i], label: v };
                    patch({ gallery: { ...content.gallery, images } });
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                patch({
                  gallery: {
                    ...content.gallery,
                    images: [
                      ...content.gallery.images,
                      { src: "", alt: "", label: "New image" },
                    ],
                  },
                })
              }
              className="text-sm text-sky-brand hover:underline"
            >
              + Add gallery image
            </button>
          </SectionCard>
        )}

        {section === "comfort" && (
          <SectionCard title="Comfort Experience">
            <Field label="Label" value={content.comfort.label} onChange={(v) => patch({ comfort: { ...content.comfort, label: v } })} />
            <Field label="Heading" value={content.comfort.heading} onChange={(v) => patch({ comfort: { ...content.comfort, heading: v } })} />
            <Field label="Body" value={content.comfort.body} onChange={(v) => patch({ comfort: { ...content.comfort, body: v } })} multiline />
            <StringList label="Bullet points" items={content.comfort.bullets} onChange={(bullets) => patch({ comfort: { ...content.comfort, bullets } })} />
            <ImageField
              label="Section image"
              src={content.comfort.imageSrc}
              alt={content.comfort.imageAlt}
              uploading={uploading}
              onSrc={(v) => patch({ comfort: { ...content.comfort, imageSrc: v } })}
              onAlt={(v) => patch({ comfort: { ...content.comfort, imageAlt: v } })}
              onUpload={async (file) => {
                const url = await uploadImage(file);
                if (url) patch({ comfort: { ...content.comfort, imageSrc: url } });
              }}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(content.comfort.stats).map(([key, val]) => (
                <Field key={key} label={`Stat: ${key}`} value={val} onChange={(v) =>
                  patch({ comfort: { ...content.comfort, stats: { ...content.comfort.stats, [key]: v } } })
                } />
              ))}
            </div>
          </SectionCard>
        )}

        {section === "emergency" && (
          <SectionCard title="Emergency Repair">
            <Field label="Badge" value={content.emergency.badge} onChange={(v) => patch({ emergency: { ...content.emergency, badge: v } })} />
            <Field label="Heading" value={content.emergency.heading} onChange={(v) => patch({ emergency: { ...content.emergency, heading: v } })} />
            <Field label="Body" value={content.emergency.body} onChange={(v) => patch({ emergency: { ...content.emergency, body: v } })} multiline />
          </SectionCard>
        )}

        {section === "maintenance" && (
          <SectionCard title="Maintenance Plans">
            <Field label="Label" value={content.maintenance.label} onChange={(v) => patch({ maintenance: { ...content.maintenance, label: v } })} />
            <Field label="Heading" value={content.maintenance.heading} onChange={(v) => patch({ maintenance: { ...content.maintenance, heading: v } })} />
            <Field label="Body" value={content.maintenance.body} onChange={(v) => patch({ maintenance: { ...content.maintenance, body: v } })} multiline />
            {content.maintenance.plans.map((plan, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-white/8 p-4">
                <p className="text-xs font-bold text-sky-brand">Plan {i + 1}</p>
                <Field label="Name" value={plan.name} onChange={(v) => {
                  const plans = [...content.maintenance.plans];
                  plans[i] = { ...plans[i], name: v };
                  patch({ maintenance: { ...content.maintenance, plans } });
                }} />
                <Field label="Description" value={plan.description} onChange={(v) => {
                  const plans = [...content.maintenance.plans];
                  plans[i] = { ...plans[i], description: v };
                  patch({ maintenance: { ...content.maintenance, plans } });
                }} multiline />
                <StringList label="Features" items={plan.features} onChange={(features) => {
                  const plans = [...content.maintenance.plans];
                  plans[i] = { ...plans[i], features };
                  patch({ maintenance: { ...content.maintenance, plans } });
                }} />
              </div>
            ))}
          </SectionCard>
        )}

        {section === "financing" && (
          <SectionCard title="Financing">
            <Field label="Label" value={content.financing.label} onChange={(v) => patch({ financing: { ...content.financing, label: v } })} />
            <Field label="Heading" value={content.financing.heading} onChange={(v) => patch({ financing: { ...content.financing, heading: v } })} />
            <Field label="Body" value={content.financing.body} onChange={(v) => patch({ financing: { ...content.financing, body: v } })} multiline />
            <Field label="CTA" value={content.financing.cta} onChange={(v) => patch({ financing: { ...content.financing, cta: v } })} />
            <Field label="Disclaimer" value={content.financing.disclaimer} onChange={(v) => patch({ financing: { ...content.financing, disclaimer: v } })} multiline />
            {content.financing.perks.map((perk, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-white/8 p-4">
                <Field label="Perk title" value={perk.title} onChange={(v) => {
                  const perks = [...content.financing.perks];
                  perks[i] = { ...perks[i], title: v };
                  patch({ financing: { ...content.financing, perks } });
                }} />
                <Field label="Perk description" value={perk.description} onChange={(v) => {
                  const perks = [...content.financing.perks];
                  perks[i] = { ...perks[i], description: v };
                  patch({ financing: { ...content.financing, perks } });
                }} multiline />
              </div>
            ))}
          </SectionCard>
        )}

        {section === "reviews" && (
          <SectionCard title="Reviews">
            <Field label="Label" value={content.reviews.label} onChange={(v) => patch({ reviews: { ...content.reviews, label: v } })} />
            <Field label="Heading" value={content.reviews.heading} onChange={(v) => patch({ reviews: { ...content.reviews, heading: v } })} />
            <Field label="Body" value={content.reviews.body} onChange={(v) => patch({ reviews: { ...content.reviews, body: v } })} multiline />
            {content.reviews.items.map((r, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-white/8 p-4">
                <p className="text-xs font-bold text-sky-brand">Review {i + 1}</p>
                <Field label="Name" value={r.name} onChange={(v) => {
                  const items = [...content.reviews.items];
                  items[i] = { ...items[i], name: v };
                  patch({ reviews: { ...content.reviews, items } });
                }} />
                <Field label="Location" value={r.location} onChange={(v) => {
                  const items = [...content.reviews.items];
                  items[i] = { ...items[i], location: v };
                  patch({ reviews: { ...content.reviews, items } });
                }} />
                <Field label="Text" value={r.text} onChange={(v) => {
                  const items = [...content.reviews.items];
                  items[i] = { ...items[i], text: v };
                  patch({ reviews: { ...content.reviews, items } });
                }} multiline />
              </div>
            ))}
          </SectionCard>
        )}

        {section === "areas" && (
          <SectionCard title="Service Areas">
            <Field label="Label" value={content.areas.label} onChange={(v) => patch({ areas: { ...content.areas, label: v } })} />
            <Field label="Heading" value={content.areas.heading} onChange={(v) => patch({ areas: { ...content.areas, heading: v } })} />
            <Field label="Body" value={content.areas.body} onChange={(v) => patch({ areas: { ...content.areas, body: v } })} multiline />
            <Field label="HQ label" value={content.areas.hq} onChange={(v) => patch({ areas: { ...content.areas, hq: v } })} />
            <Field label="Not found message" value={content.areas.notFound} onChange={(v) => patch({ areas: { ...content.areas, notFound: v } })} multiline />
          </SectionCard>
        )}

        {section === "faq" && (
          <SectionCard title="FAQ">
            <Field label="Label" value={content.faq.label} onChange={(v) => patch({ faq: { ...content.faq, label: v } })} />
            <Field label="Heading" value={content.faq.heading} onChange={(v) => patch({ faq: { ...content.faq, heading: v } })} />
            {content.faq.items.map((item, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-white/8 p-4">
                <Field label={`Q${i + 1}`} value={item.question} onChange={(v) => {
                  const items = [...content.faq.items];
                  items[i] = { ...items[i], question: v };
                  patch({ faq: { ...content.faq, items } });
                }} />
                <Field label="Answer" value={item.answer} onChange={(v) => {
                  const items = [...content.faq.items];
                  items[i] = { ...items[i], answer: v };
                  patch({ faq: { ...content.faq, items } });
                }} multiline />
              </div>
            ))}
          </SectionCard>
        )}

        {section === "quote" && (
          <SectionCard title="Quote Form">
            {Object.entries(content.quote).map(([key, val]) => (
              <Field
                key={key}
                label={key}
                value={String(val)}
                onChange={(v) => patch({ quote: { ...content.quote, [key]: v } })}
                multiline={key.includes("Body") || key === "disclaimer"}
              />
            ))}
          </SectionCard>
        )}

        {section === "cta" && (
          <SectionCard title="Final CTA">
            <Field label="Heading" value={content.cta.heading} onChange={(v) => patch({ cta: { ...content.cta, heading: v } })} />
            <Field label="Body" value={content.cta.body} onChange={(v) => patch({ cta: { ...content.cta, body: v } })} multiline />
            <Field label="Schedule button" value={content.cta.schedule} onChange={(v) => patch({ cta: { ...content.cta, schedule: v } })} />
            <Field label="Call label" value={content.cta.call} onChange={(v) => patch({ cta: { ...content.cta, call: v } })} />
          </SectionCard>
        )}

        {section === "contact" && (
          <SectionCard title="Contact Info">
            <p className="text-xs text-white/45">
              Phone numbers and address appear in the navbar, footer, emergency section, and call buttons.
            </p>
            <Field
              label="Primary phone (emergency line)"
              value={content.contact.phone1}
              onChange={(v) => patch({ contact: { ...content.contact, phone1: v } })}
            />
            <Field
              label="Secondary phone (office)"
              value={content.contact.phone2}
              onChange={(v) => patch({ contact: { ...content.contact, phone2: v } })}
            />
            <Field
              label="Address"
              value={content.contact.address}
              onChange={(v) => patch({ contact: { ...content.contact, address: v } })}
              multiline
            />
            <Field
              label="License number"
              value={content.contact.license}
              onChange={(v) => patch({ contact: { ...content.contact, license: v } })}
            />
          </SectionCard>
        )}

        {section === "footer" && (
          <SectionCard title="Footer">
            <Field label="Description" value={content.footer.description} onChange={(v) => patch({ footer: { ...content.footer, description: v } })} multiline />
            {(["quickLinks", "ourServices", "contactUs", "emergencyLine", "office", "address", "license", "privacy", "terms", "rights"] as const).map((key) => (
              <Field key={key} label={key} value={content.footer[key]} onChange={(v) => patch({ footer: { ...content.footer, [key]: v } })} />
            ))}
            <p className="text-xs font-bold text-white/40 pt-2">Footer links</p>
            {Object.entries(content.footer.links).map(([key, val]) => (
              <Field key={key} label={`links.${key}`} value={val} onChange={(v) =>
                patch({ footer: { ...content.footer, links: { ...content.footer.links, [key]: v } } })
              } />
            ))}
            {Object.entries(content.footer.serviceLinks).map(([key, val]) => (
              <Field key={key} label={`serviceLinks.${key}`} value={val} onChange={(v) =>
                patch({ footer: { ...content.footer, serviceLinks: { ...content.footer.serviceLinks, [key]: v } } })
              } />
            ))}
          </SectionCard>
        )}
      </div>
    </div>
  );
}
