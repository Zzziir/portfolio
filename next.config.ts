import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // We only ever serve our own first-party SVGs through next/image (e.g. the
    // Nichido dashboard mockup). Lock the optimizer down so a served SVG can
    // never execute script or load anything external.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
