import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), usb=(), payment=()" }
];

const allowedDevOrigins = [
  "192.168.0.150",
  ...(process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? [])
];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  }
};

export default nextConfig;
