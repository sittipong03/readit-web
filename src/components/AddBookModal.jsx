import React, { useState } from "react";
import { Search, Book } from "lucide-react";
import { XIcon } from "./icons";
import { Input } from "@/components/ui/input";

const BookSearchModal = ({ isOpen, onClose, onBookSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books] = useState([
    {
      id: 1,
      title: "The Unthinkable: Who Survives When Disaster Strikes",
      author: "John Green",
      cover: "/api/placeholder/60/80",
    },
    {
      id: 2,
      title: "The Fault in Our Stars",
      author: "John Green",
      cover: "/api/placeholder/60/80",
    },
    {
      id: 3,
      title: "Looking for Alaska",
      author: "John Green",
      cover: "/api/placeholder/60/80",
    },
    {
      id: 4,
      title: "Paper Towns",
      author: "John Green",
      cover: "/api/placeholder/60/80",
    },
    {
      id: 5,
      title: "An Abundance of Katherines",
      author: "John Green",
      cover: "/api/placeholder/60/80",
    },
  ]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleBookSelect = (book) => {
    if (onBookSelect) {
      onBookSelect(book);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/80">
      <div className="bg-paper-elevation-6 relative h-[444px] w-[438px] max-w-[90vw] rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="subtitle-2">Add a book</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col">
          <div className="mb-1">
            <label className="subtitle-4">Search</label>
          </div>
          <div className="flex w-full items-center justify-between gap-3">
            <div className="relative flex w-full items-center justify-between gap-3">
              <div className="absolute top-1/2 left-4 -translate-y-1/2 transform">
                <i class="fa-solid fa-book color-action-active"></i>
              </div>
              <Input
                type="text"
                placeholder="Title, author, or ISBN..."
                value={searchQuery}
                onChange={(evt) => setSearchQuery(evt.target.value)}
                className="border-divider w-full rounded-full border px-12 py-6 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button className="border-divider hover:bg-paper-elevation-7 rounded-full border p-4 shadow-inner transition-colors">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-[280px] flex-1 overflow-hidden">
          <div
            className="scrollbar-hide max-h-full space-y-3 overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                onClick={() => handleBookSelect(book)}
                className="w-cursor-pointer hover:bg-secondary-hover flex items-center space-x-4 overflow-hidden rounded-xl px-2 py-2 transition-colors"
              >
                <div className="flex h-16 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                  <Book className="h-6 w-6 text-white" />
                </div>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <h3 className="truncate font-semibold text-gray-900">
                    {index === 0 ? book.title : "Book name"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {index === 0 ? book.author : "Author"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && searchQuery && (
            <div className="py-12 text-center">
              <Book className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">
                No books found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSearchModal;
