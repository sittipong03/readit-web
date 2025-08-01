import { Star, Eye, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "./icons";
import ButtonTest from "../pages/test/ButtonTest";

const BookCard = ({ book, onBookClick }) => {
  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-paper-elevation-6 border-divider-soft h-fit rounded-md border-2 p-2">
      <div className="flex h-[162px] w-full items-center justify-center">
        <div
          className="bg-book-cover h-[128px] w-[84px] rounded bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${book.coverImage})`,
          }}
          onClick={() => onBookClick?.(book)}
        ></div>
      </div>
      <div className="min-h-[116px] w-full">
        <div>
          <p className="subtitle-3 line-height-titlesmall tracking-titleSmall">
            {book.title}
          </p>
          <p className="body-2">{book.author}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <StarIcon size={16} fill="color-warning-main" />
              <p className="body-2 text-text-disabled">{book.rating}</p>
              <p className="body-2 text-text-disabled">({book.totalRatings})</p>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon size={16} fill="info-main" />
              <p className="body-2">{book.userRating}</p>
            </div>
          </div>
          <div>
            <Button
              variant="outlined"
              color="secondary-soft"
              size="small"
              borderColor="secondary-outlinedBorder"
              borderRadius="1px"
              className="mt-2"
            >
              View your review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
