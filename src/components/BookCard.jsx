import { Eye, Edit3, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditIcon, StarIcon } from "./icons";
import ButtonTest from "../pages/test/ButtonTest";
import { useNavigate } from "react-router";

const BookCard = ({ book, onBookClick, onToggleFavorite, isFavorite }) => {
  const navigate = useNavigate();

  if (!book) {
    return <div>Loading...</div>;
  }

  const hdlStarClick = (evt) => {
    evt.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(book);
    }
  };

  const hdlBookClick = () => {
    if (onBookClick) {
      onBookClick(book);
    }
  };

  const hdlGoWriteReview = () => {
    navigate("/book/cme1064jo002x9kukym9t50o1");
  };

  const hdlGoViewOwnReview = () => {
    navigate("/userproflie");
  };

  const hasReview = book.userReview || book.userRating;
  const bgColor = hasReview ? "bg-paper-elevation-6" : "bg-paper-elevation-9";
  const buttonText = hasReview ? "View your review" : "Write a review";

  return (
    <div
      className={`${bgColor} border-divider-soft h-fit rounded-md border-2 p-2`}
      onClick={hdlBookClick}
    >
      <div className="relative flex h-[162px] w-full items-center justify-center">
        {hasReview && (
          <button
            onClick={hdlStarClick}
            className="absolute top-0 left-0 z-10 rounded-full p-1 transition-colors"
          >
            <StarIcon
              size={20}
              className={`h-5 w-5 ${isFavorite ? "fill-action-active-icon stroke-action-active-icon" : "stroke-action-active-icon fill-none"} hover:fill-action-active-icon stroke-action-active-icon`}
            />
          </button>
        )}
        <div
          className="bg-book-cover h-[128px] w-[84px] rounded bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${book.coverImage})`,
          }}
          onClick={hdlBookClick}
        ></div>
      </div>
      <div className="min-h-[116px] w-full">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex w-full flex-col items-start gap-1">
            <p className="subtitle-3 text-text-primary">{book.title}</p>
            <p className="body-2 text-text-secondary">{book.author}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <StarIcon
                  size={16}
                  className={"fill-warning-main stroke-none"}
                />
                <p className="body-2 text-text-disabled">{book.rating}</p>
                <p className="body-2 text-text-disabled">
                  ({book.totalRatings})
                </p>
              </div>
              <div className="flex items-center gap-1">
                <StarIcon size={16} className={"fill-info-main stroke-none"} />
                <p className="body-2 text-text-disabled">{book.userRating}</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            {hasReview ? (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                borderColor="secondary-outlinedBorder"
                className="text-text-secondary mt-2 w-full rounded-xs"
                onClick={hdlGoViewOwnReview}
              >
                <i class="fa-solid fa-eye"></i>
                {buttonText}
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                className="text-text-secondary mt-2 w-full rounded-xs"
                onClick={hdlGoWriteReview}
              >
                <i class="fa-solid fa-pen-to-square"></i>
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
