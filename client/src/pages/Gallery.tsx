import { useState } from "react";
import { X } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const galleryImages = [
  {
    id: 1,
    src: "/images/hero_workshop.png",
    alt: "Workshop interior with service bays",
    category: "Workshop",
  },
  {
    id: 2,
    src: "/images/Ewl6CDfxAln8_d34f3c94.jpg",
    alt: "Lift service bay",
    category: "Service Bay",
  },
  {
    id: 3,
    src: "/images/ocVPm1VoIUNU_3a200d2b.jpg",
    alt: "Mechanic at work",
    category: "Service",
  },
  {
    id: 4,
    src: "/images/IG5RiKfI2u4y_15b1e5de.jpg",
    alt: "Wheel alignment service",
    category: "Alignment",
  },
  {
    id: 5,
    src: "/images/uKKMSA1HmDDp_0ba3896d.jpg",
    alt: "Car detailing",
    category: "Detailing",
  },
  {
    id: 6,
    src: "/images/giMoQ7EPwr5k_3abf4dec.jpg",
    alt: "Car wash service",
    category: "Washing",
  },
  {
    id: 7,
    src: "/images/hwibAicxINJP_7f7c9755.jpg",
    alt: "Engine repair",
    category: "Engine",
  },
  {
    id: 8,
    src: "/images/FP0BahL1sQnY_7bf7b579.webp",
    alt: "AC servicing",
    category: "AC Service",
  },
  {
    id: 9,
    src: "/images/l8jeFDaKgFUT_0877324e.jpg",
    alt: "Tire service",
    category: "Tires",
  },
  {
    id: 10,
    src: "/images/4VP2sf4bmSjS_bac73cbc.jpg",
    alt: "Suspension work",
    category: "Suspension",
  },
  {
    id: 11,
    src: "/images/gPQRhUy3MbXX_3230802c.jpg",
    alt: "Premium finished vehicle",
    category: "Detailing",
  },
  {
    id: 12,
    src: "/images/80XTZkntHiS6_59a4c1e4.jpg",
    alt: "Professional detailing",
    category: "Detailing",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const currentImage = selectedImage !== null ? galleryImages[selectedImage] : null;

  return (
    <>
      <SEOHead
        title="Gallery - MR LUBE EXPERT | Workshop & Service Photos"
        description="Explore our workshop, service bays, and completed projects at MR LUBE EXPERT in Hubli, Karnataka."
        canonical="https://mrlubexpert.com/gallery"
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Gallery
          </h1>
          <p className="text-xl text-secondary-foreground max-w-2xl">
            Explore our workshop, services, and completed projects
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className="relative h-64 bg-secondary rounded-lg overflow-hidden cursor-pointer group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="font-semibold">{image.category}</p>
                    <p className="text-sm text-gray-200">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10 bg-black/50 p-2 rounded-full"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="bg-card border-t border-border p-4 text-center">
              <p className="text-accent font-semibold">{currentImage.category}</p>
              <p className="text-foreground">{currentImage.alt}</p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => {
                  const idx = selectedImage ?? 0;
                  const newIndex = idx === 0 ? galleryImages.length - 1 : idx - 1;
                  setSelectedImage(newIndex);
                }}
                className="text-white hover:text-accent transition-colors px-4 py-2 bg-black/50 rounded"
              >
                ← Previous
              </button>
              <span className="text-white">
                {((selectedImage ?? 0) + 1)} / {galleryImages.length}
              </span>
              <button
                onClick={() => {
                  const idx = selectedImage ?? 0;
                  const newIndex = idx === galleryImages.length - 1 ? 0 : idx + 1;
                  setSelectedImage(newIndex);
                }}
                className="text-white hover:text-accent transition-colors px-4 py-2 bg-black/50 rounded"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
