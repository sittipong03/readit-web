import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EditIcon, XIcon } from "./icons";
import { EyeIcon } from "lucide-react";

const ManageBookModal = ({
  isOpen,
  onClose,
  book,
  readBooks = [],
  wishlistBooks = [],
  readingBooks = [],
  onMarkAsRead,
  onWriteReview,
  onViewReview,
  onAddToReading,
  onAddToFavorites,
  onRemoveFromFavorite,
  onDeleteFromShelf,
  isFavorite = false,
}) => {
  if (!isOpen || !book) return null;

  const hasUserReview = book.hasUserReview || book.userRating;
  const isInWishlist =
    book.shelfType === "WISHLIST" ||
    wishlistBooks.some((b) => b.id === book.id);
  const isInReading = readingBooks.some((b) => b.id === book.id);
  const isInRead = readBooks.some((b) => b.id === book.id);

  useEffect(() => {
    if (isOpen && book) {
      console.log("=== Modal Book Data ===");
      console.log("Book object:", book);
      console.log("Title:", book?.title);
      console.log("Author:", book?.Author?.name || "Unknown Author");
      console.log("Cover:", book?.edition?.[0]?.coverImage);
      console.log("Shelf type:", book?.shelfType);
      console.log("========================");
    }
  }, [isOpen, book]);

  const hdlMarkAsRead = () => {
    const updatedBook = {
      ...book,
    };

    if (onMarkAsRead) {
      onMarkAsRead(updatedBook);
    }
    onClose();
  };

  const hdlAddToReading = () => {
    console.log("Add to reading:", book.title);

    const updatedBook = {
      ...book,
      shelfType: "CURRENTLY_READING",
    };

    if (onAddToReading) {
      onAddToReading(updatedBook);
    }
    onClose();
  };

  const hdlToggleFavorite = () => {
    if (isFavorite) {
      const updatedBook = {
        ...book,
        shelfType: "READ",
      };

      if (onRemoveFromFavorite) {
        onRemoveFromFavorite(updatedBook);
      }
    } else {
      const updatedBook = {
        ...book,
        shelfType: "FAVORITE",
      };

      if (onAddToFavorites) {
        onAddToFavorites(updatedBook);
      }
    }
    onClose();
  };

  const hdlDeleteFromShelf = () => {
    console.log("Delete from shelf:", book.title);

    if (onDeleteFromShelf) {
      onDeleteFromShelf(book);
    }
    onClose();
  };

  const hdlWriteReview = () => {
    // เขียน review - เปลี่ยนเป็น READ (เพราะต้องอ่านจบแล้วถึงจะรีวิวได้)
    const updatedBook = {
      ...book,
      shelfType: "READ",
    };

    if (onWriteReview) {
      onWriteReview(updatedBook);
    }
    // ไม่ปิด modal เพราะจะไป review page
  };

  const renderActionButtons = () => {
    // ถ้าอยู่ใน FAVORITE shelf
    if (isFavorite) {
      return (
        <>
          {hasUserReview && (
            <Button
              onClick={onViewReview}
              variant="contained"
              size="large"
              color="primary"
              className="w-full"
            >
              <i className="fa-solid fa-eye"></i>
              View your review
            </Button>
          )}

          <Button
            onClick={hdlToggleFavorite}
            variant="outlined"
            size="large"
            color="primary"
            className="w-full"
          >
            Remove from favorites
          </Button>

          <Button
            onClick={hdlAddToReading}
            variant="outlined"
            size="large"
            color="primary"
            className="w-full"
          >
            Add to reading
          </Button>

          <Button
            onClick={hdlDeleteFromShelf}
            variant="outlined"
            size="large"
            color="error"
            className="w-full"
          >
            Delete from shelf
          </Button>
        </>
      );
    }

    // ถ้าอยู่ใน READ shelf
    if (isInRead) {
      return (
        <>
          {hasUserReview ? (
            <Button
              onClick={onViewReview}
              variant="contained"
              size="large"
              color="primary"
              className="w-full"
            >
              <i className="fa-solid fa-eye"></i>
              View your review
            </Button>
          ) : (
            <Button
              onClick={hdlWriteReview}
              variant="contained"
              size="large"
              color="primary"
              className="w-full"
            >
              <i class="fa-solid fa-pen-to-square"></i>
              Write a review
            </Button>
          )}

          <Button
            onClick={hdlToggleFavorite}
            variant="outlined"
            size="large"
            color="primary"
            className="w-full"
            disabled={!hasUserReview}
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </Button>

          <Button
            onClick={hdlAddToReading}
            variant="outlined"
            size="large"
            color="primary"
            className="w-full"
          >
            Add to reading
          </Button>

          <Button
            onClick={hdlDeleteFromShelf}
            variant="outlined"
            size="large"
            color="error"
            className="w-full"
          >
            Delete from shelf
          </Button>
        </>
      );
    }

    // ถ้าอยู่ใน CURRENTLY_READING shelf
    if (isInReading) {
      return (
        <>
          <Button
            onClick={hdlMarkAsRead}
            variant="contained"
            size="large"
            color="primary"
            className="w-full"
          >
            Mark as read
          </Button>

          <Button
            onClick={hdlToggleFavorite}
            variant="outlined"
            size="large"
            color="primary"
            className="w-full"
          >
            Add to favorite
          </Button>

          <Button
            onClick={hdlDeleteFromShelf}
            variant="outlined"
            size="large"
            color="error"
            className="w-full"
          >
            Delete from shelf
          </Button>
        </>
      );
    }

    // ถ้าอยู่ใน WISHLIST shelf (default)
    return (
      <>
        <Button
          onClick={hdlMarkAsRead}
          variant="contained"
          size="large"
          color="primary"
          className="w-full"
        >
          Mark as read
        </Button>

        <Button
          onClick={hdlAddToReading}
          variant="outlined"
          size="large"
          color="primary"
          className="w-full"
        >
          Add to reading
        </Button>

        <Button
          onClick={hdlDeleteFromShelf}
          variant="outlined"
          size="large"
          color="error"
          className="w-full"
        >
          Delete from shelf
        </Button>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/80">
      <div className="bg-paper-elevation-6 relative h-[514px] w-[340px] max-w-[90vw] rounded-lg p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xl text-gray-400 hover:text-gray-600"
        >
          <XIcon size={20} className="text-action-active-icon" />
        </button>
        {/* Header */}
        <h2 className="subtitle-2 text-text-primary mb-6">Manage book</h2>
        {/* Book info */}
        <div className="mb-6 flex flex-col items-center">
          <div
            className="mb-8 h-[128px] w-[84px] rounded bg-cover bg-center bg-no-repeat shadow-lg"
            style={{
              backgroundImage: book?.edition?.[0]?.coverImage
                ? `url(${book?.edition?.[0]?.coverImage})`
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            {!book.coverImage && (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                {book.title?.substring(0, 2) || "BK"}
              </div>
            )}
          </div>
          <h3 className="subtitle-3 text-text-primary text-center">
            {book?.title}
          </h3>
          <p className="body-2 text-text-secondary mb-4 text-center">
            {book?.Author?.name}
          </p>{" "}
        </div>
        {/* Action buttons */}
        <div className="space-y-3">{renderActionButtons()}</div>
      </div>
    </div>
  );
};

export default ManageBookModal;
