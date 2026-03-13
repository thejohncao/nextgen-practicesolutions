import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://nextgenpractice.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/assessments",
    "/how-it-works",
    "/pricing",
    "/narrative",
    "/results",
    "/book",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date("2026-03-13"),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
