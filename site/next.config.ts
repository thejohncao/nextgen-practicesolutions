import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nextgen-practicesolutions/site",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
