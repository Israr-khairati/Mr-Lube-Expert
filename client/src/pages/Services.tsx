import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const services = [
  {
    slug: "oil-change",
    title: "Engine Oil Change",
    description: "Professional engine oil and filter replacement for optimal engine performance",
    image: "/images/oil_change.png",
    category: "Lubricants",
  },
  {
    slug: "wheel-alignment",
    title: "Wheel Alignment",
    description: "Precision wheel alignment using advanced diagnostic equipment",
    image: "/images/wheel_alignment.png",
    category: "Repairs",
  },
  {
    slug: "ac-service",
    title: "AC Service",
    description: "Complete air conditioning system maintenance and repair",
    image: "/images/ac_service.png",
    category: "AC",
  },
  {
    slug: "brake-service",
    title: "Brake Service",
    description: "Brake inspection, pads replacement, and system servicing",
    image: "/images/brake_service.png",
    category: "Repairs",
  },
  {
    slug: "suspension-repair",
    title: "Suspension Repair",
    description: "Suspension system maintenance and component replacement",
    image: "/images/suspension_repair.png",
    category: "Suspension",
  },
  {
    slug: "tire-service",
    title: "Tire Service",
    description: "Tire replacement, balancing, and rotation services",
    image: "/images/tire_service.png",
    category: "Tires",
  },
  {
    slug: "car-detailing",
    title: "Car Detailing",
    description: "Professional interior and exterior detailing services",
    image: "/images/c2ejjyft4W9s_25d9838f.jpg",
    category: "Detailing",
  },
  {
    slug: "foam-wash",
    title: "Foam Wash",
    description: "High-pressure foam wash for thorough vehicle cleaning",
    image: "/images/foam_wash.png",
    category: "Washing",
  },
  {
    slug: "engine-inspection",
    title: "Engine Inspection",
    description: "Comprehensive engine diagnostic and inspection services",
    image: "/images/engine_inspection.png",
    category: "Repairs",
  },
  {
    slug: "paint-protection",
    title: "Paint Protection",
    description: "Ceramic coating and paint protection services",
    image: "/images/paint_protection.png",
    category: "Paint Care",
  },
];

export default function Services() {
  return (
    <>
      <SEOHead
        title="Our Services - MR LUBE EXPERT | Automotive Care in Hubli"
        description="Explore our comprehensive automotive services including oil change, wheel alignment, AC service, brake service, suspension repair, tire service, and more in Hubli, Karnataka."
        canonical="https://mrlubexpert.com/services"
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Our Services
          </h1>
          <p className="text-xl text-secondary-foreground max-w-2xl">
            Comprehensive automotive care solutions for all vehicle types
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <a>
                  <Card className="bg-card hover:bg-card/80 transition-all duration-300 h-full overflow-hidden group cursor-pointer">
                    <div className="relative h-48 overflow-hidden bg-secondary">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-accent font-semibold mb-2">{service.category}</div>
                      <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "Space Grotesk" }}>
                        {service.title}
                      </h3>
                      <p className="text-secondary-foreground mb-4 text-sm">{service.description}</p>
                      <div className="flex items-center text-accent font-semibold group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Ready to Book Your Service?
          </h2>
          <p className="text-lg text-secondary-foreground mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and experience professional automotive care
          </p>
          <Link href="/book-service">
            <a>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                Book Now
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
