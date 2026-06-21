import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { SEOHead, ServiceSchema } from "@/components/SEOHead";

const serviceDetails: Record<string, any> = {
  "oil-change": {
    title: "Engine Oil Change",
    description: "Professional engine oil and filter replacement for optimal engine performance",
    image: "/images/oil_change.png",
    fullDescription: "Regular engine oil changes are essential for maintaining your vehicle's engine health and longevity. Our certified technicians use premium quality oils and filters to ensure your engine runs smoothly.",
    benefits: [
      "Improved engine performance",
      "Extended engine life",
      "Better fuel efficiency",
      "Reduced emissions",
      "Prevents engine wear",
    ],
  },
  "wheel-alignment": {
    title: "Wheel Alignment",
    description: "Precision wheel alignment using advanced diagnostic equipment",
    image: "/images/wheel_alignment.png",
    fullDescription: "Proper wheel alignment ensures your vehicle handles correctly and your tires wear evenly. Our state-of-the-art alignment equipment provides precise measurements and adjustments.",
    benefits: [
      "Even tire wear",
      "Improved handling",
      "Better fuel economy",
      "Reduced steering effort",
      "Enhanced safety",
    ],
  },
  "ac-service": {
    title: "AC Service",
    description: "Complete air conditioning system maintenance and repair",
    image: "/images/gVuhwGr7lPrz_8caffc3d.jpg",
    fullDescription: "Keep your vehicle's air conditioning system running efficiently. We provide comprehensive AC servicing including refrigerant recharge, filter replacement, and system diagnostics.",
    benefits: [
      "Cool and comfortable interior",
      "System efficiency",
      "Extended AC lifespan",
      "Improved air quality",
      "Preventive maintenance",
    ],
  },
  "brake-service": {
    title: "Brake Service",
    description: "Brake inspection, pads replacement, and system servicing",
    image: "/images/6cxLRUtXIkkR_74ff9e32.jpeg",
    fullDescription: "Your safety depends on reliable brakes. We offer complete brake services including pad replacement, rotor resurfacing, and system inspections.",
    benefits: [
      "Enhanced safety",
      "Smooth braking",
      "Reduced stopping distance",
      "Noise elimination",
      "System reliability",
    ],
  },
  "suspension-repair": {
    title: "Suspension Repair",
    description: "Suspension system maintenance and component replacement",
    image: "/images/xxa8SdUmv6fc_94cf6f57.jpg",
    fullDescription: "A well-maintained suspension system ensures a smooth ride and proper vehicle handling. We repair and replace suspension components including shocks, struts, and springs.",
    benefits: [
      "Smooth ride quality",
      "Better handling",
      "Improved safety",
      "Reduced tire wear",
      "Comfort enhancement",
    ],
  },
  "tire-service": {
    title: "Tire Service",
    description: "Tire replacement, balancing, and rotation services",
    image: "/images/V8nJ7AkpWb9N_5a441a20.webp",
    fullDescription: "Keep your tires in optimal condition with our comprehensive tire services including replacement, balancing, rotation, and repair.",
    benefits: [
      "Extended tire life",
      "Even wear patterns",
      "Smooth ride",
      "Improved fuel economy",
      "Enhanced safety",
    ],
  },
  "car-detailing": {
    title: "Car Detailing",
    description: "Professional interior and exterior detailing services",
    image: "/images/car_detailing.png",
    fullDescription: "Restore your vehicle's appearance with our professional detailing services. We clean and protect both interior and exterior surfaces.",
    benefits: [
      "Enhanced appearance",
      "Paint protection",
      "Interior freshness",
      "Increased resale value",
      "Long-lasting shine",
    ],
  },
  "foam-wash": {
    title: "Foam Wash",
    description: "High-pressure foam wash for thorough vehicle cleaning",
    image: "/images/GczmxzOhwp5Q_b1793735.jpg",
    fullDescription: "Our foam wash service provides a thorough and gentle cleaning of your vehicle using premium foam and high-pressure equipment.",
    benefits: [
      "Thorough cleaning",
      "Paint protection",
      "Gentle on surfaces",
      "Quick drying",
      "Professional results",
    ],
  },
  "engine-inspection": {
    title: "Engine Inspection",
    description: "Comprehensive engine diagnostic and inspection services",
    image: "/images/NwjxDq3Vowfz_ff9458cb.jpg",
    fullDescription: "Identify potential engine issues before they become major problems. Our comprehensive diagnostics use advanced equipment to assess engine health.",
    benefits: [
      "Early problem detection",
      "Preventive maintenance",
      "Improved reliability",
      "Reduced repair costs",
      "Peace of mind",
    ],
  },
  "paint-protection": {
    title: "Paint Protection",
    description: "Ceramic coating and paint protection services",
    image: "/images/gPQRhUy3MbXX_3230802c.jpg",
    fullDescription: "Protect your vehicle's paint with our professional ceramic coating service. Provides long-lasting protection against UV rays and environmental contaminants.",
    benefits: [
      "Long-lasting protection",
      "UV resistance",
      "Easy maintenance",
      "Enhanced gloss",
      "Resale value increase",
    ],
  },
};

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug || "";
  const service = serviceDetails[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link href="/services">
            <a>
              <Button className="bg-accent text-accent-foreground">Back to Services</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${service.title} - MR LUBE EXPERT | Hubli`}
        description={service.fullDescription}
        canonical={`https://mrlubexpert.com/services/${slug}`}
      />
      <ServiceSchema serviceName={service.title} description={service.fullDescription} />
      <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm">
          <Link href="/">
            <a className="text-secondary-foreground hover:text-accent">Home</a>
          </Link>
          <ChevronRight size={16} className="text-secondary-foreground" />
          <Link href="/services">
            <a className="text-secondary-foreground hover:text-accent">Services</a>
          </Link>
          <ChevronRight size={16} className="text-secondary-foreground" />
          <span className="text-accent">{service.title}</span>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-96 bg-secondary overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            {service.title}
          </h1>
          <p className="text-xl text-secondary-foreground mb-8">{service.description}</p>

          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg text-foreground leading-relaxed mb-8">
              {service.fullDescription}
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: "Space Grotesk" }}>
              Benefits
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
              Ready to Schedule This Service?
            </h3>
            <p className="text-secondary-foreground mb-6">
              Book your appointment today and experience professional automotive care
            </p>
            <Link href="/book-service">
              <a>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                  Book Now
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
