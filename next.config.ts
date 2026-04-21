import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/wynnhub", // exact repo name you'll use on GitHub
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
