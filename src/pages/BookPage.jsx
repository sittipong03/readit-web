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
                    <Star className="w-10" />
                    <StarIcon />
                    <p>{book?.averageRating}</p>
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
                    <Badge variant="secondary" className="text-secondary-lighter subtitle-4 rounded-pill h-8 px-3" key={tag.id}>
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
              <div className="">
                <div className="flex flex-col gap-5 border">
                  <div className="flex gap-5">
                    <div className="">
                      {showReview && (
                        <div className="">
                          <input
                            id="review"
                            type="text"
                            placeholder="Write a review"
                          />
                        </div>
                      )}
                      <p>Rate thie book</p>
                      <div className="flex">
                        <Star className="w-6" />
                        <Star className="w-6" />
                        <Star className="w-6" />
                        <Star className="w-6" />
                      </div>
                    </div>
                    {showReview ? (
                      <button
                        className="cursor-pointer rounded-2xl border p-4"
                        onClick={() => hdlPostReview()}
                      >
                        Post
                      </button>
                    ) : (
                      <button
                        className="cursor-pointer rounded-2xl border p-4"
                        onClick={() => hdlReview()}
                      >
                        Write a review
                      </button>
                    )}
                  </div>
                  {book?.review.length == 0 ? (
                    <div className="">
                      <h1>Nothing here</h1>
                      <p>Nothing there</p>
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
