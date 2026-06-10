"use client";

import { Upload, Plus, Trash2 } from "lucide-react";

export function Field({
  label,
  value,
  onChange,
  multiline = false,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
}) {
  const cls =
    "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 focus:border-sky-brand/50 focus:outline-none";
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-white/50">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} resize-y min-h-[80px]`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
      {hint && <p className="text-xs text-white/30">{hint}</p>}
    </label>
  );
}

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:p-6">
      <h3 className="mb-4 font-serif text-lg font-bold text-white">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function ImageField({
  label,
  src,
  alt,
  onSrc,
  onAlt,
  onUpload,
  uploading,
}: {
  label: string;
  src: string;
  alt: string;
  onSrc: (v: string) => void;
  onAlt: (v: string) => void;
  onUpload: (file: File) => void;
  uploading?: boolean;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-white/8 p-4">
      <p className="text-xs font-medium text-white/50">{label}</p>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="h-24 w-full max-w-xs rounded-lg object-cover"
        />
      )}
      <Field label="Image URL" value={src} onChange={onSrc} hint="/gallery/photo.jpg" />
      <Field label="Alt text" value={alt} onChange={onAlt} />
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70 hover:bg-white/5">
        <Upload className="h-3.5 w-3.5" />
        {uploading ? "Uploading…" : "Upload image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUpload(f);
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
}

export function StringList({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-white/50">{label}</span>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="flex items-center gap-1 text-xs text-sky-brand hover:underline"
      >
        <Plus className="h-3 w-3" /> Add item
      </button>
    </div>
  );
}
