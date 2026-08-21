import type { CSSProperties } from "react";

/**
 * Tasteful stand-in for real imagery (user requested placeholders).
 * Renders a warm-lit gradient panel with a soft light source + grain,
 * so empty slots still read as intentional art direction.
 */
export function ImagePlaceholder({
  accent = "#ea3a28",
  label,
  monogram,
  className,
  rounded = "rounded-2xl",
}: {
  accent?: string;
  label?: string;
  monogram?: string;
  className?: string;
  rounded?: string;
}) {
  const style: CSSProperties = {
    backgroundColor: "#0b0a08",
    backgroundImage: `radial-gradient(120% 90% at 50% 18%, ${accent}, transparent 55%), radial-gradient(90% 70% at 70% 110%, ${accent}22, transparent 60%)`,
  };

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className ?? ""}`}
      style={style}
      role="img"
      aria-label={label ?? "Placeholder image"}
    >
      {/* silhouette suggestion */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
      <div
        className="absolute left-1/2 top-[58%] h-[60%] w-[42%] -translate-x-1/2 rounded-[50%_50%_45%_45%/60%_60%_40%_40%] bg-black/60 blur-md"
        aria-hidden
      />
      {monogram && (
        <span className="absolute inset-0 grid place-items-center font-mono text-sm tracking-[0.3em] text-white/40">
          {monogram}
        </span>
      )}
      {label && (
        <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          {label}
        </span>
      )}
      {/* fine grain over the panel */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%222%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
