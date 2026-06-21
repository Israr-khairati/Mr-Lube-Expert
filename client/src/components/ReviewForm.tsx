import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createReview = trpc.reviews.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createReview.mutateAsync({
        customerName: name,
        customerEmail: email,
        rating,
        title,
        message,
        serviceType: serviceType || undefined,
      });

      toast.success("Thank you! Your review has been submitted and will appear after approval.");
      setName("");
      setEmail("");
      setRating(5);
      setTitle("");
      setMessage("");
      setServiceType("");
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-background border border-border p-8">
      <h3 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "Space Grotesk" }}>
        Share Your Experience
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-foreground mb-2 block">
              Your Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="bg-secondary border-border text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground mb-2 block">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="bg-secondary border-border text-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="service" className="text-foreground mb-2 block">
              Service Type (Optional)
            </Label>
            <select
              id="service"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-md text-foreground"
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
          <div>
            <Label className="text-foreground mb-2 block">Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={star <= rating ? "fill-accent text-accent" : "text-secondary-foreground"}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="title" className="text-foreground mb-2 block">
            Review Title *
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Excellent service and professional team"
            required
            className="bg-secondary border-border text-foreground"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-foreground mb-2 block">
            Your Review *
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your experience with MR LUBE EXPERT..."
            required
            minLength={10}
            rows={5}
            className="bg-secondary border-border text-foreground"
          />
          <p className="text-xs text-secondary-foreground mt-1">Minimum 10 characters</p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
        <p className="text-xs text-secondary-foreground text-center">
          Your review will be moderated and published after approval.
        </p>
      </form>
    </Card>
  );
}
