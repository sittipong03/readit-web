import { useEffect, useState } from "react";
import bookManageStore from "../stores/booksManageStore";
import { useLocation, useParams } from "react-router";
import { Star } from "../icons/Index";
import cartManageStore from "../stores/cartManageStore";
import useUserStore from "../stores/userStore";
import reviewManageStore from "../stores/reviewStore";
import { StarIcon } from "../components/icons";
import productManageStore from "../stores/productManageStore";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SelectStyled,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import nothingPic from "../assets/nothing-pic.png";
import { InputX } from "@/components/ui/inputX";
import { Textarea } from "@/components/ui/textarea";
import StaticRating from "../components/StaticRating";

function Book() {
  const [loading, setLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [createReview, setCreateReview] = useState(false);
  const getBookById = bookManageStore((state) => state.getBookById);
  const user = useUserStore((state) => state.userId);
  const token = useUserStore((state) => state.token);
  const book = bookManageStore((state) => state.book);
  const review = reviewManageStore((state) => state.reviews);
  const getProduct = productManageStore((state) => state.getProductId);
  const product = productManageStore((state) => state.product);
  const getReview = reviewManageStore((state) => state.getAllReview);
  const addReview = reviewManageStore((state) => state.addReview);
  const addToCart = cartManageStore((state) => state.addToCart);
  const { bookId } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [switchDoYouKnow, setSwitchDoYouKnow] = useState(0)
  // console.log(book);
  // console.log(token);
  console.log("User", user);
  // console.log("Token",token);
  // console.log(getProduct);
  console.log("product", product);
  const hdlReview = () => {
    setShowReview(!showReview);
  };

  const hdlPostReview = async () => {
    try {
      const data = document.getElementById("review");
      const sendData = {
        userId: user,
        bookId: book.id,
        title: book.title,
        content: data.value,
        reviewPoint: 3,
      };
      const response = await addReview(book.id, sendData, token);
      setShowReview(!showReview);
      setCreateReview(!createReview);
    } catch (error) {
      console.log(error);
    }
  };

  
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

  const cartData = async (data) => {
    try {
      const sendData = { userId: user, productId: product.id, quantity: 1 };
      const response = await addToCart(sendData, token);
      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const listOfDoYouKnow = book?.aiSuggestion.split("|")
  console.log('listOfDoYouKnow', listOfDoYouKnow)

  const shuffleDoYouKnow = () => {
    setSwitchDoYouKnow(Math.floor(Math.random() * 9))
  }

  useEffect(() => {
    const getbook = async () => {
      setLoading(true);
      const res = await getBookById(bookId);
      const review = await getReview(bookId);
      console.log(product);
      setLoading(false);
    };
    const getProduct = async () => {
      const product = await getProduct(bookId);
    };
    (getbook(), getProduct());
  }, [createReview]);
  // console.log(book);
  // console.log('review', review)
  return (
    <div className="bg-paper-elevation-6 text-text-primary flex min-h-[700px] justify-center">
      <div className="w-full max-w-lg">
        {loading ? (
          <div className="flex justify-center gap-2 p-10">
            <LoaderCircle className="animate-spin" />
            Page loading
          </div>
        ) : (
          <div className="flex gap-10 p-10">
            <div className="flex w-full max-w-[480px] flex-col gap-6">
              <div className="flex gap-6">
                <div className="bg-secondary-lighter shadow-book-lighting h-[264px] w-[174px]">
                  <img
                    src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721918653l/198902277.jpg"
                    alt="Book Cover Title"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="subtitle-1">{book?.title}</div>
                  <div className="body-1 text-text-secondary">
                    {book?.Author.name}
                  </div>
                  <div className="flex gap-2">
                    <StaticRating rating={book?.averageRating} />
                  </div>
                  <div className="flex gap-3">
                    <div className="text-text-disabled body-2">
                      {book?.ratingCount} Ratings
                    </div>
                    <div className="text-text-disabled body-2">
                      {book?.reviewCount} Reviews
                    </div>
                    {/* <p>{book?.averageRating}</p> */}
                  </div>
                  <Button
                    size="large"
                    variant="mixed"
                    color="secondary"
                    type="submit"
                    onClick={() => cartData(book?.id)}
                    className="mt-3"
                  >
                    <i class="fa-regular fa-cart-shopping"></i>
                    Add to cart
                  </Button>
                </div>
              </div>
              <div className="mb-4 border">
                <h2>5 min read</h2>
                <p>{book?.description}</p>
              </div>
              <div className="mb-4 border">
                <h2>More Edition</h2>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione, eaque.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="subtitle-3">Gerne:</div>
                <div className="flex flex-wrap gap-2">
                  {book?.bookTag.map((tag) => (
                    <Badge
                      variant="secondary"
                      className="text-secondary-lighter subtitle-4 rounded-pill h-8 px-3"
                      key={tag.id}
                    >
                      {tag.tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-6">
              <div className="text-tertiary-darker border-tertiary-outlinedBorder bg-tertiary-selected rounded-lg border p-6">
                <div className="flex gap-4">
                  <div className="subtitle-1 text-tertiary-main mb-4">
                    Do you know
                  </div>
                  <Button variant="mixed" color="tertiary" type="submit" onClick={() => shuffleDoYouKnow()}>
                    <i class="fa-regular fa-shuffle"></i>
                    Tell me more
                  </Button>
                </div>
                {book?.aiSuggestion ? (
                  <div className="body-2">{listOfDoYouKnow[switchDoYouKnow]}</div>
                ) : (
                  <p>Template for Ai suggestion.</p>
                )}
              </div>

              <div className="flex">
                <div className="subtitle-1 w-full">Reviews</div>
                <div className="w-[200px]">
                  <SelectStyled
                    variant="outlined"
                    size="small"
                    defaultValue="option1"
                    className="w-full"
                  >
                    <SelectContent>
                      <SelectItem value="option1">Newest</SelectItem>
                      <SelectItem value="option2">Oldest</SelectItem>
                      <SelectItem value="option3">Highest Score</SelectItem>
                      <SelectItem value="option4">Lowest score</SelectItem>
                    </SelectContent>
                  </SelectStyled>
                </div>
              </div>

              <div className="bg-paper-elevation-8 shadow-card-3d rounded-lg p-6">
                <div className="flex flex-col gap-5">
                  <div className="shadow-card-3d bg-paper-elevation-6 flex flex-col gap-4 rounded-lg p-6">
                    {showReview && (
                      <div className="">
                        <Textarea
                          placeholder="Write a review..."
                          className="w-full"
                        />
                      </div>
                    )}
                    <div className="flex gap-10">
                      <div className="">
                        <div>
                          <div className="text-text-disabled body-2">
                            Rate thie book:
                          </div>
                          <div className="flex gap-0">
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
                                    ? "text-info-main h-6 w-6 [&_svg]:text-[20px]"
                                    : "text-text-disabled h-6 w-6 [&_svg]:text-[20px]"
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
                        </div>
                      </div>
                      {showReview ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className="w-full"
                          onClick={() => hdlPostReview()}
                        >
                          <i class="fa-solid fa-edit"></i>
                          Post
                        </Button>
                      ) : (
                        <Button
                          variant="mixed"
                          color="primary"
                          size="large"
                          className="w-full"
                          onClick={() => hdlReview()}
                        >
                          <i class="fa-solid fa-edit"></i>
                          Write a review
                        </Button>
                      )}
                    </div>
                  </div>
                  {book?.review.length == 0 ? (
                    <div className="flex flex-col items-center gap-4 p-4">
                      <div className="h-[120px] w-[132px]">
                        <img
                          src={nothingPic}
                          alt="Nothing here"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="subtitle-1">Nothing here</div>
                        <div className="caption text-text-disabled">
                          Be the first to review this book!
                        </div>
                      </div>
                    </div>
                  ) : (
                    book?.review.map((review) => (
                      <div className="flex flex-row gap-5" key={review.id}>
                        <div>
                          <h2>{review.user.name}</h2>
                          <p>xxxx Reviews</p>
                          <p>xxxx Followers</p>
                        </div>
                        <div>
                          <p>{review.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Book;
