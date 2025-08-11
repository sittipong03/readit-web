import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";
import useBookManageStore from "../stores/booksManageStore";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LoaderCircle } from "lucide-react";
import { InputX } from "@/components/ui/inputX";
import { Button } from "@/components/ui/button";
import { MultiSelectStyled } from "@/components/ui/multi-select";
import { StarRating } from "./StarRating";
import { BookMainCard } from "./BookMainCard";
import { formatIsbnForSearch } from "../utils/formatIsbnForSearch";

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
    updateSingleBookInList,
    normalSearchStatus,
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

  const handleRatingSubmitted = (updatedBook) => {
    setIsRatingDialogOpen(false);
    if (updatedBook) {
      updateSingleBookInList(updatedBook);
    }
  };

  console.log("allTags");
  console.log(allTags);

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedBookForRating, setSelectedBookForRating] = useState(null);

  return (
    <div className="flex flex-col gap-10 px-6 md:flex-row">
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
          <Button onClick={handleSearch} size="large">
            Search
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen flex-1">
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
