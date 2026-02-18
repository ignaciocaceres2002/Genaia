import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export function SEO({ title, description, ogTitle, ogDescription }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (description) setMeta("description", description);
    if (ogTitle || title) setMeta("og:title", ogTitle || title, true);
    if (ogDescription || description) setMeta("og:description", ogDescription || description || "", true);
    setMeta("og:type", "website", true);
  }, [title, description, ogTitle, ogDescription]);

  return null;
}
