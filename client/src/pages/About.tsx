import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Award, Users, Target, Heart } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

export default function About() {
  return (
    <>
      <SEOHead
        title="About MR LUBE EXPERT - Professional Automotive Service Center"
        description="Learn about MR LUBE EXPERT's mission, values, expert team, and certifications. We provide professional vehicle care and repair solutions in Hubli, Karnataka."
        canonical="https://mrlubexpert.com/about"
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            About MR LUBE EXPERT
          </h1>
          <p className="text-xl text-secondary-foreground max-w-2xl">
            Professional Vehicle Care & Repair Solutions in Hubli, Karnataka
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-foreground mb-8" style={{ fontFamily: "Space Grotesk" }}>
            Our Story
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              MR LUBE EXPERT was founded with a simple mission: to provide premium automotive care and repair solutions to vehicle owners in Hubli and surrounding areas. With over a decade of experience in the automotive service industry, our team has built a reputation for excellence, reliability, and customer satisfaction.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Located at Opp. Murdeshwar Factory, Shivaji Layout, R N Shetty Road, our state-of-the-art facility is equipped with modern diagnostic equipment and staffed by certified technicians who are passionate about delivering exceptional service.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Whether you drive a sedan, SUV, luxury vehicle, or two-wheeler, we have the expertise and resources to keep your vehicle running at peak performance.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-card border-y border-border py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center" style={{ fontFamily: "Space Grotesk" }}>
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for excellence in every service we provide",
              },
              {
                icon: Users,
                title: "Customer Focus",
                description: "Your satisfaction is our top priority",
              },
              {
                icon: Target,
                title: "Precision",
                description: "Accurate diagnostics and meticulous workmanship",
              },
              {
                icon: Heart,
                title: "Integrity",
                description: "Honest communication and transparent pricing",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon size={48} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "Space Grotesk" }}>
                    {value.title}
                  </h3>
                  <p className="text-secondary-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center" style={{ fontFamily: "Space Grotesk" }}>
            Our Expert Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Certified Technicians",
                role: "Service Specialists",
                description: "Highly trained professionals with years of automotive experience",
              },
              {
                name: "Diagnostic Experts",
                role: "Technical Team",
                description: "Specialists in vehicle diagnostics and complex repairs",
              },
              {
                name: "Customer Service",
                role: "Support Team",
                description: "Dedicated to ensuring your complete satisfaction",
              },
            ].map((member, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users size={32} className="text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "Space Grotesk" }}>
                  {member.name}
                </h3>
                <p className="text-accent font-semibold mb-3">{member.role}</p>
                <p className="text-secondary-foreground text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="bg-card border-t border-border py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center" style={{ fontFamily: "Space Grotesk" }}>
            Certifications & Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              "ISO 9001:2015 Certified",
              "Authorized Service Center",
              "ASE Certified Technicians",
              "Industry Excellence Award",
            ].map((cert, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <Award size={32} className="text-accent flex-shrink-0" />
                <span className="text-foreground font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Experience the MR LUBE EXPERT Difference
          </h2>
          <p className="text-lg text-secondary-foreground mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and discover why vehicle owners trust us with their automotive care
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
