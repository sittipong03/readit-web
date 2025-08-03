import React from "react";
import { XIcon } from "./icons";
import { Button } from "@/components/ui/button";

const ManageBookModal = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  const hdlMarkAsRead = () => {
    console.log("Mark as Read:", book.title);
    // Add your logic here
    onClose();
  };

  const hdlAddToReading = () => {
    console.log("Add to reading:", book.title);
    // Add your logic here
    onClose();
  };

  const hdlDeleteFromShelf = () => {
    console.log("Delete from shelf:", book.title);
    // Add your logic here
    onClose();
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-paper-elevation-6 relative h-[514px] w-[340px] max-w-[90vw] rounded-lg bg-white p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xl text-gray-400 hover:text-gray-600"
        >
          <XIcon size={20} />
        </button>

        {/* Header */}
        <h2 className="subtitle-2 mb-6">Manage book</h2>

        {/* Book info */}
        <div className="mb-6 flex flex-col items-center">
          <div
            className="shadow-book-cover mb-4 h-[160px] w-[100px] rounded bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${book.coverImage})`,
            }}
          ></div>
          <h3 className="subtitle-3 mb-2">{book.title}</h3>
          <p className="body-2 text-secondary-main">{book.author}</p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button
            onClick={hdlMarkAsRead}
            variant="contained"
            color="primary"
            size="large"
            className="w-full"
          >
            Mark as read
          </Button>

          <Button
            onClick={hdlAddToReading}
            variant="outlined"
            color="primary"
            size="large"
            className="w-full"
          >
            Add to reading
          </Button>

          <Button
            onClick={hdlDeleteFromShelf}
            variant="outlined"
            color="error"
            size="large"
            className="w-full"
          >
            Delete from shelf
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageBookModal;
