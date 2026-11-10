"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Projects", key: null },
  { href: "/admin/testimonials", label: "Testimonials", key: "testimonials" },
  { href: "/admin/inquiries", label: "Inquiries", key: "inquiries" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin" || pathname.startsWith("/admin/projects");
  }
  return pathname.startsWith(href);
}

export function AdminNav({
  counts,
}: {
  counts: { testimonials: number; inquiries: number };
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin sections" className="-mb-px mt-3 flex gap-1">
      {TABS.map((tab) => {
        const active = isActive(pathname, tab.href);
        const count = tab.key ? counts[tab.key] : 0;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex items-center gap-2 border-b-2 px-3 pb-3 pt-1 text-sm font-medium transition-colors ${
              active
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {count > 0 && (
              <span className="rounded-full bg-[color:var(--brand)]/20 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-[color:var(--brand-soft)]">
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
