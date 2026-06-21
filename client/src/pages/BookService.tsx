import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  vehicleType: z.enum(["CAR", "SUV", "LUXURY", "TWO_WHEELER", "FLEET"]),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  preferredDate: z.string().min(1, "Date is required"),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
  serviceSlug: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookService() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const createBooking = trpc.bookings.create.useMutation();

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await createBooking.mutateAsync({
        name: data.name,
        phone: data.phone,
        vehicleType: data.vehicleType,
        vehicleModel: data.vehicleModel,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        notes: data.notes,
        serviceSlug: data.serviceSlug,
      });
      toast.success("Booking submitted successfully! We'll contact you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const vehicleType = watch("vehicleType");

  return (
    <>
      <SEOHead
        title="Book a Service - MR LUBE EXPERT | Online Appointment"
        description="Schedule your vehicle service appointment online with MR LUBE EXPERT in Hubli. Quick booking for oil change, wheel alignment, AC service, and more."
        canonical="https://mrlubexpert.com/book-service"
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Book a Service
          </h1>
          <p className="text-xl text-secondary-foreground max-w-2xl">
            Schedule your vehicle service appointment with us
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
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

            {/* Vehicle Type */}
            <div>
              <label className="block text-foreground font-semibold mb-2">Vehicle Type *</label>
              <select
                {...register("vehicleType")}
                className="w-full px-3 py-2 bg-card border border-border text-foreground rounded-md"
              >
                <option value="">Select vehicle type</option>
                <option value="CAR">Car</option>
                <option value="SUV">SUV</option>
                <option value="LUXURY">Luxury Vehicle</option>
                <option value="TWO_WHEELER">Two Wheeler</option>
                <option value="FLEET">Fleet</option>
              </select>
              {errors.vehicleType && <p className="text-destructive text-sm mt-1">{errors.vehicleType.message}</p>}
            </div>

            {/* Vehicle Model */}
            <div>
              <label className="block text-foreground font-semibold mb-2">Vehicle Model *</label>
              <Input
                {...register("vehicleModel")}
                placeholder="e.g., Honda City, Maruti Swift"
                className="bg-card border-border text-foreground"
              />
              {errors.vehicleModel && <p className="text-destructive text-sm mt-1">{errors.vehicleModel.message}</p>}
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-foreground font-semibold mb-2">Preferred Date *</label>
              <Input
                {...register("preferredDate")}
                type="date"
                className="bg-card border-border text-foreground"
              />
              {errors.preferredDate && <p className="text-destructive text-sm mt-1">{errors.preferredDate.message}</p>}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-foreground font-semibold mb-2">Preferred Time</label>
              <Input
                {...register("preferredTime")}
                type="time"
                className="bg-card border-border text-foreground"
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-foreground font-semibold mb-2">Service Type (Optional)</label>
              <select
                {...register("serviceSlug")}
                className="w-full px-3 py-2 bg-card border border-border text-foreground rounded-md"
              >
                <option value="">Select a service</option>
                <option value="oil-change">Engine Oil Change</option>
                <option value="wheel-alignment">Wheel Alignment</option>
                <option value="ac-service">AC Service</option>
                <option value="brake-service">Brake Service</option>
                <option value="suspension-repair">Suspension Repair</option>
                <option value="tire-service">Tire Service</option>
                <option value="car-detailing">Car Detailing</option>
                <option value="foam-wash">Foam Wash</option>
                <option value="engine-inspection">Engine Inspection</option>
                <option value="paint-protection">Paint Protection</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-foreground font-semibold mb-2">Additional Notes</label>
              <Textarea
                {...register("notes")}
                placeholder="Any specific concerns or requirements?"
                className="bg-card border-border text-foreground min-h-32"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6"
            >
              {isSubmitting ? "Submitting..." : "Book Service"}
            </Button>

            {/* Contact Info */}
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <p className="text-foreground mb-2">Or contact us directly:</p>
              <div className="space-y-1">
                <p className="text-accent font-semibold">+91 9538223688</p>
                <p className="text-accent font-semibold">+91 7676317355</p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
    </>
  );
}
