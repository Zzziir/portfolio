import { footer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden rounded-t-[2rem] bg-[#080807] px-5 pt-20 sm:px-8">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 pb-24 md:grid-cols-12">
          {/* Statement */}
          <div className="md:col-span-5">
            <h2 className="whitespace-pre-line text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl">
              {footer.line}
            </h2>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4">
            <p className="mb-5 font-mono text-sm text-muted-foreground">
              /Quick links
            </p>
            <ul className="flex flex-wrap gap-2">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block rounded-lg border border-white/10 px-3.5 py-1.5 text-sm transition-colors hover:bg-white/[0.05]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="mb-5 font-mono text-sm text-muted-foreground">
              /Contact
            </p>
            <a
              href={`mailto:${site.email}`}
              className="text-base underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              {site.availability}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="font-mono">Built with Next.js — deployed on Vercel</span>
        </div>
      </div>

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-0.12em] flex justify-center"
      >
        <span className="select-none whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-tighter text-white/[0.035]">
          {site.lastName}
        </span>
      </div>
    </footer>
  );
}
