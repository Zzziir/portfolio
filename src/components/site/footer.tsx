import { footer, site } from "@/lib/content";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Text3DFlip from "@/components/magicui/text-3d-flip";

export function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden rounded-t-[2rem] bg-[#080807] px-5 pb-[26vw] pt-20 sm:px-8">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12">
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
            <ul className="flex flex-wrap gap-2.5">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <InteractiveHoverButton href={link.href}>
                    {link.label}
                  </InteractiveHoverButton>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="mb-5 font-mono text-sm text-muted-foreground">
              /Contact
            </p>
            <Text3DFlip
              as="a"
              href={`mailto:${site.email}`}
              className="w-fit border-b border-foreground/50 pb-1 text-base"
              textClassName="bg-[#080807] text-foreground"
              flipTextClassName="bg-[#080807] text-foreground"
              rotateDirection="top"
              staggerDuration={0.025}
              staggerFrom="center"
            >
              {site.email}
            </Text3DFlip>
            <p className="mt-4 text-sm text-muted-foreground">
              {site.availability}
            </p>
          </div>
        </div>

        {/* Meta row - moved up into the content block so it never sits on the
            watermark. No divider line. */}
        <div className="mt-16 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="font-mono">Built with Next.js - deployed on Vercel</span>
        </div>
      </div>

      {/* Watermark - anchored to the very bottom, cut off by the screen edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
      >
        <span className="translate-y-[14%] select-none whitespace-nowrap text-[26vw] font-black uppercase leading-none tracking-tighter text-white/[0.05]">
          {site.firstName}
        </span>
      </div>
    </footer>
  );
}
