import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const {
    books,
    hasNextPage,
    isFetching,
    sortBy,
    fetchNewBooks,
    fetchMoreBooks,
    setSortBy,
  } = bookManageStore();

  const receiveData = useLocation();
  const [selectBook, setSelectBook] = useState(null);
  const [aiSearch, setAiSearch] = useState("");
  const [aiRecommand, setAiRecommand] = useState(false);
  const [landingSearch, setLandingSearch] = useState("");
  const [searching, setSearching] = useState(false);

  // const recommend = receiveData?.state?.recommendPrompt;
  // console.log('recommend', recommend)
  // let gettagsFromUser = []
  // let userTag = ""
  // for (let i = 0; i < recommend?.length; i++){
  //   gettagsFromUser.push(recommend[i].tag.name)
  //   userTag += (recommend[i].tag.name + " ") 
  // }

  // Got data from search landing
  // const data = receiveData?.state?.prompt;
  // console.log('data', data)


  // const searchByAI = async () => {
  //   setSearching(true)
  //   try {
  //     const data = document.getElementById("SearchAI");
  //     setAiSearch(data.value)
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setSearching(false)
  //   }
  // }

  // const clearFilter = async () => {
  //   const data = document.getElementById("SearchAI");
  //   data.value = ""
  //   await getBooks();
  // }

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Initial Fetch ---
  useEffect(() => {  
    const landingPageQuery = receiveData?.state?.prompt;
    if (landingPageQuery) {
      fetchNewBooks({ type: "ai", query: landingPageQuery });
    } else {
      fetchNewBooks({ type: "normal", sortBy: "popularity" });
    } 
  }, []);

  // --- Infinite Scroll Logic ---
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchMoreBooks();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextPage, fetchMoreBooks],
  );

  // --- Handlers สำหรับ UI ---
  const handleSortChange = (newSortValue) => {
    setSortBy(newSortValue);
  };

  const handleSearchByAI = () => {
    const query = document.getElementById("SearchAI").value;
    if (query) {
      fetchNewBooks({ type: "ai", query });
    }
  };

  const handleClearFilter = () => {
    const searchInput = document.getElementById("SearchAI");
    if (searchInput) searchInput.value = "";
    // กลับไปค้นหาแบบปกติ
    fetchNewBooks({ type: "normal", sortBy: "popularity" });
  };

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedBookForRating, setSelectedBookForRating] = useState(null);
  const handleRatingSubmitted = () => {
    setIsRatingDialogOpen(false);
    setSelectedBookForRating(null);
    fetchNewBooks({ type: "normal", sortBy });
  };

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
            defaultValue="popularity"
            value={sortBy}
            onValueChange={handleSortChange}
          >
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Average Rating</SelectItem>
              <SelectItem value="title_asc">Title (A-Z)</SelectItem>
              <SelectItem value="title_desc">Title (Z-A)</SelectItem>
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
            <Label>AI-Powered Prompt</Label>
            <Textarea
              id="SearchAI"
              placeholder="e.g., A thriller set in snowy mountains with a detective who has a dark past..."
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFilter}
            >
              Clear Filter
            </Button>
            <Button onClick={handleSearchByAI} disabled={isFetching}>
              {isFetching ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Search />
              )}
              {isFetching ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen w-full max-w-lg flex-col gap-6 p-10">
        <div className="flex w-full items-end">
          <div className="flex flex-1 flex-col gap-0">
            <h1 className="subtitle-1">Browse a book</h1>
            <p className="text-text-disabled text-sm">{`${books.length} results shown`}</p>
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

        {/* --- แสดงผลหนังสือจาก `books` โดยตรง --- */}
        <div className="flex flex-row flex-wrap gap-5 rounded-md">
          {books.map((book, index) => {
            // Determine if this is the last element
            const isLastElement = books.length === index + 1;

            return (
              <div
                // The key is always on the root element
                key={book.id}
                // Conditionally apply the ref to the last element
                ref={isLastElement ? lastBookElementRef : null}
                className="bg-secondary-lighter border-divider relative w-[180px] overflow-hidden rounded-md border pb-15 transition-all hover:scale-105"
              >
                {/* All the original card content goes directly inside here */}
                <Link to={`/book/${book.id}`}>
                  <div className="bg-secondary-hover flex h-[162px] items-center justify-center">
                    <div className="bg-secondary-lighter shadow-book-lighting h-[128px] w-[84px]">
                      <img
                        src={
                          book?.edition[0]?.coverImage ||
                          "https://via.placeholder.com/84x128"
                        }
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col p-2">
                  <div className="subtitle-3 text-text-primary max-h-48 truncate">
                    {book.title}
                  </div>
                  <div className="body-3 text-text-disabled flex-1 truncate">
                    {book?.Author?.name}
                  </div>
                  <div className="absolute bottom-2 left-0 w-full px-2">
                    <div className="flex gap-0">
                      <Badge className="text-warning-main body-2 h-5 min-w-5 rounded-sm bg-transparent px-1 tabular-nums transition-all">
                        <Star
                          className="fill-warning-main text-warning-main"
                          size={14}
                        />
                        <p className="text-warning-main font-semibold">
                          {book.averageRating.toFixed(1)}
                        </p>
                        <div className="text-text-disabled">
                          ({formatNumber(book.ratingCount)})
                        </div>
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
                          {book.rating && book.rating?.length > 0 ? (
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
                              rated={book?.rating?.[0]?.rating}
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

        {/* แสดงสถานะ Loading และ End of Results --- */}
        <div className="flex w-full justify-center py-8">
          {isFetching && <LoaderCircle className="animate-spin" />}
          {!isFetching && !hasNextPage && books.length > 0 && (
            <p className="text-text-disabled">End of results.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
