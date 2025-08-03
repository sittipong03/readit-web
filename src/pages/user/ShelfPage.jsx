import { Button } from "@/components/ui/button";
import BookCard from "@/src/components/BookCard";
import BookEditModal from "@/src/components/BookEditModal";
import { useState } from "react";
import { useNavigate } from "react-router";

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
    },
  ];
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("readlist");
  const [readBooks, setReadBooks] = useState(books);
  const navigate = useNavigate();

  const hdlBackToFeed = () => {
    navigate("/home");
  };

  const hdlBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const hdlCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
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
                size="large"
                fontWeight="Button"
              >
                + Add Book
              </Button>
            </div>
            <div className="shadow-card-3d flex h-[608px] justify-center rounded-lg p-6">
              <div className="flex h-[360px] flex-col items-center justify-between">
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                  <p className="subtitle-2">Reading (0/3)</p>
                </div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                  <p className="subtitle-2">Wishlists</p>
                </div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
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
                <Button variant="outlined" color="primary" size="medium">
                  Filter
                </Button>
                <Button variant="outlined" color="primary" size="medium">
                  Sort by: Latest Date
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fontWeight="Button"
                >
                  + Add Book
                </Button>
              </div>
            </div>
            <div className="shadow-card-3d flex h-[608px] justify-center rounded-lg p-6">
              <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {readBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onBookClick={hdlBookClick}
                  />
                ))}
              </div>
              <BookEditModal
                isOpen={isModalOpen}
                onClose={hdlCloseModal}
                book={selectedBook}
              />
              //no books read yet
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
              <div className="flex h-[360px] flex-col items-center justify-between">
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2"></div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
                <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2"></div>
                <div className="flex h-[128px] w-[852px] items-center"></div>
              </div>
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
              {/* <div className="flex h-[160px] w-[240px] flex-col justify-between">
                <div className="bg-primary-soft font-button font-weight-Subtitle line-height-titlesmall tracking-titlesmall text-primary-main flex h-[48px] w-full items-center rounded-xl px-4 py-2">
                  <button className="subtitle-3">Readlist</button>
                </div>
                <div className="font-weight-Subtitle font-titleSmall line-height-titlesmall tracking-titlesmall flex h-[48px] w-full items-center rounded-xl px-4 py-2">
                  <button className="body-1">Read</button>
                </div>
                <div className="font-titleSmall font-weight-Subtitle line-height-titlesmall tracking-titlesmall flex h-[48px] w-full items-center rounded-xl px-4 py-2">
                  <button className="body-1">Favorites</button>
                </div>
              </div> */}
              <aside className="h-40 w-64">
                <div>
                  <nav>
                    <ul className="space-y-2">
                      <li>
                        <button
                          onClick={() => setActiveTab("readlist")}
                          className={`flex h-[48px] w-full items-center rounded-xl px-4 py-2 ${
                            activeTab === "readlist"
                              ? "bg-primary-soft font-button font-weight-Subtitle line-height-titlesmall tracking-titlesmall text-primary-main flex h-[48px] w-full items-center rounded-xl px-4 py-2"
                              : "flex h-[48px] w-full items-center rounded-xl px-4 py-2"
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
                              ? "bg-primary-soft font-button font-weight-Subtitle line-height-titlesmall tracking-titlesmall text-primary-main flex h-[48px] w-full items-center rounded-xl px-4 py-2"
                              : "flex h-[48px] w-full items-center rounded-xl px-4 py-2"
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
                              ? "bg-primary-soft font-button font-weight-Subtitle line-height-titlesmall tracking-titlesmall text-primary-main flex h-[48px] w-full items-center rounded-xl px-4 py-2"
                              : "flex h-[48px] w-full items-center rounded-xl px-4 py-2"
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
    </div>
  );
}

export default Shelf;
