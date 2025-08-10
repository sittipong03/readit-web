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
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";

const suggestionPrompts = [
  {
    prompt: "Fantasy novel with a non-magical protagonist.",
    icon: "fa-solid fa-dragon",
  },
  {
    prompt: "Books about starting a small business.",
    icon: "fa-solid fa-briefcase",
  },
  {
    prompt: "A gripping thriller with a shocking twist ending.",
    icon: "fa-solid fa-bolt",
  },
  {
    prompt: "A sci-fi novel about time travel paradoxes.",
    icon: "fa-solid fa-clock-rotate-left",
  },
];

export function AiSearchTab({ initialPrompt }) {
  const { aiBooks, isFetchingAi, fetchAiBooks, clearAiBooks, aiSearchStatus, updateSingleBookInList  } =
    useBookManageStore();
  const { userName } = useUserStore();
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [aiSortBy, setAiSortBy] = useState("relevance");

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
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

  const handleRatingSubmitted = (updatedBook) => {
    setIsRatingDialogOpen(false); 
    if (updatedBook) {
      updateSingleBookInList(updatedBook);
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

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedBookForRating, setSelectedBookForRating] = useState(null);

  const handlePromptClick = (promptText) => {
    setPrompt(promptText);
    fetchAiBooks(promptText);
  };

  const renderMainContent = () => {
    switch (aiSearchStatus) {
      case "loading":
        return (
          <div className="flex flex-1 items-center justify-center pt-10">
            <LoaderCircle
              className="text-text-secondary animate-spin"
              size={48}
            />
          </div>
        );

      case "success":
        return (
          <div className="mt-[-100px] flex flex-1 flex-col gap-4 pt-6">
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
        );

      case "empty":
        return (
          <div className="text-text-secondary mt-[-88px] flex h-full flex-1 flex-col items-center justify-center pt-10 text-center">
            <div className="display-3 text-text-disabled">No Results Found</div>
            <p className="mt-2">
              Librarian couldn't find a match. Please try a different or more
              detailed prompt.
            </p>
          </div>
        );

      case "idle":
      default:
        return (
          <div className="text-text-secondary mt-[-88px] flex h-full flex-1 flex-col items-center justify-center pt-10">
            <div className="display-3">Hello, {userName}</div>
            <div className="display-3 text-text-disabled">
              What can we help you.
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {suggestionPrompts.map((item, index) => (
                <div
                  key={index}
                  className="hover:bg-action-active/30 bg-action-active/20 subtitle-3 font-regular flex h-50 w-50 cursor-pointer flex-col items-end rounded-md p-4 transition-all"
                  onClick={() => handlePromptClick(item.prompt)}
                >
                  <div className="w-full flex-1">{item.prompt}</div>
                  <div className="bg-action-active/20 rounded-pill flex h-10 w-10 items-center justify-center pb-1">
                    <i className={item.icon}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex h-full flex-col gap-10 px-6 md:flex-row">
      {/* Sidebar for Filters */}
      <aside className="sticky w-full md:top-40 md:h-fit md:w-72">
        <div className="flex h-fit flex-col gap-2">
          <Label htmlFor="ai-prompt">Describe your ideal book</Label>
          <Textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-32"
            placeholder="e.g., A funny sci-fi story about a sentient teapot on a quest to find the meaning of life..."
          />
          <Button
            onClick={clearAiBooks}
            variant="outlined"
            color="secondary"
            size="large"
            disabled={isFetchingAi}
            className="mt-2"
          >
            Clear
          </Button>
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
      {renderMainContent()}

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
