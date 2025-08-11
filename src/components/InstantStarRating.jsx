import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { addRate } from "../api/rateApi"; // Make sure this path is correct
import { toast } from "sonner";

export const InstantStarRating = ({ bookId, onRatingSubmitted, rated = 0, size = 18 }) => {
  const [rating, setRating] = useState(rated);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setRating(rated);
  }, [rated]);

  // This function now handles the click and submit logic together
  const handleStarClick = async (starValue) => {
    if (isSubmitting) return; // Prevent multiple clicks while submitting

    setRating(starValue); // Set rating visually first for responsiveness
    setIsSubmitting(true);

    try {
      const updatedBook = await addRate(bookId, starValue);
      toast.success("Thank you for your rating!");

      if (onRatingSubmitted) {
        onRatingSubmitted(updatedBook);
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast.error("Failed to submit rating.", {
        description: "Please try again later.",
      });
      setRating(rated); // Revert to original rating on failure
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((starValue) => (
        <Star
          key={starValue}
          className={cn(
            "cursor-pointer transition-all duration-150 ease-in-out",
            isSubmitting && "animate-pulse", // Add a pulse effect while submitting
            starValue <= (hoverRating || rating)
              ? "fill-info-main text-info-main scale-110"
              : "fill-action-disabled/60 text-text-disabled"
          )}
          onMouseEnter={() => !isSubmitting && setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleStarClick(starValue)} // The magic happens here
          size={size}
          strokeWidth={1}
        />
      ))}
    </div>
  );
};