import { Star } from "lucide-react";
import React from "react";

const BookCard = () => {
  return (
    <>
      <div className="flex h-[278px] w-[182px] flex-col">
        <div className="h-[162px] w-full">
          <Star className="h-9 w-9"></Star>
          <div className="h-[128px] w-[84px]"></div>
        </div>
        <div className="h-[116px] w-full">
          <div>
            <p className="subtitle-3">Book Title</p>
            <p className="body-2">Author</p>
            <div className="w-[121px]">
              <div>
                <Star className="inline h-4 w-4" />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
