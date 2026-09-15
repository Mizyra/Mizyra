import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MIZYRA",
    short_name: "MIZYRA",
    description: "MIZYRA is a technology company building innovative AI, software, and intelligent digital solutions for the future.",
    start_url: "/",
    display: "standalone",
    background_color: "#000b09",
    theme_color: "#00140f",
    icons: [
      {
        src: "/logo1.png",
        sizes: "487x341",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/favicon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
