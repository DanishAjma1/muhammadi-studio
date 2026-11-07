import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/barbers",
        destination: "/cinematographers",
        permanent: true,
      },
      {
        source: "/barbers/:slug",
        destination: "/cinematographers/:slug",
        permanent: true,
      },
      {
        source: "/admin/barbers",
        destination: "/admin/cinematographers",
        permanent: true,
      },
    ];
  },
  images: {
    // Mockup: skip the optimizer so remote placeholder images work without a loader.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
