import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: "export",
   basePath: "/wynnhub",
   images: {
      unoptimized: true,
   },
};

export default nextConfig;
