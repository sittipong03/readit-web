import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addRate } from "../api/rateApi";
import { toast } from "sonner";

export const StarRating = ({
  bookId,
  onRatingSubmitted,
  rated = 0,
  size = 32,
}) => {
  const [rating, setRating] = useState(rated);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setRating(rated);
  }, [rated]);

  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast.error("Please select a star rating first.");
      return;
    }

    console.log("bookId:", bookId);
    console.log("rating:", rating);

    setIsSubmitting(true);
    try {
      console.log("bookId2:", bookId);
      console.log("rating2:", rating);
      const updatedBook = await addRate(bookId, rating);
      toast.success("Thank you for your rating!");

      // Notify the parent component that the rating was submitted
      if (onRatingSubmitted) {
        onRatingSubmitted(updatedBook);
      }

      // Reset state after successful submission
      setRating(0);
      setHoverRating(0);
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast.error("Failed to submit rating.", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((starValue) => (
          <Star
            key={starValue}
            className={cn(
              "cursor-pointer transition-all duration-150 ease-in-out",
              isSubmitting && "animate-pulse",

              // 1. เช็คกรณี "ลดดาว" (สีแดง)
              hoverRating > 0 &&
                hoverRating < rating &&
                starValue > hoverRating &&
                starValue <= rating
                ? "fill-error-main/40 text-error-main"
                : // 2. เช็คกรณี "เพิ่มดาว" (สีเขียว)
                  hoverRating > 0 &&
                    hoverRating > rating &&
                    starValue > rating &&
                    starValue <= hoverRating
                  ? "fill-success-main/40 text-success-main scale-110"
                  : // 3. เงื่อนไขหลักสำหรับดาวที่ Active (สีน้ำเงิน)
                    starValue <= (hoverRating || rating)
                    ? "fill-info-main text-info-main scale-110"
                    : // 4. ดาวว่าง (สีเทา)
                      "fill-action-disabled/60 text-text-disabled",
            )}
            onMouseEnter={() => !isSubmitting && setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleStarClick(starValue)}
            size={size}
            strokeWidth={1}
          />
        ))}
      </div>

      {/* The submit button */}
      <Button
        onClick={handleSubmitRating}
        disabled={rating === 0 || isSubmitting}
        className="mt-2"
      >
        {isSubmitting ? "Submitting..." : "Submit Rating"}
      </Button>
    </div>
  );
};
