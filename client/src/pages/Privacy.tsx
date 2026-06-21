import { SEOHead } from "@/components/SEOHead";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy - MR LUBE EXPERT"
        description="Privacy policy for MR LUBE EXPERT. Learn how we collect, use, and protect your personal data."
        canonical="https://mrlubexpert.com/privacy"
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Privacy Policy
          </h1>
          <p className="text-xl text-secondary-foreground">
            Last updated: June 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                1. Introduction
              </h2>
              <p className="text-foreground leading-relaxed">
                MR LUBE EXPERT ("we", "us", "our", or "Company") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                2. Information Collection and Use
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <h3 className="text-xl font-semibold text-accent mb-2">Types of Data Collected:</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Personal Data: Name, email address, phone number, vehicle information</li>
                <li>Usage Data: Browser type, IP address, pages visited, time and date of visits</li>
                <li>Service Data: Booking information, service history, preferences</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                3. Use of Data
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                MR LUBE EXPERT uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                4. Security of Data
              </h2>
              <p className="text-foreground leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                5. Changes to This Privacy Policy
              </h2>
              <p className="text-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                6. Contact Us
              </h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-foreground">
                <p>MR LUBE EXPERT</p>
                <p>Opp. Murdeshwar Factory, Shivaji Layout, R N Shetty Road</p>
                <p>Hubli, Karnataka 580024</p>
                <p>Phone: +91 9538223688</p>
                <p>Email: info@mrlubexpert.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
