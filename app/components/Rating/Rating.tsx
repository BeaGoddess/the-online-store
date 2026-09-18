import { Star } from "lucide-react";
import { cn } from "~/lib/utils";

interface RatingProps {
  rating: number;
  className?: string;
}

export const Rating = ({ rating, className }: RatingProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Star className="size-4 fill-current" strokeWidth={0} />
      <span className="font-ubuntu text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};
