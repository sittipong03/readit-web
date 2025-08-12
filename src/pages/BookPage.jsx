import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  ChevronLeft,
  EllipsisVertical,
  LoaderCircle,
  Pencil,
  SquarePen,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useBookManageStore from "../stores/booksManageStore";
import { InstantStarRating } from "../components/InstantStarRating";
import TimeAgo from "../components/TimeAgo";
import { useTypewriter } from "../hooks/useTypewriter";

function Book() {
  // --- States ---
  const [loading, setLoading] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewContent, setReviewContent] = useState(""); // State สำหรับ Textarea
  const [switchDoYouKnow, setSwitchDoYouKnow] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // --- Zustand Stores ---
  const { book, getBookById, getAiSuggestion } = bookManageStore();
  const { getAllReview, addReview } = reviewManageStore();
  const { userId, token } = useUserStore();
  const { product } = productManageStore(); // สมมติว่ายังต้องใช้ product
  const { addToCart } = cartManageStore();
  const {
    aiBooks,
    isFetchingAi,
    fetchAiBooks,
    clearAiBooks,
    aiSearchStatus,
    updateSingleBookInList,
  } = useBookManageStore();

  const { bookId } = useParams();
  const navigate = useNavigate();

  const latestEdition = book?.edition?.find((e) => e.isLatest === true);
  const latestIsbn = latestEdition?.isbn;
  const latestPages = latestEdition?.pages;
  const productAvaliable = book?.product?.length > 0;

  // --- Data Fetching Effect ---
  useEffect(() => {
    console.log("fetchedBook UseFX........");
    const loadData = async () => {
      if (!bookId) return;
      console.log("has bookId........");
      setLoading(true);
      setLoadingAI(true);

      // เรียกข้อมูลหลักก่อน
      const fetchedBook = await getBookById(bookId);
      console.log("fetchedBook UseFX:", fetchedBook);
      console.log("fetchedBook aiSuggestion:", fetchedBook.aiSuggestion);
      await getAllReview(bookId);
      setLoading(false);
      // เรียกข้อมูล AI แยกต่างหาก
      if (!fetchedBook.aiSuggestion) await getAiSuggestion(bookId);
      setLoadingAI(false);
    };

    loadData();
  }, [bookId, getBookById, getAllReview, getAiSuggestion]);

  console.log("Book log:", book);

  // --- Event Handlers ---
  const hdlPostReview = useCallback(async () => {
    console.log("Token Reiviewer:", token);
    if (!book?.rating || book.rating === 0) {
      return toast.error("กรุณาให้คะแนนดาวก่อนโพสต์รีวิว");
    }
    if (!reviewContent.trim()) {
      return toast.error("กรุณาเขียนรีวิวก่อนโพสต์");
    }

    setIsSubmittingReview(true);

    try {
      const sendData = {
        title: "Review for " + book.title,
        content: reviewContent,
      };
      await addReview(book.id, sendData, token);
      toast.success("โพสต์รีวิวสำเร็จ!");

      // Reload reviews
      await getBookById(bookId);
      await getAllReview(bookId);

      // Reset form
      setShowReview(false);
      setReviewContent("");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "ไม่สามารถโพสต์รีวิวได้");
    } finally {
      setIsSubmittingReview(false);
    }
  }, [book, userId, token, reviewContent, addReview, getAllReview]);

  const hdlReview = () => {
    setShowReview(!showReview);
  };

  const handleRatingSubmitted = (updatedBook) => {
    if (updatedBook) {
      updateSingleBookInList(updatedBook);
    }
  };

  const hdlAddToCart = useCallback(async () => {
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
  }, [book, userId, token, reviewContent, addReview, getAllReview]);

  // Function for shuffle do you know
  const listOfDoYouKnow = book?.aiSuggestion?.split("|");
  const shuffleDoYouKnow = () => {
    setSwitchDoYouKnow(Math.floor(Math.random() * 9));
  };

  const fullText =
    listOfDoYouKnow?.length > 0
      ? listOfDoYouKnow[switchDoYouKnow]
      : "AI suggestion is not available.";

  const typedText = useTypewriter(fullText, 20);

  // --- Logic การจัดการรีวิว (ส่วนสำคัญ) ---
  const { hasUserReviewed, sortedReviews } = useMemo(() => {
    const reviews = book?.review || [];

    const userReview = reviews.find((r) => r.user?.id === userId);
    const hasUserReviewed = !!userReview;

    const sorted = [...reviews].sort((a, b) => {
      if (a.user?.id === userId) return -1;
      if (b.user?.id === userId) return 1;
      return 0;
    });

    return { hasUserReviewed, sortedReviews: sorted };
  }, [book?.review, userId]);

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
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate(-1)}
        className="absolute top-24 left-6 mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
      <div className="w-full max-w-lg pb-20">
        <div className="relative flex items-start gap-10 p-10">
          {/* Left Column */}
          <div className="sticky top-20 flex w-full max-w-[480px] flex-col gap-6">
            <div className="flex gap-6">
              <div className="bg-secondary-lighter shadow-book-lighting h-[264px] w-[174px] flex-shrink-0">
                <img
                  src={
                    book?.edition[0]?.coverImage ||
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

            <div className="text-text-secondary shadow-card-3d bg-paper-elevation-8 flex flex-col gap-3 rounded-lg p-6">
              <div className="subtitle-2 mb-1">Description :</div>
              <div className="body-2">
                {book.description || "No description available."}
              </div>
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

            <div className="text-text-secondary shadow-card-3d bg-paper-elevation-8 flex flex-col gap-4 rounded-lg p-6">
              <div className="flex flex-col">
                <div className="subtitle-2 mb-1">More editions :</div>
                <div className="body-2 text-text-disabled">
                  {book?.edition?.length > 1
                    ? `There're ${book?.edition?.length}.`
                    : "There's only 1 edition."}
                </div>
              </div>
              <Carousel className="flex w-full flex-col gap-9">
                <div className="-mt-16 flex w-full justify-end gap-2">
                  <CarouselPrevious className="relative top-0 -left-0 translate-y-0" />
                  <CarouselNext className="relative top-0 -left-0 translate-y-0" />
                </div>
                <CarouselContent className="-ml-1">
                  {book?.edition?.map((edition, index) => (
                    <CarouselItem
                      key={edition.id || index}
                      className="pl-1 md:basis-1/2 lg:basis-[96px]"
                    >
                      <div className="p-0">
                        {book?.edition?.[index]?.coverImage ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="bg-secondary-lighter/20 shadow-book-lighting h-[128px] w-[84px] gap-2">
                              <img
                                src={edition.coverImage || ""}
                                alt={book.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="body-3 text-text-disabled">
                              ({edition.publishedYear || "unknown"})
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="flex flex-col gap-3">
              <div className="subtitle-3">Genre:</div>
              <div className="flex flex-wrap gap-2">
                {book.bookTag?.map((tag) => (
                  <Badge
                    variant="secondary"
                    className="text-secondary-lighter subtitle-4 rounded-pill h-8 px-3"
                    key={tag.tag?.id || tag.id}
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
                  {typedText}
                  <span className="blinking-cursor">|</span>
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
              <div className="flex flex-col gap-4">
                {/* Review Form */}
                {!hasUserReviewed && (
                  <div className="shadow-card-3d bg-paper-elevation-6 flex flex-col gap-4 rounded-lg p-6">
                    {showReview && (
                      <Textarea
                        placeholder="Write a review..."
                        className="w-full"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        disabled={isSubmittingReview}
                      />
                    )}
                    <div className="flex gap-10">
                      <div className="flex w-40 flex-col gap-1">
                        <div className="text-text-disabled body-2">
                          Rate this book:
                        </div>
                        <InstantStarRating
                          bookId={book?.id}
                          onRatingSubmitted={handleRatingSubmitted}
                          rated={book?.rating || 0}
                          size={18}
                        />
                      </div>
                      <Button
                        variant={showReview ? "contained" : "mixed"}
                        color="primary"
                        size="large"
                        className="w-full"
                        onClick={
                          showReview ? hdlPostReview : () => setShowReview(true)
                        }
                        disabled={isSubmittingReview}
                      >
                        {isSubmittingReview ? (
                          <LoaderCircle className="mr-2 animate-spin" />
                        ) : (
                          <SquarePen className="mr-2" />
                        )}
                        {isSubmittingReview
                          ? "Posting..."
                          : showReview
                            ? "Post"
                            : "Write a review"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Review List */}
                {sortedReviews?.length === 0 ? (
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
                  sortedReviews.map((r, index) => {
                    const isCurrentUserReview = r.user?.id === userId;

                    return (
                      <div key={r.id}>
                        {isCurrentUserReview && index === 0 && (
                          <div className="subtitle-3 text-text-disabled mb-3">
                            Your review
                          </div>
                        )}
                        {!isCurrentUserReview &&
                          index === (hasUserReviewed ? 1 : 0) && (
                            <div className="subtitle-3 text-text-disabled mt-3 mb-3">
                              Community review
                            </div>
                          )}
                        <div className="bg-paper-elevation-6 shadow-card-3d flex flex-row gap-4 rounded-lg p-6">
                          <div className="flex w-[200px] flex-col gap-2">
                            <Avatar className="size-10">
                              <AvatarImage
                                src={r.user.avatarUrl}
                                alt="@shadcn"
                              />
                              <AvatarFallback className="bg-action-disabled/50">
                                <i className="fa-solid fa-user"></i>
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
                            {!isCurrentUserReview && (
                              <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                className="w-25"
                              >
                                Follow
                              </Button>
                            )}
                          </div>
                          <div className="flex w-full flex-col gap-3">
                            <div className="flex">
                              <div className="flex flex-1 align-middle">
                                {isCurrentUserReview ? (
                                  <InstantStarRating
                                    bookId={book?.id}
                                    onRatingSubmitted={handleRatingSubmitted}
                                    rated={book?.rating || 0}
                                    size={16}
                                  />
                                ) : (
                                  <StaticRating
                                    rating={r?.rating}
                                    showNumber={false}
                                    size={16}
                                  />
                                )}
                              </div>
                              <div className="body-3 text-text-disabled">
                                <TimeAgo isoDateString={r.createdAt} />
                              </div>
                            </div>
                            <div className="body-2 text-text-secondary">
                              {r.content}
                            </div>
                            <div className="body-3 text-text-disabled border-divider w-full border-t pt-3">
                              Was this review helpful?
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                className="[&_svg]:pb-0.5"
                              >
                                <i className="fa-regular fa-thumbs-up"></i>
                                {r._count.likes}
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                className="[&_svg]:pb-0.5"
                              >
                                <i className="fa-regular fa-comment"></i>
                                {r._count.comments}
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="icon"
                                    className="size-7"
                                  >
                                    <EllipsisVertical size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  className="w-40"
                                  align="start"
                                >
                                  <DropdownMenuItem disabled>
                                    Edit
                                    <DropdownMenuShortcut>
                                      <Pencil size={16} />
                                    </DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem variant="error">
                                    Delete
                                    <DropdownMenuShortcut className="text-error-light">
                                      <Trash size={16} />
                                    </DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
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
