import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Spinner } from "@/components/ui/spinner";

export default function ReviewsList() {
  const { data: reviews, isLoading } = trpc.reviews.list.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-foreground">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-card border border-border p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-bold text-foreground" style={{ fontFamily: "Space Grotesk" }}>
                {review.customerName}
              </h4>
              {review.serviceType && (
                <p className="text-xs text-secondary-foreground mt-1">{review.serviceType}</p>
              )}
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < review.rating ? "fill-accent text-accent" : "text-secondary-foreground"}
                />
              ))}
            </div>
          </div>

          <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
          <p className="text-secondary-foreground text-sm mb-3">{review.message}</p>

          <p className="text-xs text-secondary-foreground">
            {new Date(review.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </Card>
      ))}
    </div>
  );
}
