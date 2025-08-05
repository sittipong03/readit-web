import React, { useEffect, useState } from "react";
import { Person, ReviewButton, Star } from "../icons/Index";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import bookManageStore from "../stores/booksManageStore";
import { Link } from "react-router";
import { InputX } from "@/components/ui/inputX";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function Home() {
  const getBooks = bookManageStore((state) => state.getAllBooks);
  const books = bookManageStore((state) => state.books);
  const [selectBook, setSelectBook] = useState(null);

  useEffect(() => {
    const run = async () => {
      await getBooks();
    };
    run();
  }, []);

  console.log("Books", books);
  return (
    <div className="bg-paper-elevation-2 flex justify-center gap-4 pb-24">
      <div className="flex w-fit flex-col gap-4 p-4">
        <div className="from-primary-lighter to-paper-elevation-2 sticky top-20 flex min-h-[480px] w-[296px] transform flex-col gap-4 rounded-md bg-linear-to-b/hsl px-4 py-6">
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Search"
              size="small"
              id="SearchBook"
              placeholder="Title, author, or ISBN..."
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Sort by:"
              size="small"
              id="SearchBook"
              placeholder="Popularity"
              trailingComponent={<i class="fa-solid fa-caret-down"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Genre:"
              size="small"
              id="SearchBook"
              placeholder="All"
              trailingComponent={<i class="fa-solid fa-caret-down"></i>}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Promt</Label>
            <Textarea placeholder="Use our AI tool to help..." />
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="outlined" color="secondary">
              Clear Filter
            </Button>
            <Button>
              <i class="fa-solid fa-magnifying-glass"></i>
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen max-w-lg flex-col gap-6 p-10">
        {/* <Person className="w-50 mb-15" /> */}
        <div className="flex items-end">
          <div className="flex flex-1 flex-col gap-0">
            <h1 className="subtitle-1">Browse a book</h1>
            <p className="text-text-disabled caption">{`${books.length} Result was found`}</p>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="subtitle-4">Can’t find the book?</h1>
            <Button size="small" color="secondary">
              <i class="fa-solid fa-plus"></i>
              Add a book
            </Button>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-5 rounded-md">
          {books.map((book) => {
            const hdlSelectBook = () => {
              setSelectBook(book.id);
            };
            return (
              <div className="bg-secondary-lighter">
                <div className="w-full h-[162px] bg-secondary-hover"> 
                </div>
                <div
                  className="flex w-[180px] flex-col p-2"
                  key={book.id}
                >
                  <div className="subtitle-3 text-text-primary">{book.title}</div>
                  <div className="body-2 text-text-secondary flex-1">{`Author : ${book.Author.name}`}</div>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <Star className="w-5" />
                      <p>{book.averageRating}</p>
                    </div>
                    <div className="flex gap-2">
                      <Star className="w-5" />
                      <p>Rate</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="small"
                    color="secondary"
                    className="rounded-sm"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
