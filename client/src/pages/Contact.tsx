import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const createContact = trpc.contacts.create.useMutation();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await createContact.mutateAsync(data);
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact MR LUBE EXPERT - Hubli, Karnataka"
        description="Get in touch with MR LUBE EXPERT in Hubli. Phone: +91 9538223688. Address: Opp. Murdeshwar Factory, Shivaji Layout, R N Shetty Road, Hubli, Karnataka 580024."
        canonical="https://mrlubexpert.com/contact"
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Contact Us
          </h1>
          <p className="text-xl text-secondary-foreground max-w-2xl">
            Get in touch with MR LUBE EXPERT for all your automotive needs
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Phone */}
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Phone size={32} className="text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-secondary-foreground text-sm mb-2">+91 9538223688</p>
              <p className="text-secondary-foreground text-sm">+91 7676317355</p>
            </div>

            {/* Email */}
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Mail size={32} className="text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
              <p className="text-secondary-foreground text-sm">info@mrlubexpert.com</p>
            </div>

            {/* Location */}
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <MapPin size={32} className="text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
              <p className="text-secondary-foreground text-sm">Opp. Murdeshwar Factory, Shivaji Layout, R N Shetty Road, Hubli, Karnataka 580024</p>
            </div>

            {/* Hours */}
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Clock size={32} className="text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Hours</h3>
              <p className="text-secondary-foreground text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
              <p className="text-secondary-foreground text-sm">Sun: Closed</p>
            </div>
          </div>

          {/* Map */}
          <div className="mb-20 rounded-lg overflow-hidden border border-border h-96">
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

          {/* Contact Form and WhatsApp */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-foreground mb-8" style={{ fontFamily: "Space Grotesk" }}>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-foreground font-semibold mb-2">Full Name *</label>
                  <Input
                    {...register("name")}
                    placeholder="Your name"
                    className="bg-card border-border text-foreground"
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-foreground font-semibold mb-2">Phone Number *</label>
                  <Input
                    {...register("phone")}
                    placeholder="+91 XXXXXXXXXX"
                    className="bg-card border-border text-foreground"
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-foreground font-semibold mb-2">Email Address *</label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="bg-card border-border text-foreground"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-foreground font-semibold mb-2">Subject *</label>
                  <Input
                    {...register("subject")}
                    placeholder="How can we help?"
                    className="bg-card border-border text-foreground"
                  />
                  {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-foreground font-semibold mb-2">Message *</label>
                  <Textarea
                    {...register("message")}
                    placeholder="Your message here..."
                    className="bg-card border-border text-foreground min-h-32"
                  />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* WhatsApp CTA */}
            <div className="flex flex-col gap-6">
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <MessageCircle size={48} className="text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                  Quick Chat
                </h3>
                <p className="text-secondary-foreground mb-6">
                  Message us on WhatsApp for instant support and quick responses
                </p>
                <a
                  href="https://wa.me/919538223688?text=Hi%20MR%20LUBE%20EXPERT%2C%20I%20need%20assistance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>

              {/* Business Hours */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground">Monday - Friday</span>
                    <span className="text-foreground font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground">Saturday</span>
                    <span className="text-foreground font-semibold">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground">Sunday</span>
                    <span className="text-destructive font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
