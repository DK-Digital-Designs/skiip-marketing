import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SKIIP",
    short_name: "SKIIP",
    description: "Skip the queues. Order instantly at events.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#0B0F2F",
    icons: [{ src: "/uploads/skiip-logo.png", sizes: "512x512", type: "image/png" }]
  };
}
