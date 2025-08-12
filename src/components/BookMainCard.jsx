import { Link, useLocation } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { formatNumber } from "../utils/NumberConverter";
import { StarRating } from "../components/StarRating";
import useUserStore from "../stores/userStore";

export const BookMainCard = ({ book, onRateClick, innerRef }) => {
  const { userId } = useUserStore();

  console.log("book :");
  console.log(book);

  return (
    <div
      ref={innerRef}
      className="bg-secondary-lighter border-secondary-light/20 book-card-wrapper relative overflow-hidden rounded-md border pb-1 transition-all hover:scale-105"
    >
      <Link to={`/book/${book.id}`}>
        <div className="bg-paper-elevation-24/20 flex h-[172px] items-center justify-center">
          <div className="bg-secondary-lighter shadow-book-lighting h-[128px] w-[84px]">
            <img
              src={
                book.edition?.[0]?.coverImage ||
                "https://via.placeholder.com/84x128"
              }
              alt={book.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-2">
        <div className="subtitle-3 text-text-primary max-h-48 truncate">
          {book.title}
        </div>
        <div className="body-3 text-text-disabled flex-1 truncate">
          {book?.Author?.name}
        </div>

        {/* ส่วนท้ายของการ์ด */}
        <div className="mt-1 pt-2">
          <div className="flex items-center justify-between gap-0">
            <Badge className="text-warning-main body-2 rounded-sm bg-transparent px-1">
              <Star
                className="fill-warning-main text-warning-main mr-0"
                size={14}
              />
              <p className="text-warning-main font-semibold">
                {book.averageRating.toFixed(1)}
              </p>
              <div className="text-text-disabled">
                ({formatNumber(book.ratingCount)})
              </div>
            </Badge>
            {userId && (
              <Badge
                onClick={() => onRateClick(book)}
                className="body-2 hover:bg-info-hover h-5 min-w-5 cursor-pointer rounded-sm bg-transparent px-1 transition-all"
              >
                {book.rating > 0 ? (
                  <>
                    <Star className="fill-info-main text-info-main" size={14} />
                    <p className="text-info-main">{book.rating}</p>
                  </>
                ) : (
                  <>
                    <Star
                      className="text-info-main"
                      size={14}
                      strokeWidth={2}
                    />
                    <p className="text-text-disabled">Rate</p>
                  </>
                )}
              </Badge>
            )}
          </div>
          <Button
            asChild
            variant="ghost"
            size="small"
            color={book?.review?.length > 0 ? "success" : "secondary"}
            className="mt-1 w-full rounded-sm"
          >
            {book?.review?.length > 0 ? (
              <Link to={`/book/${book.id}`}>
                <i className="fa-solid fa-badge-check pb-0.5"></i>
                Reviwed
              </Link>
            ) : (
              <Link to={`/book/${book.id}`}>
                <i className="fa-solid fa-pen-to-square pb-0.5"></i>
                Write a review
              </Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
