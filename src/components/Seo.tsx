import { useEffect } from "react";
import { siteConfig } from "@/config/site";

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
}

export function Seo({ title, description, image }: SeoProps) {
  useEffect(() => {
    document.title = `${title} · ${siteConfig.name}`;
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    }
    setMeta("og:title", `${title} · ${siteConfig.name}`, "property");
    setMeta("twitter:title", `${title} · ${siteConfig.name}`);
    setMeta("og:image", image ?? `${siteConfig.url}/icons/icon-512.svg`, "property");
  }, [title, description, image]);
  return null;
}
