import { SEOHead } from "@/components/SEOHead";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms & Conditions - MR LUBE EXPERT"
        description="Terms and conditions for using MR LUBE EXPERT's website and services."
        canonical="https://mrlubexpert.com/terms"
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Terms & Conditions
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
                1. Agreement to Terms
              </h2>
              <p className="text-foreground leading-relaxed">
                By accessing and using the MR LUBE EXPERT website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                2. Use License
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on MR LUBE EXPERT's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                3. Disclaimer
              </h2>
              <p className="text-foreground leading-relaxed">
                The materials on MR LUBE EXPERT's website are provided on an 'as is' basis. MR LUBE EXPERT makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                4. Limitations
              </h2>
              <p className="text-foreground leading-relaxed">
                In no event shall MR LUBE EXPERT or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MR LUBE EXPERT's website, even if MR LUBE EXPERT or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                5. Accuracy of Materials
              </h2>
              <p className="text-foreground leading-relaxed">
                The materials appearing on MR LUBE EXPERT's website could include technical, typographical, or photographic errors. MR LUBE EXPERT does not warrant that any of the materials on its website are accurate, complete, or current. MR LUBE EXPERT may make changes to the materials contained on its website at any time without notice.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                6. Links
              </h2>
              <p className="text-foreground leading-relaxed">
                MR LUBE EXPERT has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MR LUBE EXPERT of the site. Use of any such linked website is at the user's own risk.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                7. Modifications
              </h2>
              <p className="text-foreground leading-relaxed">
                MR LUBE EXPERT may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                8. Governing Law
              </h2>
              <p className="text-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                9. Service Booking Terms
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                When you book a service with MR LUBE EXPERT:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>You agree to provide accurate information about your vehicle and service requirements</li>
                <li>Cancellations must be made at least 24 hours before the scheduled appointment</li>
                <li>Prices are subject to change based on actual service requirements</li>
                <li>We reserve the right to refuse service if vehicle condition poses safety risks</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                10. Contact Us
              </h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:
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
