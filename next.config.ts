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
};

export default nextConfig;
