import { Star } from "lucide-react";
import React from "react";
import { StarIcon } from "./icons";
import { Button } from "../.././components/ui/button";

const BookCard = ({ book }) => {
  const bookData = book || {
    title: "The Wedding Crasher",
    author: "Christina Escudéz",
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    rating: 3.2,
    totalRatings: 12,
    userRating: null,
    hasUserReview: false,
  };
  return (
    <div className="flex h-[360px] w-[852px] items-center justify-center p-4">
      <div className="flex h-[278px] w-[182px] flex-col overflow-hidden rounded-xl border-1 p-2">
        <div className="relative h-[162px] w-full p-4">
          <StarIcon size={28} className="absolute top-3 left-3" />
          <div className="shadow-card-3d h-[128px] w-[84px] overflow-hidden object-cover">
            <img
              src={bookData.coverImage}
              alt={bookData.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex h-[116px] w-full flex-col justify-between p-2">
          <div className="flex w-full flex-col gap-1">
            <p className="subtitle-3">{bookData.title}</p>
            <p className="body-2">{bookData.author}</p>
            <div className="flex w-[121px] items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <StarIcon size={16} />
                <p className="body-2">{bookData.rating}</p>
                <p className="body-2">({bookData.totalRatings})</p>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon size={16} color={"#3771E6"} />
                <p className="body-2">{bookData.rating}</p>
              </div>
            </div>
            <div className="flex h-9 w-full items-center">
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                className={"w-full"}
              >
                View your review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
