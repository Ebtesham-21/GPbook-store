import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary to allowed domains
  },
};

export default nextConfig;
