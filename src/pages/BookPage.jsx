import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

// Import stores and components
import bookManageStore from "../stores/booksManageStore";
import cartManageStore from "../stores/cartManageStore";
import useUserStore from "../stores/userStore";
import reviewManageStore from "../stores/reviewStore";
import StaticRating from "../components/StaticRating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SelectStyled,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import nothingPic from "../assets/nothing-pic.png";
import productManageStore from "../stores/productManageStore";

function Book() {
  // --- States ---
  const [loading, setLoading] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const [showReview, setShowReview] = useState(false);
<<<<<<< HEAD
  const [reviewContent, setReviewContent] = useState(""); // State สำหรับ Textarea
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const { bookId } = useParams();

  // --- Zustand Stores ---
  const { book, getBookById, getAiSuggestion } = bookManageStore();
  const { getAllReview, addReview } = reviewManageStore();
  const { userId, token } = useUserStore();
  const { product } = productManageStore(); // สมมติว่ายังต้องใช้ product
  const { addToCart } = cartManageStore();

  const latestEdition = book?.edition?.find((e) => e.isLatest === true);
  const latestIsbn = latestEdition?.isbn;
  const latestPages = latestEdition?.pages;
  const productAvaliable = book?.product?.length > 0;

  // --- Data Fetching Effect ---
  useEffect(() => {
    const loadData = async () => {
      if (!bookId) return;

      setLoading(true);
      setLoadingAI(true);

      try {
        // ดึงข้อมูลที่รวดเร็วก่อน
        await Promise.all([getBookById(bookId), getAllReview(bookId)]);
      } catch (error) {
        console.error("Failed to load main book data:", error);
        toast.error("Could not load book details.");
      } finally {
        setLoading(false);
      }

      // --- จังหวะที่ 2: เริ่มโหลดข้อมูล AI ที่ช้า ---
      try {
        await getAiSuggestion(bookId);
      } catch (error) {
        console.error("Failed to load AI suggestion:", error);
      } finally {
        setLoadingAI(false);
      }
    };

    loadData();
  }, [bookId, getBookById, getAiSuggestion]);

  useEffect(() => {
    if (book) {
      console.log("Book data has been updated:", book);
    }
  }, [book]);

  // --- Event Handlers ---
  const hdlPostReview = async () => {
    if (rating === 0) {
      return toast.error("กรุณาให้คะแนนดาวก่อนโพสต์");
    }
    if (!reviewContent.trim()) {
      return toast.error("กรุณาเขียนรีวิวก่อนโพสต์");
    }

    try {
      const sendData = {
        userId: userId,
        bookId: book.id,
        title: "Review for " + book.title,
        content: reviewContent,
        reviewPoint: rating,
      };
      await addReview(book.id, sendData, token);
      toast.success("โพสต์รีวิวสำเร็จ!");

      // Reset form
      setShowReview(false);
      setReviewContent("");
      setRating(0);

      // Reload reviews
      getAllReview(bookId);
    } catch (error) {
      console.error(error);
      toast.error("ไม่สามารถโพสต์รีวิวได้");
    }
  };

  const hdlAddToCart = async () => {
    if (!product?.id) {
      return toast.error("ไม่พบข้อมูลสินค้า ไม่สามารถเพิ่มลงตะกร้าได้");
    }
    try {
      const sendData = { userId: userId, productId: product.id, quantity: 1 };
      const response = await addToCart(sendData, token);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มสินค้าลงตะกร้า");
    }
  };

  // --- Render ---
  if (loading) {
    return (
      <div className="text-text-primary flex min-h-[700px] items-center justify-center gap-2 p-10">
        <LoaderCircle className="animate-spin" />
        Page loading...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-[700px] items-center justify-center p-10">
        ไม่พบข้อมูลหนังสือ
      </div>
    );
  }

  return (
    <div className="bg-paper-elevation-6 text-text-primary flex min-h-[700px] justify-center">
      <div className="w-full max-w-lg pb-20">
        <div className="relative flex items-start gap-10 p-10">
          {/* Left Column */}
          <div className="flex w-full max-w-[480px] flex-col gap-6 sticky top-20">
            <div className="flex gap-6">
              <div className="bg-secondary-lighter shadow-book-lighting h-[264px] w-[174px] flex-shrink-0">
                <img
                  src={
                    book?.edition[0]?.coverImage  ||
                    "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721918653l/198902277.jpg"
                  }
                  alt={book.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="subtitle-1">{book.title}</div>
                <div className="body-1 text-text-secondary">
                  {book.Author?.name}
                </div>
                <div className="flex gap-2">
                  <StaticRating rating={book.averageRating} />
                </div>
                <div className="flex gap-3">
                  <div className="text-text-disabled body-2">
                    {book.ratingCount || 0} Ratings
                  </div>
                  <div className="text-text-disabled body-2">
                    {book.reviewCount || 0} Reviews
                  </div>
                </div>
                {productAvaliable ? (
                  <Button
                    size="large"
                    variant="mixed"
                    color="secondary"
                    type="button"
                    onClick={hdlAddToCart}
                    className="mt-3"
                  >
                    <i className="fa-regular fa-cart-shopping"></i>
                    Add to cart
                  </Button>
                ) : (
                  <div className="opacity-50">
                    <Button
                      size="large"
                      variant="mixed"
                      color="secondary"
                      type="button"
                      onClick={hdlAddToCart}
                      className="mt-3"
                      disabled={true}
                    >
                      <i className="fa-regular fa-cart-shopping"></i>
                      Not available
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 p-6 rounded-lg text-text-secondary shadow-card-3d bg-paper-elevation-8">
              <div className="mb-1 subtitle-2">Description :</div>
              <div className="body-2">{book.description || "No description available."}</div>
              {latestIsbn ? (
                <div className="flex gap-4 body-2">
                  <div className="w-[148px] flex-shrink-0 font-bold">ISBN</div>
                  <div className="w-full">{latestIsbn}</div>
                </div>
              ) : (
                <div className="flex gap-4 body-2">
                  <div className="w-[148px] flex-shrink-0 font-bold">ISBN</div>
                  <div className="w-full text-text-disabled">Not available</div>
                </div>
              )}
              {latestPages ? (
                <div className="flex gap-4 body-2">
                  <div className="w-[148px] flex-shrink-0 font-bold">Pages</div>
                  <div className="w-full">{latestPages}</div>
                </div>
              ) : (
                <div className="flex gap-4 body-2">
                  <div className="w-[148px] flex-shrink-0 font-bold">Pages</div>
                  <div className="w-full text-text-disabled">Not available</div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <div className="subtitle-3">Genre:</div>
              <div className="flex flex-wrap gap-2">
                {book.bookTag?.map((tag) => (
                  <Badge
                    variant="secondary"
                    className="h-8 px-3 text-secondary-lighter subtitle-4 rounded-pill"
                    key={tag.id}
                  >
                    {tag.tag?.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col w-full gap-6">
            <div className="p-6 border rounded-lg text-tertiary-darker border-tertiary-outlinedBorder bg-tertiary-selected">
              <div className="flex gap-4 mb-4">
                <div className="subtitle-1 text-tertiary-main">
                  Do you know?
                </div>
                {loadingAI ? (
                  <div></div>
                ) : (
                  <Button
                    variant={loadingAI ? "contained" : "mixed"}
                    color="tertiary"
                    size="medium"
                    disabled={loadingAI ? true : false}
                  >
                    <i className="fa-solid fa-shuffle"></i>
                    {loadingAI ? "Thinking..." : "Shuffle"}
                  </Button>
                )}
              </div>
              {loadingAI ? (
                <div className="flex items-center gap-2 body-2">
                  <LoaderCircle size={16} className="animate-spin" />
                  AI is thinking...
                </div>
              ) : (
                <div className="body-2">
                  {book.aiSuggestion || "AI suggestion is not available."}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="w-full subtitle-1">Reviews</div>
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

            <div className="p-6 rounded-lg bg-paper-elevation-8 shadow-card-3d">
              <div className="flex flex-col gap-5">
                {/* Review Form */}
                <div className="flex flex-col gap-4 p-6 rounded-lg shadow-card-3d bg-paper-elevation-6">
                  {showReview && (
                    <Textarea
                      placeholder="Write a review..."
                      className="w-full"
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                    />
                  )}
                  <div className="flex gap-10">
                    <div className="flex flex-col">
                      <div className="text-text-disabled body-2">
                        Rate this book:
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
                                ? "text-info-main h-6 w-6"
                                : "text-text-disabled h-6 w-6"
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
                    <Button
                      variant={showReview ? "contained" : "mixed"}
                      color="primary"
                      size="large"
                      className="w-full"
                      onClick={
                        showReview ? hdlPostReview : () => setShowReview(true)
                      }
                    >
                      <i className="mr-2 fa-solid fa-edit"></i>
                      {showReview ? "Post" : "Write a review"}
                    </Button>
                  </div>
                </div>

                {/* Review List */}
                {book.review?.length === 0 ? (
                  <div className="flex flex-col items-center gap-4 p-4">
                    <img
                      src={nothingPic}
                      alt="Nothing here"
                      className="h-[120px] w-[132px] object-cover"
                    />
                    <div className="text-center">
                      <div className="subtitle-1">Nothing here</div>
                      <div className="caption text-text-disabled">
                        Be the first to review this book!
                      </div>
                    </div>
                  </div>
                ) : (
                  book.review?.map((r) => (
                    <div
                      className="flex flex-row gap-4 p-6 rounded-lg bg-paper-elevation-6 shadow-card-3d"
                      key={r.id}
                    >
                      <div className="flex w-[200px] flex-col gap-2">
                        <Avatar className="size-10">
                          <AvatarImage src={r.user.avatarUrl} alt="@shadcn" />
                          <AvatarFallback className="bg-action-disabled/50">
                            <i class="fa-solid fa-user"></i>
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="subtitle-4">{r.user?.name}</div>
                          <div className="body-3 text-text-disabled">
                            {r.user?.reviewCount || 0} reviews
                          </div>
                          <div className="body-3 text-text-disabled">
                            {r.user?.followerCount || 0} followers
                          </div>
                        </div>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          className="w-25"
                        >
                          Follow
                        </Button>
                      </div>
                      <div className="flex flex-col w-full gap-3">
                        <StaticRating
                          rating={r.reviewPoint}
                          showNumber={false}
                          size="16px"
                        />
                        <div className="body-2 text-text-secondary">
                          {r.content}
                        </div>
                        <div className="w-full pt-3 border-t body-3 text-text-disabled border-divider">
                          Was this review helpful?
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            className="[&_svg]:pb-0.5"
                          >
                            <i class="fa-regular fa-thumbs-up"></i>
                            {r._count.likes}
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            className="[&_svg]:pb-0.5"
                          >
                            <i class="fa-regular fa-comment"></i>
                            {r._count.comments}
                          </Button>
                          <Button
                            variant="text"
                            color="secondary"
                            size="icon"
                            className="w-7 h-7"
                          >
                            <i class="fa-solid fa-ellipsis"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
=======
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
                  <Button variant="mixed" color="tertiary" type="submit">
                    <i class="fa-regular fa-shuffle"></i>
                    Tell me more
                  </Button>
                </div>
                {book?.aiSuggestion ? (
                  <div className="body-2">{book?.aiSuggestion}</div>
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
>>>>>>> origin/feature/registerbooktag
      </div>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> origin/feature/registerbooktag
export default Book;
