import { Star } from "lucide-react";
import React from "react";
import { StarIcon } from "./icons";
import { Button } from "./ui/button";

const BookCard = ({ book }) => {
  return (
    <div className="flex h-[360px] w-[852px] items-center justify-center">
      <div className="relative flex h-[278px] w-[182px] flex-col rounded-xl border-1 p-2">
        <div className="h-[162px] w-full">
          <StarIcon size={28} className="absolute top-4 left-4" />
          <div className="h-[128px] w-[84px]"></div>
        </div>
        <div className="flex h-[116px] w-full flex-col items-center justify-between p-2">
          <div className="flex w-full flex-col gap-1">
            <p className="subtitle-3">Book Title</p>
            <p className="body-2">Author</p>
            <div className="flex w-[121px] items-center gap-2">
              <div className="flex items-center gap-2">
                <StarIcon size={16} />
                <p className="body-2">4.2</p>
                <p className="body-2">(12)</p>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon size={16} color={"#3771E6"} />
                <p className="body-2">4.2</p>
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
