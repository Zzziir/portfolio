import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project screenshots uploaded from /admin live in Supabase Storage.
    remotePatterns: [
      new URL(
        "https://hawgaqdlhwzuvumpvwlb.supabase.co/storage/v1/object/public/project-media/**",
      ),
    ],
  },
  async redirects() {
    // The old inquiries dashboard moved into /admin.
    return [
      { source: "/dashboard", destination: "/admin/inquiries", permanent: true },
      {
        source: "/dashboard/:path*",
        destination: "/admin/inquiries",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
