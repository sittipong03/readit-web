import React, { useEffect, useState } from "react";
import { Person, ReviewButton, Star } from "../icons/Index";
import { Input } from "@/components/ui/input";
import bookManageStore from "../stores/booksManageStore";
import { Link } from "react-router";
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

function Home() {
  const getBooks = bookManageStore((state) => state.getAllBooks);
  const getBookByAI = bookManageStore(state => state.getBookByAI)
  const books = bookManageStore((state) => state.books);
  const [selectBook, setSelectBook] = useState(null);
  const [aiSearch, setAiSearch] = useState("");

  const searchByAI = async() => {
    try {
      const data = document.getElementById("SearchBook");
      console.log('data.value', data.value)
      setAiSearch(data.value)
    } catch (error) {
      console.log(error)
    }
  }
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const run = async () => {
      
      if(!aiSearch){
        await getBooks();
      }else{
        await getBookByAI(aiSearch)
      }
    }
    run();
<<<<<<< HEAD
  }, []);
=======
  }, [aiSearch]);

  const handleRating = async (e, bookId) => {
    e.preventDefault();
    try {
      if (rating === 0) {
        toast.error("Please select a star rating first.");
        return;
      }

      // TODO: ใส่โค้ดเรียก API สำหรับส่งคะแนนที่นี่
      // ตัวอย่าง: await api.rateBook(bookId, rating);
      console.log(`Submitting rating ${rating} for book ${bookId}`);

      toast.success("Thank you for your rating!", {
        description: "Your feedback helps other readers.",
      });

      // รีเซ็ตค่าคะแนนหลังจากการส่งสำเร็จ
      setRating(0);
      setHoverRating(0);
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast.error("Failed to submit rating.", {
        description: "Please try again later.",
      });
    }
  };
>>>>>>> 158eec5 (Revert "Merge branch 'dev' into feature/registerbooktag")

  console.log("Books", books);
  return (
    <div className="bg-paper-elevation-2 text-text-primary flex justify-center gap-4 pt-8 pb-24">
      <div className="flex w-fit flex-col gap-4 p-4">
        <div className="from-secondary-lighter to-paper-elevation-2 sticky top-20 flex min-h-[480px] w-[296px] transform flex-col gap-4 rounded-md bg-linear-to-b/hsl px-4 py-6">
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
            <Textarea placeholder="Start your AI-assisted search. " />
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="outlined" color="secondary">
              Clear Filter
            </Button>
            <Button onClick={() => searchByAI()}>
              <i class="fa-solid fa-magnifying-glass"></i>
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen max-w-lg flex-col gap-6 p-10 w-full">
        {/* <Person className="w-50 mb-15" /> */}
        <div className="flex items-end w-full">
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
                    <i class="fa-solid fa-plus"></i>
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
                      <i class="fa-solid fa-plus"></i>Add a book
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
              <div className="bg-secondary-lighter border-divider relative w-[180px] overflow-hidden rounded-md border pb-15 transition-all hover:scale-105">
                <Link
                  to={{
                    pathname: `/book/${book.id}`,
                    state: { id: selectBook },
                  }}
                >
                  <div className="bg-secondary-hover flex h-[162px] items-center justify-center">
                    <div className="bg-secondary-lighter shadow-book-lighting h-[128px] w-[84px]">
                      <img
                        src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721918653l/198902277.jpg"
                        alt="Book Cover Title"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col p-2" key={book.id}>
                  {/* <Button
                    variant="text"
                    color="neutral"
                    size="icon"
                    className="text-action-active-icon absolute top-1 left-1 w-7 h-7 opacity-60"
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
                      </Badge>
                      <Dialog>
                        <form onSubmit={(e) => handleRating(e, book.id)}>
                          <DialogTrigger asChild>
                            <Badge className="text-info-main body-2 hover:bg-info-hover h-5 min-w-5 cursor-pointer rounded-sm bg-transparent px-1 tabular-nums transition-all">
                              <i className="fa-regular fa-star"></i>
                              <p className="text-text-disabled">Rate</p>
                            </Badge>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rate this book</DialogTitle>
                            </DialogHeader>
                            <div className="my-4 flex justify-center gap-0">
                              {[1, 2, 3, 4, 5].map((starValue) => (
                                <Button
                                  key={starValue}
                                  type="button"
                                  variant="text"
                                  size="icon"
                                  color="info"
                                  onClick={() => setRating(starValue)}
                                  onMouseEnter={() => setHoverRating(starValue)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  className={
                                    starValue <= (hoverRating || rating)
                                      ? "text-info-main h-12 w-12 [&_svg]:text-[32px]"
                                      : "text-text-disabled h-12 w-12 [&_svg]:text-[32px]"
                                  }
                                >
                                  <i
                                    className={
                                      starValue <= (hoverRating || rating)
                                        ? "fa-solid fa-star"
                                        : "fa-regular fa-star"
                                    }
                                  ></i>
                                </Button>
                              ))}
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="text">Later</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button type="submit" disabled={rating === 0}>
                                  Submit Rating
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </form>
                      </Dialog>
                    </div>
                    <Button
                      variant="ghost"
                      size="small"
                      color="secondary"
                      className="mt-1 w-full rounded-sm"
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
