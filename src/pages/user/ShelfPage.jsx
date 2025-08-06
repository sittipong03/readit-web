import { Button } from "@/components/ui/button";
import AddBookModal from "@/src/components/AddBookModal";
import BookCard from "@/src/components/BookCard";
import BookManageModal from "@/src/components/BookManageModal";
import { ChevronsUpDown, Funnel } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useUserStore from "@/src/stores/userStore";
import axiosInstance from "@/src/utils/api";
import bookManageStore from "@/src/stores/booksManageStore";

function Shelf() {
  const books = [
    {
      id: 1,
      title: "The Wedding Crasher",
      author: "Christina Escudéz",
      coverImage:
        "https://i.harperapps.com/hcanz/covers/9780062909893/y648.jpg",
      rating: 3.2,
      totalRatings: 12,
      userRating: null,
      hasUserReview: false,
      createdAt: "2025-08-03 04:49:24.558",
    },
    {
      id: 2,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      coverImage:
        "https://www.asiabooks.com/media/catalog/product/cache/a5ac216be58c0cbce1cb04612ece96dc/9/7/9781398515697.jpg",
      rating: 4.2,
      totalRatings: 20,
      userRating: 4.5,
      hasUserReview: true,
      createdAt: "2025-08-03 04:24:24.558",
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg",
      rating: 4.8,
      totalRatings: 150,
      userRating: 5.0,
      hasUserReview: true,
      createdAt: "2025-08-03 04:01:24.558",
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
      rating: 4.1,
      totalRatings: 85,
      userRating: null,
      hasUserReview: false,
      createdAt: "2025-08-03 04:59:24.558",
    },
  ];

  const [activeTab, setActiveTab] = useState("readlist");
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isManageBookModalOpen, setIsManageBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [readingBooks, setReadingBooks] = useState([]);
  const [readBooks, setReadBooks] = useState(books);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useUserStore((state) => state.token);
  const currentUserId = useUserStore((state) => state.userId);
  const navigate = useNavigate();
  const getUserWishlist = bookManageStore((state) => state.getUserWishlist);
  const userWishlist = bookManageStore((state) => state.userWishlist);

  console.log("userWishlist-------", userWishlist);

  useEffect(() => {
    if (token) {
      // fetchBooks();
      getUserWishlist();
    } else {
      console.log("No token, redirecting to login");
      navigate("/login");
    }
  }, [token]);

  // const fetchBooks = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const response = await axiosInstance.get("/book/wishlist");

  //     console.log("API Response:wishlist", response.data);

  //     const data = response.data;

  //     // Set ข้อมูลที่ได้จาก API
  //     setWishlistBooks(data.wishlistBooks || []);
  //     setReadingBooks(data.readingBooks || []);
  //     setReadBooks(data.readBooks || []);
  //     setFavoriteBooks(data.favoriteBooks || []);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //     setError("Failed to load books. Please try again.");

  //     // fallback data
  //     const sampleBooks = [
  //       {
  //         id: 1,
  //         title: "The Wedding Crasher",
  //         author: "Christina Escudéz",
  //         coverImage:
  //           "https://i.harperapps.com/hcanz/covers/9780062909893/y648.jpg",
  //         rating: 3.2,
  //         totalRatings: 12,
  //         userRating: null,
  //         hasUserReview: false,
  //         createAt: new Date("2022-01-15"),
  //       },
  //       {
  //         id: 2,
  //         title: "The Seven Husbands of Evelyn Hugo",
  //         author: "Taylor Jenkins Reid",
  //         coverImage:
  //           "https://www.asiabooks.com/media/catalog/product/cache/a5ac216be58c0cbce1cb04612ece96dc/9/7/9781398515697.jpg",
  //         rating: 4.2,
  //         totalRatings: 20,
  //         userRating: 4.5,
  //         hasUserReview: true,
  //         createdAt: new Date("2021-01-15"),
  //       },
  //       {
  //         id: 3,
  //         title: "Atomic Habits",
  //         author: "James Clear",
  //         coverImage:
  //           "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg",
  //         rating: 4.8,
  //         totalRatings: 150,
  //         userRating: 5.0,
  //         hasUserReview: true,
  //         createdAt: new Date("2025-01-15"),
  //       },
  //       {
  //         id: 4,
  //         title: "The Midnight Library",
  //         author: "Matt Haig",
  //         coverImage:
  //           "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
  //         rating: 4.1,
  //         totalRatings: 85,
  //         userRating: null,
  //         hasUserReview: false,
  //         createdAt: new Date("2024-01-15"),
  //       },
  //     ];
  //     setReadBooks(sampleBooks);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const hdlBackToFeed = () => {
    navigate("/userprofile");
  };

  const hdlBookClick = (book) => {
    setSelectedBook(book);
    setIsManageBookModalOpen(true);
  };

  const hdlCloseModal = () => {
    setIsManageBookModalOpen(false);
    setSelectedBook(null);
  };

  const hdlAddBook = (book) => {
    const existingBook = wishlistBooks.find((b) => b.id === book.id);
    if (existingBook) {
      console.log("Book already exists in wishlist");
      return;
    }
    const newBook = {
      ...book,
      id: Date.now(),
      rating: 0,
      totalRatings: 0,
      userRating: null,
      hasUserReview: false,
    };
    setWishlistBooks((prev) => [...prev, newBook]);

    setSelectedBook(newBook);
    // setIsManageBookModalOpen(true);
  };

  const hdlMarkAsRead = (book) => {
    setReadBooks((prev) => [...prev, book]);
    setWishlistBooks((prev) => prev.filter((b) => b.id !== book.id));
    setReadingBooks((prev) => prev.filter((b) => b.id !== book.id));
    hdlCloseModal();
  };

  const hdlAddToReading = (book) => {
    setReadingBooks((prev) => [...prev, book]);
    setWishlistBooks((prev) => prev.filter((b) => b.id !== book.id));
    hdlCloseModal();
  };

  const hdlDeleteFromShelf = (book) => {
    setWishlistBooks((prev) => prev.filter((b) => b.id !== book.id));
    setReadingBooks((prev) => prev.filter((b) => b.id !== book.id));
    setReadBooks((prev) => prev.filter((b) => b.id !== book.id));
    hdlCloseModal();
  };

  const hdlToggleSort = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  const getSortedBooks = (books) => {
    return [...books].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);

      if (sortOrder === "latest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  };

  const hdlToggleFavorite = (book) => {
    if (!book?.id) return;

    const isFavoriteBook = favoriteBooks.some((fav) => fav?.id === book.id);

    if (isFavoriteBook) {
      setFavoriteBooks((prev) => prev.filter((fav) => fav?.id !== book.id));
    } else {
      if (book.hasUserReview || book.userRating) {
        setFavoriteBooks((prev) => [...prev, book]);
      }
    }
  };

  // check if a book is favorite
  const isFavorite = (book) => {
    try {
      if (!book?.id || !Array.isArray(favoriteBooks)) return false;
      return favoriteBooks
        .filter((fav) => fav && fav.id)
        .some((fav) => fav.id === book.id);
    } catch (error) {
      console.error("Error in isFavorite:", error);
      return false;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "readlist":
        return (
          <div className="flex h-full w-[900px] flex-col justify-between">
            <div className="flex h-[36px] w-full items-center justify-between">
              <div className="text-text-secondary">
                <p className="subtitle-1">Readlist</p>
              </div>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                fontWeight="Button"
                onClick={() => setIsAddBookModalOpen(true)}
              >
                + Add Book
              </Button>
            </div>
            <div className="shadow-card-3d flex h-[608px] justify-center rounded-lg p-6">
              <div className="flex h-[360px] flex-col items-center justify-between">
                {/* Reading Section */}
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                  <p className="subtitle-2">
                    Reading ({readingBooks.length}/3)
                  </p>
                </div>
                <div className="flex h-[128px] w-[852px] items-center">
                  {readingBooks.length === 0 ? (
                    <div className="flex w-full items-center justify-center">
                      <p className="text-text-disabled">
                        No books currently reading
                      </p>
                    </div>
                  ) : (
                    <div className="flex w-full gap-4 overflow-x-auto">
                      {readingBooks.slice(0, 3).map((book) => (
                        <div key={book.id} className="flex-shrink-0">
                          <div
                            className="h-28 w-20 cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
                            onClick={() => hdlBookClick(book)}
                          >
                            {book.coverImage ? (
                              <img
                                src={book.coverImage}
                                alt={book.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                                <span className="text-xs font-bold text-white">
                                  {book.title.substring(0, 2)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {readingBooks.length > 3 && (
                        <div className="flex h-28 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
                          <span className="text-sm text-gray-600">
                            +{readingBooks.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Wishlist Section */}
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                  <p className="subtitle-2">Wishlists</p>
                </div>
                <div className="flex h-[128px] w-[852px] items-center">
                  {userWishlist.length === 0 ? (
                    <div className="flex w-full items-center justify-center">
                      <div className="text-center">
                        <p className="text-text-disabled mb-2">
                          No books in wishlist yet
                        </p>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="medium"
                          onClick={() => setIsAddBookModalOpen(true)}
                        >
                          + Add your first book
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full gap-4 overflow-x-auto">
                      {userWishlist
                        .filter((item) => item.userId === currentUserId)
                        .slice(0, 6)
                        .map((item, index) => (
                          <div
                            key={`${item.book?.id || item.bookId || "book"}-${index}`}
                            className="flex-shrink-0"
                          >
                            <div
                              className="h-28 w-20 cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
                              onClick={() => hdlBookClick(item)}
                            >
                              {item.book?.edition?.[0]?.coverImage ||
                              item.book?.coverImage ? (
                                <img
                                  src={
                                    item.book?.edition?.[0]?.coverImage ||
                                    item.book?.coverImage
                                  }
                                  alt={item.book?.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                                  <span className="text-xs font-bold text-white">
                                    {item.book?.title}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      {userWishlist.length > 6 && (
                        <div
                          key={"extra-books"}
                          className="flex h-28 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200"
                        >
                          <span className="text-sm text-gray-600">
                            +{userWishlist.length - 6}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "read":
        return (
          <div className="flex h-full w-[900px] flex-col justify-between">
            <div className="flex h-[36px] w-full items-center justify-between">
              <div className="text-text-secondary">
                <p className="subtitle-1">Read</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  className="flex items-center"
                >
                  <p>Filter</p>
                  <Funnel className="fill-primary-main" />
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  onClick={hdlToggleSort}
                >
                  Sort by :{" "}
                  {sortOrder === "latest" ? "Latest Date" : "Oldest Date"}
                  <ChevronsUpDown />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  fontWeight="Button"
                  onClick={() => setIsAddBookModalOpen(true)}
                >
                  + Add Book
                </Button>
              </div>
            </div>
            <div className="shadow-card-3d flex h-[608px] justify-center rounded-lg p-6">
              <div
                className="scrollbar-hide grid w-full grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {getSortedBooks(readBooks).map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onBookClick={hdlBookClick}
                    onToggleFavorite={hdlToggleFavorite}
                    isFavorite={isFavorite(book)}
                  />
                ))}
              </div>
              {readBooks.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-text-disabled mb-2 text-lg">
                      No books read yet
                    </p>
                    <p className="text-text-secondary text-sm">
                      Start adding books you've finished reading!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "favorites":
        return (
          <div className="flex h-full w-[900px] flex-col justify-between gap-2">
            <div className="flex h-[64px] w-full items-center justify-between">
              <div className="text-text-secondary line-height-bodyLarge flex flex-col gap-2">
                <p className="subtitle-1">Favorites</p>
                <p className="body-1">
                  Only books that have been reviewed can be marked as favorites.
                </p>
              </div>
            </div>
            <div className="shadow-card-3d mt-4 flex h-[608px] justify-center rounded-lg p-6">
              {favoriteBooks.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-text-disabled mb-2 text-lg">
                      No favorite books yet
                    </p>
                    <p className="text-text-secondary text-sm">
                      Star your favorite books from the Read section!
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="scrollbar-hide grid w-full grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {favoriteBooks.map((book) => (
                    <BookCard
                      key={book.id || index}
                      book={book}
                      onBookClick={hdlBookClick}
                      onToggleFavorite={hdlToggleFavorite}
                      isFavorite={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-[888px] w-full flex-col items-center justify-center">
      <div className="bg-paper-elevation-6 flex h-full w-full justify-center">
        <div className="border-action-active flex h-[824px] w-[1280px] items-center justify-center">
          <div className="flex h-[740px] w-[1180px] flex-col justify-between">
            <div className="flex h-[36px] w-full items-center justify-between">
              <div>
                <p className="h6 text-text-primary">Your Shelves</p>
              </div>
              <div>
                <Button
                  onClick={hdlBackToFeed}
                  variant="outlined"
                  color="primary"
                  size="medium"
                >
                  Back to my feed
                </Button>
              </div>
            </div>
            <div className="flex h-[668px] w-full justify-between">
              <aside className="h-40 w-64">
                <div>
                  <nav>
                    <ul className="space-y-2">
                      <li>
                        <button
                          onClick={() => setActiveTab("readlist")}
                          className={`flex h-[48px] w-full items-center rounded-xl px-4 py-2 ${
                            activeTab === "readlist"
                              ? "bg-primary-soft subtitle-3 text-primary-main"
                              : "boody-1 hover:bg-primary-soft"
                          }`}
                        >
                          Readlist
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab("read")}
                          className={`flex h-[48px] w-full items-center rounded-xl px-4 py-2 ${
                            activeTab === "read"
                              ? "bg-primary-soft subtitle-3 text-primary-main"
                              : "body-1 hover:bg-primary-soft"
                          }`}
                        >
                          Read
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab("favorites")}
                          className={`flex h-[48px] w-full items-center rounded-xl px-4 py-2 ${
                            activeTab === "favorites"
                              ? "bg-primary-soft subtitle-3 text-primary-main"
                              : "body-1 hover:bg-primary-soft"
                          }`}
                        >
                          Favorites
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </aside>
              <div>{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      <AddBookModal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        onBookSelect={hdlAddBook}
      />

      {/* Book Manage Modal */}
      <BookManageModal
        isOpen={isManageBookModalOpen}
        onClose={hdlCloseModal}
        book={selectedBook}
        readBooks={readBooks || []}
        wishlistBooks={wishlistBooks || []}
        readingBooks={readingBooks || []}
        onBookSelect={hdlAddBook}
        isFavorite={isFavorite(selectedBook)}
        onMarkAsRead={hdlMarkAsRead}
        onAddToReading={hdlAddToReading}
        onDeleteFromShelf={hdlDeleteFromShelf}
        onWriteReview={() => {
          navigate(`/review`);
        }}
        onViewReview={() => {
          navigate(`/userprofile`);
        }}
        onAddToFavorite={hdlToggleFavorite}
        onRemoveFromFavorite={hdlToggleFavorite}
      />
    </div>
  );
}

export default Shelf;
