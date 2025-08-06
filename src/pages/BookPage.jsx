import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

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
  const [reviewContent, setReviewContent] = useState(""); // State สำหรับ Textarea
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [switchDoYouKnow, setSwitchDoYouKnow] = useState(0)
  
  const { bookId } = useParams();
  
  // --- Zustand Stores ---
  const { book, getBookById, getAiSuggestion } = bookManageStore();
  const { reviews, getAllReview, addReview } = reviewManageStore();
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
      
      // เรียกข้อมูลหลักก่อน
      const fetchedBook = await getBookById(bookId);
      await getAllReview(bookId);
      setLoading(false);
      

      console.log(fetchedBook);

      // เรียกข้อมูล AI แยกต่างหาก
      await getAiSuggestion(bookId);
      setLoadingAI(false);
    };
    
    loadData();
  }, [bookId, getBookById, getAllReview, getAiSuggestion]);
  
  const hdlReview = () => {
    setShowReview(!showReview);
  };
  // --- Event Handlers ---
  const hdlPostReview = async () => {
    console.log('token', token)
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

  // Function for shuffle do you know
  const listOfDoYouKnow = book?.aiSuggestion?.split("|")
  const shuffleDoYouKnow = () => {
    setSwitchDoYouKnow(Math.floor(Math.random() * 9))
  }

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
        <div className="flex gap-10 p-10">
          {/* Left Column */}
          <div className="flex w-full max-w-[480px] flex-col gap-6">
            <div className="flex gap-6">
              <div className="bg-secondary-lighter shadow-book-lighting h-[264px] w-[174px] flex-shrink-0">
                <img
                  src={
                    book.coverImage ||
                    "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721918653l/198902277.jpg"
                  }
                  alt={book.title}
                  className="h-full w-full object-cover"
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
                  <Button
                    size="large"
                    variant="mixed"
                    color="secondary"
                    type="button"
                    onClick={hdlAddToCart}
                    className="mt-3 opacity-50"
                    disabled={true}
                  >
                    <i className="fa-regular fa-cart-shopping"></i>
                    Not available
                  </Button>
                )}
              </div>
            </div>

            <div className="text-text-secondary shadow-card-3d bg-paper-elevation-8 flex flex-col gap-3 rounded-lg p-6">
              <div className="subtitle-2 mb-1">5 mins read</div>
              <p>{book.description || "No description available."}</p>
              {latestIsbn ? (
                <div className="body-2 flex gap-4">
                  <div className="w-[148px] flex-shrink-0 font-bold">ISBN</div>
                  <div className="w-full">{latestIsbn}</div>
                </div>
              ) : (
                <div className="body-2 flex gap-4">
                  <div className="w-[148px] flex-shrink-0 font-bold">ISBN</div>
                  <div className="text-text-disabled w-full">Not available</div>
                </div>
              )}
              {latestPages ? (
                <div className="body-2 flex gap-4">
                  <div className="w-[148px] flex-shrink-0 font-bold">Pages</div>
                  <div className="w-full">{latestPages}</div>
                </div>
              ) : (
                <div className="body-2 flex gap-4">
                  <div className="w-[148px] flex-shrink-0 font-bold">Pages</div>
                  <div className="text-text-disabled w-full">Not available</div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <div className="subtitle-3">Genre:</div>
              <div className="flex flex-wrap gap-2">
                {book.bookTag?.map((tag) => (
                  <Badge
                    variant="secondary"
                    className="text-secondary-lighter subtitle-4 rounded-pill h-8 px-3"
                    key={tag.id}
                  >
                    {tag.tag?.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex w-full flex-col gap-6">
            <div className="text-tertiary-darker border-tertiary-outlinedBorder bg-tertiary-selected rounded-lg border p-6">
              <div className="mb-4 flex gap-4">
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
                    onClick={() => shuffleDoYouKnow()}
                  >
                    <i className="fa-solid fa-shuffle"></i>
                    {loadingAI ? "Thinking..." : "Shuffle"}
                  </Button>
                )}
              </div>
              {loadingAI ? (
                <div className="body-2 flex items-center gap-2">
                  <LoaderCircle size={16} className="animate-spin" />
                  AI is thinking...
                </div>
              ) : (
                <div className="body-2">
                  {listOfDoYouKnow?.length > 0 ? listOfDoYouKnow[switchDoYouKnow] : "AI suggestion is not available."}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
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
                {/* Review Form */}
                <div className="shadow-card-3d bg-paper-elevation-6 flex flex-col gap-4 rounded-lg p-6">
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
                      <i className="fa-solid fa-edit mr-2"></i>
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
                      className="bg-paper-elevation-6 shadow-card-3d flex flex-row gap-4 rounded-lg p-6"
                      key={r.id}
                    >
                      <div className="flex w-[200px] flex-col gap-2">
                        <Avatar className="size-10">
                          <AvatarImage src={r.avatarUrl} alt="@shadcn" />
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
                      <div className="flex flex-col gap-3 w-full">
                        <StaticRating
                          rating={r.reviewPoint}
                          showNumber={false}
                          size="16px"
                        />
                        <div className="body-2 text-text-secondary">{r.content}</div>
                        <div className="body-3 text-text-disabled pt-3 border-t border-divider w-full">Was this review helpful?</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
