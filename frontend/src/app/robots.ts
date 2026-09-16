import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/api/", "/_next/"]
      }
    ],
    sitemap: "https://www.mizyra.org/sitemap.xml",
    host: "www.mizyra.org"
  };
}
