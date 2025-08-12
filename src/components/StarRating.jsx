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
  const [currentRating, setCurrentRating] = useState(rated);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentRating(rated);
  }, [rated]);

  const handleSubmitRating = async () => {
    if (currentRating === 0) {
      toast.error("Please select a star rating first.");
      return;
    }

    setIsSubmitting(true);
    try {
      // ใช้ currentRating ที่ผู้ใช้เลือก
      const updatedBook = await addRate(bookId, currentRating);
      toast.success("Thank you for your rating!");

      if (onRatingSubmitted) {
        onRatingSubmitted(updatedBook);
      }
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
                hoverRating < currentRating &&
                starValue > hoverRating &&
                starValue <= currentRating
                ? "fill-error-main/40 text-error-main"
                : // 2. เช็คกรณี "เพิ่มดาว" (สีเขียว)
                  hoverRating > 0 &&
                    hoverRating > currentRating &&
                    starValue > currentRating &&
                    starValue <= hoverRating
                  ? "fill-success-main/40 text-success-main scale-110"
                  : // 3. เงื่อนไขหลักสำหรับดาวที่ Active (สีน้ำเงิน)
                    starValue <= (hoverRating || currentRating)
                    ? "fill-info-main text-info-main scale-110"
                    : // 4. ดาวว่าง (สีเทา)
                      "fill-action-disabled/60 text-text-disabled",
            )}
            onMouseEnter={() => !isSubmitting && setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => !isSubmitting && setCurrentRating(starValue)}
            size={size}
            strokeWidth={1}
          />
        ))}
      </div>

      {/* The submit button */}
      <Button
        onClick={handleSubmitRating}
        disabled={currentRating === 0 || isSubmitting}
        className="mt-2"
      >
        {isSubmitting ? "Submitting..." : "Submit Rating"}
      </Button>
    </div>
  );
};
