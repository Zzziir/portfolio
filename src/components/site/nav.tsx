"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { ArrowUpRight } from "@/components/icons";

export function NavPill() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // On subpages, prefix section anchors with "/" so they navigate home first.
  const to = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
        className="pointer-events-auto w-full max-w-[340px]"
      >
        <div className="rounded-2xl border border-white/10 bg-card/80 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-2">
            <a
              href={isHome ? "#top" : "/"}
              onClick={() => setOpen(false)}
              className="pl-3 text-[15px] font-semibold tracking-tight"
            >
              {site.firstName}
              <span className="text-muted-foreground">.</span>
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-xl bg-foreground text-background transition-transform active:scale-95"
            >
              <MenuGlyph open={open} />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="overflow-hidden"
              >
                <ul className="mt-1.5 flex flex-col p-1.5">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, ease: EASE_OUT }}
                    >
                      <a
                        href={to(item.href)}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                      >
                        {item.label}
                        <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <a
                  href={to("#contact")}
                  onClick={() => setOpen(false)}
                  className="m-1.5 flex items-center justify-center gap-1.5 rounded-xl bg-foreground py-3 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
                >
                  Let’s talk
                  <ArrowUpRight className="size-4" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}

/** Three-dot glyph that morphs to an X when open. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative block size-4">
      {open ? (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      ) : (
        <span className="flex h-full w-full items-center justify-center gap-[3px]">
          <span className="size-[3px] rounded-full bg-current" />
          <span className="size-[3px] rounded-full bg-current" />
          <span className="size-[3px] rounded-full bg-current" />
        </span>
      )}
    </span>
  );
}
