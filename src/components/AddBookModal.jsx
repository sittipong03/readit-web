import React, { use, useEffect, useState } from "react";
import { Search, Book } from "lucide-react";
import { XIcon } from "./icons";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { set } from "zod";
import useUserStore from "../stores/userStore.js";
import axiosInstance from "../utils/api";
import bookManageStore from "../stores/booksManageStore";
import { toast } from "sonner";

const BookSearchModal = ({ isOpen, onClose, onBookSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const user = useUserStore((state) => state.userId);

  const getUserWishlist = bookManageStore((state) => state.getUserWishlist);
  const userWishlist = bookManageStore((state) => state.userWishlist);

  console.log("userWishlist", userWishlist);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/book", {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });

      console.log("API Response:---", response.data);

      let booksArray;
      if (Array.isArray(response.data)) {
        booksArray = response.data;
      } else if (Array.isArray(response.data.books)) {
        booksArray = response.data.books;
      } else if (Array.isArray(response.data.data)) {
        booksArray = response.data.data;
      } else {
        throw new Error("Invalid response format: expected an array of books");
      }

      const booksData = booksArray.map((book) => {
        const latestEdition = book.edition?.[0];

        return {
          id: book.id,
          title: book.title,
          author: book.Author?.name || "Unknown Author",
          coverImage: latestEdition?.coverImage || null,
          description: book.description,
          ratingCount: book.ratingCount,
        };
      });

      setBooks(booksData);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBooks();
      getUserWishlist();
    }
  }, [isOpen]);

  const filteredBooks = books.filter(
    (book) =>
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !userWishlist.some((wishlistBook) => {
        console.log(
          "wishlistBook.bookId === book.id",
          wishlistBook.bookId === book.id,
        );
        return wishlistBook.bookId === book.id;
      }),
  );

  const hdlBookSelect = async (book, user) => {
    console.log(book, user);
    try {
      await axiosInstance.post(
        "/book/wishlist",
        {
          bookId: book.id,
          userId: user,
          shelfType: "WISHLIST",
        },
        // {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // },
      );

      if (onBookSelect) {
        const newBook = {
          ...book,
          id: book.id,
          rating: 0,
          totalRatings: book.ratingCount || 0,
          userRating: null,
          hasUserReview: false,
          createdAt: new Date().toISOString(),
        };
        onBookSelect(newBook);
      }
      onClose();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
      } else if (error.response?.status === 409) {
        toast.error("Book is already in your wishlist!");
      } else {
        console.error("Error adding book to wishlist:", error);
        toast.error(
          `Failed to add book: ${error.response?.data?.message || error.message}`,
        );
      }
    }
  };

  const hdlClose = () => {
    setSearchQuery("");
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/80">
      <div className="bg-paper-elevation-6 relative h-[444px] w-[438px] max-w-[90vw] rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="subtitle-2 text-text-primary">Add a book</h2>
          <button
            onClick={hdlClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <XIcon className="text-action-active-icon h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col">
          <div className="mb-1">
            <label className="subtitle-4 text-text-primary">Search</label>
          </div>
          <div className="flex w-full items-center justify-between gap-3">
            <div className="relative flex w-full items-center justify-between gap-4">
              <div className="absolute top-1/2 left-5 -translate-y-1/2 transform">
                <i className="fa-solid fa-book-open-cover text-text-disabled"></i>
              </div>
              <Input
                type="text"
                placeholder="Title, author, or ISBN..."
                value={searchQuery}
                onChange={(evt) => setSearchQuery(evt.target.value)}
                className="border-divider text-text-disabled w-full rounded-full border px-12 py-6 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button className="border-divider hover:bg-paper-elevation-7 rounded-full border p-4 shadow-inner transition-colors">
                <Search className="text-secondary-main h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-[280px] flex-1 overflow-hidden">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-text-secondary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                <p className="text-text-secondary">Loading books...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="mb-2 text-red-500">{error}</p>
                <button
                  onClick={fetchBooks}
                  className="rounded-lg bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div
              className="scrollbar-hide max-h-full space-y-3 overflow-y-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => hdlBookSelect(book, user)}
                  className="w-cursor-pointer hover:bg-secondary-hover mt-2 flex items-center space-x-4 overflow-hidden rounded-xl px-2 py-2 transition-colors"
                >
                  <div className="flex h-16 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="h-full w-full rounded-lg object-cover"
                        onError={(evt) => {
                          evt.target.style.display = "none";
                          evt.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`${book.coverImage ? "hidden" : "flex"} h-6 w-6 text-white`}
                    >
                      <Book className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 items-center overflow-hidden">
                    <h3 className="subtitle-4 text-text-primary">
                      {book.title}
                    </h3>
                    <p className="body-3 text-text-secondary">{book.author}</p>
                  </div>
                </div>
              ))}

              {filteredBooks.length === 0 && searchQuery && (
                <div className="py-12 text-center">
                  <Book className="text-text-disabled mx-auto mb-4 h-12 w-12" />
                  <p className="text-text-disabled">
                    No books found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSearchModal;
