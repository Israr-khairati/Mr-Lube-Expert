import { SEOHead } from "@/components/SEOHead";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";

export default function Reviews() {
  return (
    <>
      <SEOHead
        title="Customer Reviews - MR LUBE EXPERT"
        description="Read authentic customer reviews and testimonials about MR LUBE EXPERT's automotive services in Hubli, Karnataka."
        canonical="https://mrlubexpert.com/reviews"
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
              Customer Reviews
            </h1>
            <p className="text-xl text-secondary-foreground max-w-2xl">
              Hear from our satisfied customers about their experience with MR LUBE EXPERT
            </p>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-1">
                <ReviewForm />
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-foreground mb-8" style={{ fontFamily: "Space Grotesk" }}>
                  What Our Customers Say
                </h2>
                <ReviewsList />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
