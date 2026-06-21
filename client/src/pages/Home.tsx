import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, Zap, Shield, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { SEOHead, LocalBusinessSchema } from "@/components/SEOHead";
import FAQ from "@/components/FAQ";

const featuredServices = [
  {
    slug: "oil-change",
    title: "Engine Oil Change",
    description: "Professional oil and filter replacement",
    image: "/images/Ia6ntSAiU55k_4b369633.jpeg",
  },
  {
    slug: "wheel-alignment",
    title: "Wheel Alignment",
    description: "Precision alignment for optimal handling",
    image: "/images/uWp5WR16Kqe2_3cac5771.jpg",
  },
  {
    slug: "ac-service",
    title: "AC Service",
    description: "Complete air conditioning maintenance",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663778348146/WCQUEQxuiBZXhCdq.webp",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Car Owner",
    text: "Excellent service! The team is professional and the work quality is outstanding. Highly recommended.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "SUV Owner",
    text: "Best automotive service center in Hubli. They really care about their customers and vehicles.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Fleet Operator",
    text: "Reliable service with competitive pricing. We trust MR LUBE EXPERT for all our fleet maintenance.",
    rating: 5,
  },
];

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < target) {
      const timer = setTimeout(() => setCount(count + Math.ceil(target / 50)), 50);
      return () => clearTimeout(timer);
    }
  }, [count, target]);

  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-accent mb-2">{Math.min(count, target)}+</div>
      <div className="text-secondary-foreground">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SEOHead
        title="MR LUBE EXPERT - Professional Vehicle Care & Repair Solutions in Hubli"
        description="Premium automotive service center in Hubli, Karnataka. Oil change, wheel alignment, AC service, brake service, and more. Expert technicians, advanced equipment, guaranteed quality."
        canonical="https://mrlubexpert.com/"
      />
      <LocalBusinessSchema />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1
                className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
                style={{ fontFamily: "Space Grotesk" }}
              >
                Precision Vehicle Care
              </h1>
              <p className="text-xl text-secondary-foreground mb-8 leading-relaxed">
                Professional automotive service and repair solutions for all vehicle types in Hubli, Karnataka.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book-service">
                  <a>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                      Book Service Now
                    </Button>
                  </a>
                </Link>
                <a
                  href="https://wa.me/919538223688?text=Hi%20MR%20LUBE%20EXPERT%2C%20I%20need%20assistance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 text-lg px-8 py-6">
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/images/MSTB0hFucflE_2c75bb71.jpg"
                alt="Professional automotive workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-card border-y border-border py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-5xl font-bold text-foreground mb-4 text-center"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Featured Services
          </h2>
          <p className="text-center text-secondary-foreground mb-12 max-w-2xl mx-auto text-lg">
            Explore our most popular automotive services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card className="bg-background hover:bg-background/80 transition-all duration-300 h-full overflow-hidden group cursor-pointer">
                  <div className="relative h-48 overflow-hidden bg-secondary">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "Space Grotesk" }}>
                      {service.title}
                    </h3>
                    <p className="text-secondary-foreground mb-4">{service.description}</p>
                    <div className="flex items-center text-accent font-semibold group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-5xl font-bold text-foreground mb-4 text-center"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Why Choose MR LUBE EXPERT
          </h2>
          <p className="text-center text-secondary-foreground mb-12 max-w-2xl mx-auto text-lg">
            We deliver exceptional automotive care with professional expertise
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Expert Technicians",
                description: "Certified professionals with years of experience",
              },
              {
                icon: Zap,
                title: "Advanced Equipment",
                description: "State-of-the-art diagnostic and service tools",
              },
              {
                icon: Users,
                title: "Customer Focus",
                description: "Your satisfaction is our top priority",
              },
              {
                icon: Star,
                title: "Quality Guarantee",
                description: "Premium service with guaranteed results",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <Icon size={48} className="text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "Space Grotesk" }}>
                    {item.title}
                  </h3>
                  <p className="text-secondary-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-card border-y border-border py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Counter target={500} label="Happy Customers" />
            <Counter target={1000} label="Services Completed" />
            <Counter target={10} label="Years Experience" />
            <Counter target={100} label="Expert Team Members" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-5xl font-bold text-foreground mb-4 text-center"
            style={{ fontFamily: "Space Grotesk" }}
          >
            What Our Customers Say
          </h2>
          <p className="text-center text-secondary-foreground mb-12 max-w-2xl mx-auto text-lg">
            Real feedback from satisfied vehicle owners
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border border-border p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-secondary-foreground text-sm">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="bg-card border-t border-border py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-5xl font-bold text-foreground mb-12 text-center"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Our Workshop
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              "/images/Ewl6CDfxAln8_d34f3c94.jpg",
              "/images/ocVPm1VoIUNU_3a200d2b.jpg",
              "/images/IG5RiKfI2u4y_15b1e5de.jpg",
              "/images/uKKMSA1HmDDp_0ba3896d.jpg",
              "/images/giMoQ7EPwr5k_3abf4dec.jpg",
              "/images/hwibAicxINJP_7f7c9755.jpg",
            ].map((image, index) => (
              <div key={index} className="relative h-48 rounded-lg overflow-hidden group">
                <img
                  src={image}
                  alt={`Workshop ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/gallery">
              <a>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                  View Full Gallery
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <div className="rounded-lg overflow-hidden border border-border h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.8485847847527!2d75.34589!3d15.35671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4a0e0e0e0e0e1%3A0x0!2sHubli%2C%20Karnataka%20580024!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info */}
            <div>
              <h2
                className="text-5xl font-bold text-foreground mb-6"
                style={{ fontFamily: "Space Grotesk" }}
              >
                Visit Us Today
              </h2>
              <div className="space-y-6">
                <div>
                  <p className="text-accent font-semibold mb-2">Address</p>
                  <p className="text-foreground">
                    Opp. Murdeshwar Factory, Shivaji Layout, R N Shetty Road, Hubli, Karnataka 580024
                  </p>
                </div>
                <div>
                  <p className="text-accent font-semibold mb-2">Phone</p>
                  <p className="text-foreground">+91 9538223688</p>
                  <p className="text-foreground">+91 7676317355</p>
                </div>
                <div>
                  <p className="text-accent font-semibold mb-2">Hours</p>
                  <p className="text-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-foreground">Saturday: 9:00 AM - 2:00 PM</p>
                  <p className="text-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <section className="bg-card border-t border-border py-20">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Ready for Professional Vehicle Care?
          </h2>
          <p className="text-xl text-secondary-foreground mb-8 max-w-2xl mx-auto">
            Book your service appointment today and experience the MR LUBE EXPERT difference
          </p>
          <Link href="/book-service">
            <a>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                Book Your Service
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
