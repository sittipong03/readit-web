import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import bookManageStore from "../stores/booksManageStore";
import { Link, useLocation } from "react-router";
import { InputX } from "@/components/ui/inputX";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  SelectStyled,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
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
import { StarRating } from "../components/StarRating";
import { LoaderCircle, Search } from "lucide-react";
import useUserStore from "../stores/userStore";
import { formatNumber } from "../utils/NumberConverter";

function Home() {
  const getBooks = bookManageStore((state) => state.getAllBooks);
  const getBookByAI = bookManageStore((state) => state.getBookByAI);
  const getBookByTag = bookManageStore((state) => state.getBookByTag);
  const books = bookManageStore((state) => state.books);
  const receiveData = useLocation();
  const [selectBook, setSelectBook] = useState(null);
  const [aiSearch, setAiSearch] = useState("");
  const [landingSearch, setLandingSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedBookForRating, setSelectedBookForRating] = useState(null);

  const { userId, token } = useUserStore();

  const recommend = receiveData?.state?.recommendPrompt;
  console.log("recommend", recommend);

  // Got data from search landing
  const data = receiveData?.state?.prompt;
  console.log("data", data);
  console.log("userId", userId);

  const searchByAI = async () => {
    setSearching(true);
    try {
      const data = document.getElementById("SearchAI");
      setAiSearch(data.value);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  const clearFilter = async () => {
    const data = document.getElementById("SearchAI");
    data.value = "";
    await getBooks();
  };

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const run = async () => {
      if (!(aiSearch || data || recommend)) {
        console.log("1");
        await getBooks();
      } else if (aiSearch || data) {
        await getBookByAI(aiSearch || data);
      } else {
        await getBookByTag(recommend);
      }
      // await (!aiSearch ? getBooks() : getBookByAI(aiSearch));
    };
    run();
  }, [aiSearch, getBooks, getBookByAI]);

  const handleRatingSubmitted = () => {
    console.log("Rating submitted! Closing dialog and refreshing books.");
    setIsRatingDialogOpen(false); // ปิด Dialog
    setSelectedBookForRating(null); // ล้างค่าหนังสือที่เลือก
    getBooks(); // ดึงข้อมูลหนังสือใหม่เพื่ออัปเดต averageRating
  };

  console.log("books:", books);

  return (
    <div className="bg-paper-elevation-6 text-text-primary flex justify-center gap-4 pt-8 pb-24">
      <div className="flex w-fit flex-col gap-4 p-4">
        <div className="from-secondary-lighter to-paper-elevation-6 sticky top-20 flex min-h-[480px] w-[296px] transform flex-col gap-4 rounded-md bg-linear-to-b/hsl px-4 py-6">
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Search"
              size="small"
              id="SearchBook"
              placeholder="Title, author, or ISBN..."
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <SelectStyled
            label="Sort by:"
            variant="outlined"
            size="small"
            defaultValue="option1"
          >
            <SelectContent>
              <SelectItem value="option1">Popularity</SelectItem>
              <SelectItem value="option2">Reviewed</SelectItem>
            </SelectContent>
          </SelectStyled>
          <SelectStyled
            label="Genre:"
            variant="outlined"
            size="small"
            defaultValue="option1"
          >
            <SelectContent>
              <SelectItem value="option1">All</SelectItem>
              <SelectItem value="option2">Drama</SelectItem>
              <SelectItem value="option3">Horror</SelectItem>
            </SelectContent>
          </SelectStyled>
          <div className="flex flex-col gap-2">
            <Label>Prompt</Label>
            <Textarea
              id="SearchAI"
              placeholder="Start your AI-assisted search. "
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => clearFilter()}
            >
              Clear Filter
            </Button>
            <Button onClick={() => searchByAI()}>
              {searching ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Search />
              )}
              {searching ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen w-full max-w-lg flex-col gap-6 p-10">
        {/* <Person className="w-50 mb-15" /> */}
        <div className="flex w-full items-end">
          <div className="flex flex-1 flex-col gap-0">
            <h1 className="subtitle-1">Browse a book</h1>
            <p className="text-text-disabled caption">{`${books?.length} Result was found`}</p>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="subtitle-4">Can’t find the book?</h1>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button size="small" color="secondary">
                    <i className="fa-solid fa-plus"></i>
                    Add a book
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add a book</DialogTitle>
                    <DialogDescription>
                      Add it instantly with its ISBN. We'll use this unique code
                      to find all the details for you.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <InputX
                      label="ISBN"
                      id="ISBN"
                      name="ISBN"
                      placeholder="e.g., 978-0140280190"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="text">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">
                      <i className="fa-solid fa-plus"></i>Add a book
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-5 rounded-md">
          {books.map((book) => {
            const hdlSelectBook = () => {
              setSelectBook(book.id);
            };
            return (
              <div
                key={book.id}
                className="bg-secondary-lighter border-divider relative w-[180px] overflow-hidden rounded-md border pb-15 transition-all hover:scale-105"
              >
                <Link
                  to={{
                    pathname: `/book/${book.id}`,
                    state: { id: selectBook },
                  }}
                >
                  <div className="bg-secondary-hover flex h-[162px] items-center justify-center">
                    <div className="bg-secondary-lighter shadow-book-lighting h-[128px] w-[84px]">
                      <img
                        src={` ${book?.edition[0]?.coverImage} || "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721918653l/198902277.jpg`}
                        alt="Book Cover Title"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col p-2">
                  {/* <Button
                    variant="text"
                    color="neutral"
                    size="icon"
                    className="absolute text-action-active-icon top-1 left-1 w-7 h-7 opacity-60"
                  >
                    <i className="fa-regular fa-bookmark"></i>
                  </Button> */}
                  <div className="subtitle-3 text-text-primary">
                    {book.title}
                  </div>
                  <div className="body-3 text-text-secondary flex-1">{`${book?.Author?.name}`}</div>
                  <div className="absolute bottom-2 left-0 w-full px-2">
                    <div className="flex gap-0">
                      <Badge className="text-warning-main body-2 h-5 min-w-5 rounded-sm bg-transparent px-1 tabular-nums transition-all">
                        <i className="fa-solid fa-star"></i>
                        <p className="text-warning-main">
                          {book.averageRating}
                        </p>
                        <div>({formatNumber(book.ratingCount)})</div>
                      </Badge>
                      <Dialog
                        open={
                          isRatingDialogOpen &&
                          selectedBookForRating?.id === book.id
                        }
                        onOpenChange={(open) => {
                          if (!open) {
                            setIsRatingDialogOpen(false);
                            setSelectedBookForRating(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          {book.rating && book.rating.length > 0 ? (
                            // ---- กรณีที่เคยให้คะแนนแล้ว ----
                            <Badge
                              onClick={() => {
                                setSelectedBookForRating(book);
                                setIsRatingDialogOpen(true);
                              }}
                              className="text-info-main body-2 hover:bg-warning-hover h-5 min-w-5 cursor-pointer rounded-sm bg-transparent px-1 tabular-nums transition-all"
                            >
                              <Star
                                className="fill-info-main text-info-main"
                                size={16}
                                strokeWidth={2}
                              />
                              <p className="text-warning-main">
                                {book.rating[0].rating}
                              </p>
                            </Badge>
                          ) : (
                            // ---- กรณีที่ยังไม่เคยให้คะแนน ----
                            <Badge
                              onClick={() => {
                                setSelectedBookForRating(book);
                                setIsRatingDialogOpen(true);
                              }}
                              className="text-info-main body-2 hover:bg-info-hover h-5 min-w-5 cursor-pointer rounded-sm bg-transparent px-1 tabular-nums transition-all"
                            >
                              <Star size={16} strokeWidth={2} />
                              <p className="text-text-disabled">Rate</p>
                            </Badge>
                          )}
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>
                              Rate: {selectedBookForRating?.title}
                            </DialogTitle>
                            <DialogDescription>
                              Your feedback helps other readers.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="my-4 flex justify-center gap-0">
                            <StarRating
                              bookId={selectedBookForRating?.id}
                              onRatingSubmitted={handleRatingSubmitted}
                              rated={book?.rating[0]?.rating}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Button
                      variant="ghost"
                      size="small"
                      color="secondary"
                      className="mt-1 w-full rounded-sm"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <Link
                        to={{
                          pathname: `/book/${book.id}`,
                          state: { id: selectBook },
                        }}
                      >
                        Write a review
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
