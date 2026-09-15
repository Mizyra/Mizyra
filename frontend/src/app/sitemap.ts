import type { MetadataRoute } from "next";

const baseUrl = "https://www.mizyra.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/apply", "/blog", "/contact", "/projects"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7
  }));
}
