import { useEffect } from "react";

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
}: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
}) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const metaTags = {
      description: description,
      "og:title": title,
      "og:description": description,
      "og:url": canonical,
      "og:type": ogType,
      "twitter:title": title,
      "twitter:description": description,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        if (name.startsWith("og:") || name.startsWith("twitter:")) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });

    // Update canonical link
    let canonical_link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical_link) {
      canonical_link = document.createElement("link");
      canonical_link.rel = "canonical";
      document.head.appendChild(canonical_link);
    }
    canonical_link.href = canonical;

    // Update OG Image if provided
    if (ogImage) {
      let ogImageMeta = document.querySelector("meta[property='og:image']");
      if (!ogImageMeta) {
        ogImageMeta = document.createElement("meta");
        ogImageMeta.setAttribute("property", "og:image");
        document.head.appendChild(ogImageMeta);
      }
      ogImageMeta.setAttribute("content", ogImage);
    }
  }, [title, description, canonical, ogImage, ogType]);

  return null;
}

export function LocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mrlubexpert.com",
      name: "MR LUBE EXPERT",
      image: "https://mrlubexpert.com/logo.png",
      description: "Professional Vehicle Care & Repair Solutions",
      url: "https://mrlubexpert.com",
      telephone: "+919538223688",
      email: "info@mrlubexpert.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Opp. Murdeshwar Factory, Shivaji Layout, R N Shetty Road",
        addressLocality: "Hubli",
        addressRegion: "Karnataka",
        postalCode: "580024",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 15.35671,
        longitude: 75.34589,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "14:00",
        },
      ],
      priceRange: "$$",
      sameAs: [
        "https://www.facebook.com/mrlubexpert",
        "https://www.instagram.com/mrlubexpert",
        "https://www.whatsapp.com",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "150",
      },
    };

    // Remove existing schema if present
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}

export function ServiceSchema({ serviceName, description }: { serviceName: string; description: string }) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      description: description,
      provider: {
        "@type": "LocalBusiness",
        name: "MR LUBE EXPERT",
        url: "https://mrlubexpert.com",
      },
      areaServed: {
        "@type": "City",
        name: "Hubli",
      },
    };

    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [serviceName, description]);

  return null;
}
