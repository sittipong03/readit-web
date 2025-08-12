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
    clearNormalFilters,
  } = useBookManageStore();

  const [localKeyword, setLocalKeyword] = useState(keyword);

  // --- Initial Fetch ---
  useEffect(() => {
    if (allTags.length === 0) {
      fetchAllTags();
    }
    if (normalBooks.length === 0) {
      fetchNormalBooks();
    }
  }, []);

  console.log("normalBooks :")
  console.log(normalBooks)

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    setSelectedBookForRating(null);
  };

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
              value={selectedTagIds}
              placeholder="Select genres..."
              maxCount={5}
            />
          </div>
          <Button
            onClick={() => {
              setLocalKeyword("");
              clearNormalFilters();
            }}
            variant="outlined"
            color="secondary"
            size="large"
            disabled={isFetchingNormal}
            className="mt-2"
          >
            Clear
          </Button>
          <Button onClick={handleSearch} size="large">
            Search
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen flex-1">
        <div>
          {/* กรณี: กำลังโหลดข้อมูลครั้งแรก */}
          {normalSearchStatus === "loading" && (
            <div className="flex h-full min-h-[50vh] items-center justify-center">
              <LoaderCircle
                className="text-text-secondary animate-spin"
                size={48}
              />
            </div>
          )}
          {/* กรณี: ค้นหาแล้วแต่ไม่เจอ */}
          {normalSearchStatus === "empty" && (
            <div className="text-text-disabled flex h-full min-h-[50vh] flex-col items-center justify-center text-center">
              <h3 className="text-xl font-semibold">No Books Found</h3>
              <p className="mt-2">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
          {/* กรณี: ค้นหาเจอ */}
          {normalSearchStatus === "success" && (
            <>
              <div className="mt-[-64px] flex flex-col gap-6">
                <div className="flex w-full items-end">
                  <div className="flex flex-1 flex-col gap-0">
                    <h1 className="subtitle-1">Browse a book</h1>
                    <p className="text-text-disabled text-sm">{`${normalBooks.length} results shown`}</p>
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
                              Add it instantly with its ISBN. We'll use this
                              unique code to find all the details for you.
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
                <div className="book-flex-container flex flex-row flex-wrap gap-5">
                  {normalBooks.map((book, index) => (
                    <BookMainCard
                      key={book.id}
                      book={book}
                      onRateClick={handleRateClick}
                      innerRef={
                        normalBooks.length === index + 1
                          ? lastBookElementRef
                          : null
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Infinite scroll loader / End of results message */}
              <div className="flex w-full justify-center py-8 mb-10">
                {isFetchingNormal && (
                  <LoaderCircle className="mt-20 animate-spin" />
                )}
                {!isFetchingNormal &&
                  !hasNextPage &&
                  normalBooks.length > 0 && (
                    <p className="text-text-disabled pt-20">End of results.</p>
                  )}
              </div>
            </>
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
              rated={selectedBookForRating?.rating || 0}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
