"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { createImageUpload } from "../actions";

/**
 * An image reference: a site asset path ("/assets/...") or an uploaded
 * Storage URL. Uploading goes browser → Storage via a server-signed URL.
 */
export function ImageField({
  label,
  hint,
  value,
  onChange,
  slug,
  contain = false,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  slug: string;
  contain?: boolean;
}) {
  const id = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    const signed = await createImageUpload(slug, file.name);
    if (!signed.ok) {
      setError(signed.error);
      setUploading(false);
      return;
    }
    const { error: uploadError } = await createSupabaseBrowserClient()
      .storage.from("project-media")
      .uploadToSignedUrl(signed.data.path, signed.data.token, file, {
        contentType: file.type,
      });
    if (uploadError) setError(uploadError.message);
    else onChange(signed.data.publicUrl);
    setUploading(false);
  }

  const previewable = value.startsWith("/") || value.startsWith("https://");

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}

      <div className="mt-2 flex items-start gap-3">
        <div className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-lg bg-white/[0.03] ring-1 ring-white/10">
          {previewable && (
            <Image
              src={value}
              alt=""
              fill
              sizes="112px"
              className={contain ? "object-contain p-2" : "object-cover"}
            />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex gap-2">
            <input
              id={id}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/assets/projects/... or upload"
              className={inputClass}
            />
            {value && (
              <button
                type="button"
                aria-label={`Clear ${label}`}
                onClick={() => onChange("")}
                className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInput.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-muted-foreground transition-[color,background-color,transform] duration-150 hover:bg-white/[0.04] hover:text-foreground active:scale-[0.97] disabled:opacity-60"
          >
            <Upload className="size-4" aria-hidden />
            {uploading ? "Uploading…" : "Upload image"}
          </button>
          {error && (
            <p role="alert" className="text-xs text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export const inputClass =
  "h-10 w-full min-w-0 rounded-lg border border-white/10 bg-background/50 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-white/30 focus-visible:ring-2 focus-visible:ring-white/10";
