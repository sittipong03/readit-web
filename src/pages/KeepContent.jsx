import React, { useEffect, useState, useRef, useCallback } from "react";
import { Star } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarRating } from "../components/StarRating";
import { LoaderCircle, Search } from "lucide-react";
import { formatNumber } from "../utils/NumberConverter";
import useUserStore from "../stores/userStore";
import { NormalSearchTab } from "../components/NormalSearchTab";
import { AiSearchTab } from "../components/AiSearchTab";

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

  // const [selectBook, setSelectBook] = useState(null);
  // const [aiSearch, setAiSearch] = useState("");
  // const [aiRecommand, setAiRecommand] = useState(false);
  // const [landingSearch, setLandingSearch] = useState("");
  // const [searching, setSearching] = useState(false);

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

  // const [rating, setRating] = useState(0);
  // const [hoverRating, setHoverRating] = useState(0);

  // Initial Fetch ---
  useEffect(() => {
    const landingPageQuery = receiveData?.state?.prompt;
    console.log("landingPageQuery");
    console.log(landingPageQuery);
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
                //  All the original card content goes directly inside here
                key={book.id}
                ref={isLastElement ? lastBookElementRef : null}
                className="bg-secondary-lighter border-divider relative w-[180px] overflow-hidden rounded-md border pb-15 transition-all hover:scale-105"
              >
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

<SelectStyled
  label="Sort results by:"
  variant="outlined"
  size="small"
  defaultValue="relevance"
  value={aiSortBy}
  onValueChange={setAiSortBy}
>
  <SelectContent>
    <SelectItem value="relevance">Relevance</SelectItem>
    <SelectItem value="rating">Average Rating</SelectItem>
    <SelectItem value="title_asc">Title (A-Z)</SelectItem>
    <SelectItem value="title_desc">Title (Z-A)</SelectItem>
  </SelectContent>
</SelectStyled>;

<>
  <Label>Genre</Label>
  <div className="flex flex-wrap gap-2 pt-2">
    {allTags.map((tag) => (
      <Badge
        key={tag.id}
        variant={selectedTagIds.includes(tag.id) ? "default" : "outline"}
        onClick={() => setSelectedTags(tag.id)}
        className="cursor-pointer"
      >
        {tag.name}
      </Badge>
    ))}
  </div>
</>;

export function NormalSearchTab() {
  const {
    normalBooks,
    hasNextPage,
    isFetchingNormal,
    sortBy,
    selectedTagIds,
    allTags,
    fetchNormalBooks,
    fetchMoreNormalBooks,
    setSortBy,
    setSelectedTags,
    fetchAllTags,
    keyword,
    setKeyword,
    replaceSelectedTags,
  } = useBookManageStore();

  const [localKeyword, setLocalKeyword] = useState(keyword);

  // --- Initial Fetch ---
  useEffect(() => {
    fetchAllTags();
    fetchNormalBooks();
  }, []);

  const tagOptions = useMemo(
    () => allTags.map((tag) => ({ value: tag.id, label: tag.name })),
    [allTags],
  );

  // --- Infinite Scroll Logic ---
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isFetchingNormal) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchMoreNormalBooks();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNormal, hasNextPage, fetchMoreNormalBooks],
  );

  const handleSearch = () => {
    const formattedKeyword = formatIsbnForSearch(localKeyword);
    setKeyword(formattedKeyword);
    fetchNormalBooks();
  };

  const handleRateClick = (bookToRate) => {
    setSelectedBookForRating(bookToRate);
    setIsRatingDialogOpen(true);
  };

  const handleRatingSubmitted = () => {
    setIsRatingDialogOpen(false);
    // อาจจะมีการ fetch ข้อมูลใหม่ที่นี่
  };

  console.log("allTags");
  console.log(allTags);

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedBookForRating, setSelectedBookForRating] = useState(null);

  return (
    <div className="flex flex-col gap-10 px-6 pt-10 md:flex-row">
      {/* Sidebar for Filters */}
      <aside className="sticky w-full md:top-38 md:h-fit md:w-72">
        <div className="flex flex-col gap-2">
          <Label htmlFor="ai-prompt">Describe your ideal book</Label>
          <Textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A funny sci-fi story about a sentient teapot on a quest to find the meaning of life..."
          />
          <Button
            onClick={handleSearch}
            disabled={isFetchingAi}
            className="mt-2 w-fit"
          >
            {isFetchingAi ? (
              <LoaderCircle className="mr-2 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Get Recommendations
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      {/* Results Section */}
      {/* 3. เพิ่มการจัดการ UX ตอน Loading และตอนไม่มีข้อมูล */}
      {isFetchingAi ? (
        <div className="flex items-center justify-center pt-10">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : aiBooks.length > 0 ? (
        <div className="border-divider flex flex-col gap-4 border-t pt-6">
          <div className="w-full max-w-xs">
            {/* 2. ปรับปรุง UI ของ Select ให้สอดคล้องกับ Label */}
            <SelectStyled
              label="Sort results by:"
              variant="outlined"
              size="small"
              defaultValue="relevance"
              value={aiSortBy}
              onValueChange={setAiSortBy}
            >
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="title_asc">Title (A-Z)</SelectItem>
                <SelectItem value="title_desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </SelectStyled>
          </div>
          <div className="flex flex-row flex-wrap gap-5">
            {sortedAiBooks.map((book) => (
              // <BookCard key={book.id} book={book} />
              <div
                key={book.id}
                className="h-60 w-40 bg-slate-700 p-2 text-white"
              >
                {book.title}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-text-disabled border-divider border-t pt-10 text-center">
          <p>Enter a description above to get AI recommendations.</p>
        </div>
      )}

      {/* Rating Dialog จะถูกควบคุมโดย State ของหน้านี้ */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate: {selectedBookForRating?.title}</DialogTitle>
            <DialogDescription>
              Your feedback helps other readers.
            </DialogDescription>
          </DialogHeader>
          <div className="my-0">
            <StarRating
              bookId={selectedBookForRating?.id}
              onRatingSubmitted={handleRatingSubmitted}
              rated={selectedBookForRating?.rating?.[0]?.rating}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function NormalSearchTab() {
  const {
    normalBooks,
    hasNextPage,
    isFetchingNormal,
    sortBy,
    selectedTagIds,
    allTags,
    fetchNormalBooks,
    fetchMoreNormalBooks,
    setSortBy,
    setSelectedTags,
    fetchAllTags,
    keyword,
    setKeyword,
    replaceSelectedTags,
  } = useBookManageStore();

  const [localKeyword, setLocalKeyword] = useState(keyword);

  // --- Initial Fetch ---
  useEffect(() => {
    fetchAllTags();
    fetchNormalBooks();
  }, []);

  const tagOptions = useMemo(
    () => allTags.map((tag) => ({ value: tag.id, label: tag.name })),
    [allTags],
  );

  // --- Infinite Scroll Logic ---
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isFetchingNormal) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchMoreNormalBooks();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNormal, hasNextPage, fetchMoreNormalBooks],
  );

  const handleSearch = () => {
    const formattedKeyword = formatIsbnForSearch(localKeyword);
    setKeyword(formattedKeyword);
    fetchNormalBooks();
  };

  const handleRateClick = (bookToRate) => {
    setSelectedBookForRating(bookToRate);
    setIsRatingDialogOpen(true);
  };

  const handleRatingSubmitted = () => {
    setIsRatingDialogOpen(false);
    // อาจจะมีการ fetch ข้อมูลใหม่ที่นี่
  };

  console.log("allTags");
  console.log(allTags);

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedBookForRating, setSelectedBookForRating] = useState(null);

  return (
    <div className="flex flex-col gap-10 px-6 pt-10 md:flex-row">
      {/* Sidebar for Filters */}
      <aside className="sticky w-full md:top-38 md:h-fit md:w-72">
        <div className="sticky flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Search"
              id="SearchBook"
              placeholder="Title, Author, or ISBN..."
              className="rounded-md"
              value={localKeyword}
              onChange={(e) => setLocalKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <SelectStyled
            label="Sort by:"
            variant="outlined"
            triggerClassName="rounded-md"
            defaultValue="popularity"
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Average Rating</SelectItem>
              <SelectItem value="title_asc">Title (A-Z)</SelectItem>
              <SelectItem value="title_desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </SelectStyled>

          <div>
            <MultiSelectStyled
              label="Genres"
              options={tagOptions}
              onValueChange={replaceSelectedTags}
              placeholder="Select genres..."
              maxCount={5}
            />
          </div>
          <Button onClick={handleSearch} size="medium">
            Search
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="book-flex-container mt-[-64px] flex flex-row flex-wrap gap-5">
          {normalBooks.map((book, index) => (
            <BookMainCard
              key={book.id}
              book={book}
              onRateClick={handleRateClick}
              innerRef={
                normalBooks.length === index + 1 ? lastBookElementRef : null
              }
            />
          ))}
        </div>

        {/* ... Loading & End of results ... */}
        <div className="flex w-full justify-center pt-40">
          {isFetchingNormal && <LoaderCircle className="animate-spin" />}
          {!isFetchingNormal && !hasNextPage && normalBooks.length > 0 && (
            <p className="text-text-disabled">End of results.</p>
          )}
        </div>
      </main>

      {/* Rating Dialog จะถูกควบคุมโดย State ของหน้านี้ */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate: {selectedBookForRating?.title}</DialogTitle>
            <DialogDescription>
              Your feedback helps other readers.
            </DialogDescription>
          </DialogHeader>
          <div className="my-0">
            <StarRating
              bookId={selectedBookForRating?.id}
              onRatingSubmitted={handleRatingSubmitted}
              rated={selectedBookForRating?.rating?.[0]?.rating}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function AiSearchTab({ initialPrompt }) {
  const { aiBooks, fetchAiBooks, isFetchingAi } = useBookManageStore();
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [aiSortBy, setAiSortBy] = useState("relevance");

  useEffect(() => {
    if (initialPrompt) {
      fetchAiBooks(initialPrompt);
    }
  }, [initialPrompt, fetchAiBooks]);

  const handleSearch = () => {
    if (prompt.trim()) {
      fetchAiBooks(prompt);
    }
  };

  const sortedAiBooks = useMemo(() => {
    const newBooks = [...aiBooks];
    switch (aiSortBy) {
      case "rating":
        return newBooks.sort((a, b) => b.averageRating - a.averageRating);
      case "popularity":
        return newBooks.sort((a, b) => b.ratingCount - a.ratingCount);
      case "title_asc":
        return newBooks.sort((a, b) => a.title.localeCompare(b.title));
      case "title_desc":
        return newBooks.sort((a, b) => b.title.localeCompare(a.title));
      case "relevance":
      default:
        return newBooks;
    }
  }, [aiBooks, aiSortBy]);

  return (
    <div className="flex flex-col gap-6 pt-6">
      {/* Search Input Section */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="ai-prompt">Describe your ideal book</Label>
        <Textarea
          id="ai-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A funny sci-fi story about a sentient teapot on a quest to find the meaning of life..."
        />
        <Button
          onClick={handleSearch}
          disabled={isFetchingAi}
          className="mt-2 w-fit"
        >
          {isFetchingAi ? (
            <LoaderCircle className="mr-2 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Get Recommendations
        </Button>
      </div>

      {/* Results Section */}
      {/* 3. เพิ่มการจัดการ UX ตอน Loading และตอนไม่มีข้อมูล */}
      {isFetchingAi ? (
        <div className="flex items-center justify-center pt-10">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : aiBooks.length > 0 ? (
        <div className="border-divider flex flex-col gap-4 border-t pt-6">
          <div className="w-full max-w-xs">
            {/* 2. ปรับปรุง UI ของ Select ให้สอดคล้องกับ Label */}
            <SelectStyled
              label="Sort results by:"
              variant="outlined"
              size="small"
              defaultValue="relevance"
              value={aiSortBy}
              onValueChange={setAiSortBy}
            >
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="title_asc">Title (A-Z)</SelectItem>
                <SelectItem value="title_desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </SelectStyled>
          </div>
          <div className="flex flex-row flex-wrap gap-5">
            {sortedAiBooks.map((book) => (
              // <BookCard key={book.id} book={book} />
              <div
                key={book.id}
                className="h-60 w-40 bg-slate-700 p-2 text-white"
              >
                {book.title}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-text-disabled border-divider border-t pt-10 text-center">
          <p>Enter a description above to get AI recommendations.</p>
        </div>
      )}
    </div>
  );
}
