// src/components/AiSearchTab.jsx
import React, { useState, useMemo, useEffect } from "react"; // 1. เพิ่ม useEffect
import useBookManageStore from "../stores/booksManageStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
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
import { StarRating } from "./StarRating";
import { BookMainCard } from "./BookMainCard";
import { SparklesIcon } from "./icons/sparkles-icon";

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

  const handleRateClick = (bookToRate) => {
    setSelectedBookForRating(bookToRate);
    setIsRatingDialogOpen(true);
  };

  const handleRatingSubmitted = () => {
    setIsRatingDialogOpen(false);
    // อาจจะมีการ fetch ข้อมูลใหม่ที่นี่
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

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedBookForRating, setSelectedBookForRating] = useState(null);

  return (
    <div className="flex flex-col gap-10 px-6 pt-10 md:flex-row">
      {/* Sidebar for Filters */}
      <aside className="sticky w-full md:top-38 md:h-fit md:w-72">
        <div className="sticky flex flex-col gap-2 h-fit">
          <Label htmlFor="ai-prompt">Describe your ideal book</Label>
          <Textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-32"
            placeholder="e.g., A funny sci-fi story about a sentient teapot on a quest to find the meaning of life..."
          />
          <Button
            onClick={handleSearch}
            color="tertiary"
            size="large"
            disabled={isFetchingAi}
            className="mt-2"
          >
            {isFetchingAi ? (
              <LoaderCircle className="mr-2 animate-spin" />
            ) : (
              <SparklesIcon className="mr-2 h-4 w-4" />
            )}
            Ask Librarian
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      {isFetchingAi ? (
        <div className="flex items-center justify-center pt-10">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : aiBooks.length > 0 ? (
        <div className="mt-[-100px] flex min-h-screen flex-1 flex-col gap-4 pt-6">
          <div className="w-full max-w-xs">
            {/* 2. ปรับปรุง UI ของ Select ให้สอดคล้องกับ Label */}
            <SelectStyled
              label="Sort results by:"
              variant="outlined"
              className="w-45"
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
          <div className="book-flex-container flex flex-row flex-wrap gap-5">
            {sortedAiBooks.map((book) => (
              <BookMainCard
                key={book.id}
                book={book}
                onRateClick={handleRateClick}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-text-disabled min h-full min-h-screen flex-1 pt-10 text-center">
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
