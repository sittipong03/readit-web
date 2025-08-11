import { Button } from "@/components/ui/button";
import AddBookModal from "@/src/components/AddBookModal";
import BookCard from "@/src/components/BookCard";
import BookManageModal from "@/src/components/BookManageModal";
import { Funnel } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useUserStore from "@/src/stores/userStore";
import axiosInstance from "@/src/utils/api";
import bookManageStore from "@/src/stores/booksManageStore";

function Shelf() {
  const books = [
    {
      id: 1,
      title: "Yellow Face",
      author: "R. F. Kuang",
      coverImage:
        "https://m.media-amazon.com/images/I/51hxRAoHuxL._SL1500_.jpg",
      rating: 4.13,
      totalRatings: 1532,
      userRating: null,
      hasUserReview: false,
      createdAt: "2025-08-03 04:49:24.558",
    },
    {
      id: 2,
      title: "Educated: A Memoir",
      author: "Tara Westover",
      coverImage:
        "https://m.media-amazon.com/images/I/71-4MkLN5jL.jp…oto.goodreads.com/books/1721918653l/198902277.jpg",
      rating: 4.39,
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
        "https://m.media-amazon.com/images/I/81ANaVZk5LL._U…oto.goodreads.com/books/1721918653l/198902277.jpg",
      rating: 4.15,
      totalRatings: 150,
      userRating: 5.0,
      hasUserReview: true,
      createdAt: "2025-08-03 04:01:24.558",
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      coverImage:
        "https://m.media-amazon.com/images/I/71wANojhEKL.jp…oto.goodreads.com/books/1721918653l/198902277.jpg",
      rating: 4.02,
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
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const token = useUserStore((state) => state.token);
  const currentUserId = useUserStore((state) => state.userId);
  const getUserWishlist = bookManageStore((state) => state.getUserWishlist);
  const userWishlist = bookManageStore((state) => state.userWishlist);
  const navigate = useNavigate();

  console.log("userWishlist-------", userWishlist);

  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (token) {
      // fetchBooks();
      getUserWishlist();
    } else {
      console.log("No token, redirecting to login");
      navigate("/login");
    }
  }, [token, refreshTrigger]);

  const moveBookToSection = async (book, newShelfType) => {
    let actualShelfType = "WISHLIST";

    if (userWishlist.some((item) => item.book?.id === book.id)) {
      actualShelfType = "WISHLIST";
    } else if (readingBooks.some((b) => b.id === book.id)) {
      actualShelfType = "CURRENTLY_READING";
    } else if (readBooks.some((b) => b.id === book.id)) {
      actualShelfType = "READ";
    } else if (favoriteBooks.some((b) => b.id === book.id)) {
      actualShelfType = "FAVORITE";
    }

    console.log(
      `Moving book "${book.title}" from ${book.shelfType} to ${newShelfType}`,
    );

    if (actualShelfType === newShelfType) {
      console.log("Same shelf detected, skipping API call");
      hdlCloseModal();
      return;
    }

    try {
      // เรียก API เพื่ออัพเดตในฐานข้อมูล
      const response = await axiosInstance.patch("/book/wishlist", {
        bookId: book.id,
        fromShelf: book.shelfType,
        toShelf: newShelfType,
        userId: currentUserId,
      });

      console.log("API Response:", response.data);

      setWishlistBooks((prev) => prev.filter((b) => b.id !== book.id));
      setReadingBooks((prev) => prev.filter((b) => b.id !== book.id));
      setReadBooks((prev) => prev.filter((b) => b.id !== book.id));
      setFavoriteBooks((prev) => prev.filter((b) => b.id !== book.id));

      const updatedBook = { ...book, shelfType: newShelfType };

      switch (newShelfType) {
        case "WISHLIST":
          setWishlistBooks((prev) => [...prev, updatedBook]);
          break;
        case "CURRENTLY_READING":
          setReadingBooks((prev) => [...prev, updatedBook]);
          break;
        case "READ":
          setReadBooks((prev) => [...prev, updatedBook]);
          break;
        case "FAVORITE":
          setFavoriteBooks((prev) => [...prev, updatedBook]);
          break;
        default:
          console.warn(`Unknown shelf type: ${newShelfType}`);
      }

      // Refresh ข้อมูลจาก API
      refreshData();
    } catch (error) {
      console.error("Error moving book:", error);

      // แสดง error message
      setError(`Failed to move book to ${newShelfType}. Please try again.`);

      // Fallback: อัพเดต local state เท่านั้น
      // ลบออกจาก section เดิมทั้งหมด
      setWishlistBooks((prev) => prev.filter((b) => b.id !== book.id));
      setReadingBooks((prev) => prev.filter((b) => b.id !== book.id));
      setReadBooks((prev) => prev.filter((b) => b.id !== book.id));
      setFavoriteBooks((prev) => prev.filter((b) => b.id !== book.id));

      // เพิ่มเข้า section ใหม่ตาม shelfType
      const updatedBook = { ...book, shelfType: newShelfType };

      switch (newShelfType) {
        case "WISHLIST":
          setWishlistBooks((prev) => [...prev, updatedBook]);
          break;
        case "CURRENTLY_READING":
          setReadingBooks((prev) => [...prev, updatedBook]);
          break;
        case "READ":
          setReadBooks((prev) => [...prev, updatedBook]);
          break;
        case "FAVORITE":
          setFavoriteBooks((prev) => [...prev, updatedBook]);
          break;
        default:
          console.warn(`Unknown shelf type: ${newShelfType}`);
      }
    }
  };

  const hdlBackToFeed = () => {
    navigate("/home");
  };

  const hdlBookClick = (item) => {
    console.log("=== Before sending to modal ===");
    console.log("Original item:", item);
    console.log("item.shelfType:", item.shelfType);

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (!item) {
      console.error("No book data found!");
      return;
    }

    let bookObject;
    let shelfType;

    if (item.book) {
      // กรณีจาก API (userWishlist): {book: {...}, shelfType: "..."}
      bookObject = item.book;
      shelfType = item.shelfType || item.ShelfType || "WISHLIST";
      console.log("API case - bookObject:", bookObject.title);
    } else if (item.id && item.title) {
      // กรณีจาก local state: {id: "...", title: "...", shelfType: "..."}
      bookObject = item;
      shelfType = item.shelfType || "WISHLIST";
      console.log("Local state case - bookObject:", bookObject.title);
    } else {
      console.error("No valid book data found!");
      console.log("item keys:", Object.keys(item));
      console.log("item.book exists:", !!item.book);
      console.log("item.id exists:", !!item.id);
      console.log("item.title exists:", !!item.title);
      return;
    }

    // ลบ shelfType ออกจาก book object ก่อน spread เพื่อไม่ให้ override
    const { shelfType: bookShelfType, ...bookWithoutShelfType } = bookObject;

    const bookData = {
      ...bookWithoutShelfType,
      shelfType: shelfType, // ใส่ shelfType ที่ถูกต้องหลังจาก spread
      shelfId: item.id || bookObject.id,
      addedAt: item.addedAt,
    };

    console.log("Sending to modal:", bookData);
    console.log("Final shelfType:", shelfType);
    console.log("bookData.shelfType:", bookData.shelfType);
    console.log("Original book.shelfType:", bookShelfType);

    setSelectedBook(bookData);
    setIsManageBookModalOpen(true);
  };

  const hdlCloseModal = () => {
    setIsManageBookModalOpen(false);
    setSelectedBook(null);
  };

  const hdlAddBook = async (book) => {
    try {
      const existingBook = wishlistBooks.find((b) => b.id === book.id);
      if (existingBook) {
        console.log("Book already exists in wishlist");
        return;
      }

      const response = await axiosInstance.post("/book/wishlist", {
        bookId: book.id,
        userId: currentUserId,
        shelfType: "WISHLIST",
      });

      console.log("Book added to wishlist:", response.data);

      // Refresh ข้อมูลจาก API
      refreshData();
    } catch (error) {
      console.error("Error adding book to wishlist:", error);
      setError("Failed to add book to wishlist. Please try again.");
      const newBook = {
        ...book,
        id: Date.now(),
        rating: 0,
        totalRatings: 0,
        userRating: null,
        hasUserReview: false,
        shelfType: "WISHLIST",
      };
      setWishlistBooks((prev) => [...prev, newBook]);

      setSelectedBook(newBook);
      refreshData();
      // setIsManageBookModalOpen(true);
    }
  };

  const hdlMarkAsRead = async (book) => {
    if (!book) {
      console.warn("Book is undefined");
      return;
    }

    moveBookToSection(book, "READ");
    hdlCloseModal();
  };

  const hdlAddToReading = async (book) => {
    console.log("Adding book as reading:", book.title);
    await moveBookToSection(book, "CURRENTLY_READING");
    hdlCloseModal();
  };

  const hdlDeleteFromShelf = async (book) => {
    console.log("Deleting book from all shelves:", book.title);

    try {
      // เรียก API เพื่อลบหนังสือ
      const response = await axiosInstance.delete(
        `/book/wishlist/${book.id}/${book.shelfType}`,
        {
          data: { userId: currentUserId },
        },
      );

      console.log("Book deleted from shelf:", response.data);

      // อัพเดต local state หลังจาก API สำเร็จ
      setWishlistBooks((prev) => prev.filter((b) => b.id !== book.id));
      setReadingBooks((prev) => prev.filter((b) => b.id !== book.id));
      setReadBooks((prev) => prev.filter((b) => b.id !== book.id));
      setFavoriteBooks((prev) => prev.filter((b) => b.id !== book.id));

      // Refresh ข้อมูลจาก API
      refreshData();
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete book. Please try again.");

      // Fallback: ลบใน local state
      setWishlistBooks((prev) => prev.filter((b) => b.id !== book.id));
      setReadingBooks((prev) => prev.filter((b) => b.id !== book.id));
      setReadBooks((prev) => prev.filter((b) => b.id !== book.id));
      setFavoriteBooks((prev) => prev.filter((b) => b.id !== book.id));
    }

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

  const hdlToggleFavorite = async (book) => {
    if (!book?.id) return;

    const isFavoriteBook = favoriteBooks.some((fav) => fav?.id === book.id);

    if (isFavoriteBook) {
      // ถอนดาว - ย้ายกลับไป READ
      console.log("Removing from favorites:", book.title);
      await moveBookToSection(book, "READ");
    } else {
      // เพิ่มดาว - ย้ายไป FAVORITE (เฉพาะที่มี review แล้ว)
      if (book.hasUserReview || book.userRating) {
        console.log("Adding to favorites:", book.title);
        await moveBookToSection(book, "FAVORITE");
      } else {
        console.log("Cannot add to favorites: No review yet");
        setError("You need to write a review before adding to favorites.");
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
          <div className="flex h-full w-full max-w-[900px] flex-col justify-between">
            <div className="flex h-[36px] w-full items-center justify-between">
              <div className="text-text-secondary">
                <p className="subtitle-1 text-text-primary">Readlist</p>
              </div>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                fontWeight="Button"
                onClick={() => setIsAddBookModalOpen(true)}
                className="hidden sm:flex"
              >
                <i className="fa-solid fa-plus"></i>
                Add Book
              </Button>
            </div>
            <div className="shadow-card-3d mt-6 flex min-h-[400px] flex-1 justify-center rounded-lg p-3 sm:h-[608px] sm:p-6">
              <div className="flex w-full max-w-[852px] flex-col justify-between">
                {/* Reading Section */}
                <div className="border-white-hover text-text-primary flex items-center border-b-2 pb-2">
                  <p className="subtitle-2 text-text-primary">
                    Reading ({readingBooks.length}/3)
                  </p>
                </div>
                <div className="flex min-h-[100px] items-center sm:min-h-[128px]">
                  {readingBooks.length === 0 ? (
                    <div className="flex w-full items-center justify-center">
                      <p className="text-text-disabled text-center text-sm sm:text-base">
                        No books currently reading
                      </p>
                    </div>
                  ) : (
                    <div className="flex w-full gap-2 overflow-x-auto sm:gap-4">
                      {readingBooks.slice(0, 3).map((book) => (
                        <div key={book.id} className="flex-shrink-0">
                          <div
                            className="h-20 w-16 cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg sm:h-28 sm:w-20"
                            onClick={() => hdlBookClick(book)}
                          >
                            {book.book?.edition?.[0]?.coverImage ? (
                              <img
                                src={
                                  book.book?.edition?.[0]?.coverImage ||
                                  book.book?.coverImage
                                }
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
                      {readingBooks.length > 8 && (
                        <div className="text-text-disabled flex h-20 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 sm:h-28 sm:w-20">
                          <span className="text-text-disabled text-xs">
                            +{readingBooks.length - 8}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Wishlist Section */}
                <div className="border-white-hover text-text-primary flex items-center border-b-2 pb-2">
                  <p className="subtitle-2 text-text-primary">Wishlists</p>
                </div>
                <div className="flex min-h-[100px] items-center sm:min-h-[128px]">
                  {userWishlist.length === 0 ? (
                    <div className="flex w-full items-center justify-center">
                      <div className="text-center">
                        <p className="text-text-disabled mb-2 text-sm sm:text-base">
                          No books in wishlist yet
                        </p>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="medium"
                          onClick={() => setIsAddBookModalOpen(true)}
                          className="sm:size-medium"
                        >
                          <i className="fa-solid fa-plus"></i>
                          <span className="hidden sm:inline">
                            Add your first book
                          </span>
                          <span className="sm:hidden">Add book</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full gap-2 overflow-x-auto sm:gap-4">
                      {userWishlist
                        .filter((item) => item.userId === currentUserId)
                        .slice(0, 6)
                        .map((item, index) => (
                          <div
                            key={`${item.book?.id || item.bookId || "book"}-${index}`}
                            className="flex-shrink-0"
                          >
                            <div
                              className="h-20 w-16 cursor-pointer overflow-hidden transition-shadow sm:h-28 sm:w-20"
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
                                  className="shadow-book-lighting h-full w-full object-cover"
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
                          className="flex h-20 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 sm:h-28 sm:w-20"
                        >
                          <span className="text-text-disabled text-xs">
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
          <div className="flex h-full w-full max-w-[900px] flex-col justify-evenly">
            <div className="flex h-auto w-full flex-col gap-2 sm:h-[36px] sm:flex-row sm:items-center sm:justify-between">
              <div className="text-text-secondary">
                <p className="subtitle-1 text-text-primary">Read</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  className="flex items-center"
                >
                  <p>Filter</p>
                  <Funnel className="fill-primary-main" size={13} />
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  onClick={hdlToggleSort}
                >
                  Sort by :{" "}
                  {sortOrder === "latest" ? "Latest Date" : "Oldest Date"}
                  <i className="fa-solid fa-sort"></i>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  fontWeight="Button"
                  onClick={() => setIsAddBookModalOpen(true)}
                >
                  <i className="fa-solid fa-plus"></i>
                  Add Book
                </Button>
              </div>
            </div>
            <div className="shadow-card-3d mt-6 flex flex-1 justify-center rounded-lg p-3 sm:h-[608px] sm:p-6">
              <div
                className="scrollbar-hide grid w-full grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4"
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
                    <p className="text-text-disabled mb-2 text-base sm:text-lg">
                      No books read yet
                    </p>
                    <p className="text-text-secondary text-xs sm:text-sm">
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
          <div className="flex h-full w-full max-w-[900px] flex-col justify-between gap-2">
            <div className="flex h-auto w-full items-start justify-between sm:h-[64px]">
              <div className="text-text-secondary line-height-bodyLarge flex flex-col gap-2">
                <p className="subtitle-1 text-text-primary">Favorites</p>
                <p className="body-1 text-text-secondary text-sm sm:text-base">
                  Only books that have been reviewed can be marked as favorites.
                </p>
              </div>
            </div>
            <div className="shadow-card-3d mt-2 flex flex-1 justify-center rounded-lg p-3 sm:mt-4 sm:h-[608px] sm:p-6">
              {favoriteBooks.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-text-disabled mb-2 text-base sm:text-lg">
                      No favorite books yet
                    </p>
                    <p className="text-text-secondary text-xs sm:text-sm">
                      Star your favorite books from the Read section!
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="scrollbar-hide grid w-full grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-4"
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-4 sm:h-[888px] sm:px-0 sm:py-0">
      <div className="bg-paper-elevation-6 flex h-full w-full justify-center">
        <div className="border-action-active flex w-full max-w-[1280px] items-center justify-center px-4 py-8 sm:h-[824px] sm:px-0 sm:py-0">
          <div className="flex h-full w-full max-w-[1180px] flex-col justify-evenly">
            <div className="flex h-auto w-full flex-col gap-2 sm:h-[36px] sm:flex-row sm:items-center sm:justify-between">
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
            <div className="flex h-full w-full flex-col gap-4 sm:h-[668px] sm:flex-row sm:justify-between">
              <aside className="w-full sm:h-40 sm:w-64">
                <div>
                  <nav>
                    <ul className="hidden space-y-2 sm:block">
                      <li>
                        <button
                          onClick={() => setActiveTab("readlist")}
                          className={`flex h-[48px] w-full items-center rounded-xl px-4 py-2 ${
                            activeTab === "readlist"
                              ? "bg-primary-soft subtitle-3 text-primary-main"
                              : "body-1 text-text-primary hover:bg-primary-soft"
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
                              : "body-1 text-text-primary hover:bg-primary-soft"
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
                              : "body-1 text-text-primary hover:bg-primary-soft"
                          }`}
                        >
                          Favorites
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </aside>
              <div className="flex-1">{renderContent()}</div>
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
