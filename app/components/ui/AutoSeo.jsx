"use client";

import { usePathname } from "next/navigation";
import { SEO_CONFIG } from "../../components/seoConfig";

const SITE_URL = "https://abybabyevents.com";

export function AutoSeo() {
  const pathname = usePathname();
  const config = SEO_CONFIG[pathname];

  // No entry for this path: warn in dev instead of silently reusing another page's tags.
  if (!config) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[AutoSeo] No SEO config found for path: ${pathname}`);
    }
    return null;
  }

  return (
    <>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <link rel="canonical" href={`${SITE_URL}${pathname}`} />
      {config.noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={`${SITE_URL}${pathname}`} />
      <meta property="og:type" content="website" />
    </>
  );
}