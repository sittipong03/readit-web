import { Star, Eye, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "./icons";

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
    <div className="h-[278px] w-[182px] rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex h-[162px] w-full items-center justify-center border-2">
        <div className="h-[128px] w-[84px] border-1">
          <img
            src={bookData.coverImage}
            alt={bookData.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="h-[116px] w-full border-2">
        <div>
          <p className="subtitle-3">{bookData.title}</p>
          <p className="body-2">{bookData.author}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <StarIcon size={16} fill="color-warning-main" />
              <p className="body-2">{bookData.rating}</p>
              <p className="body-2">({bookData.totalRatings})</p>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon size={16} fill="info-main" />
              <p className="body-2">{bookData.userRating}</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
