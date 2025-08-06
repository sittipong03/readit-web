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

function Book() {
  const [loading, setLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [createReview, setCreateReview] = useState(false);
  const getBookById = bookManageStore(state => state.getBookById);
  const user = useUserStore(state => state.userId);
  const token = useUserStore(state => state.token);
  const book = bookManageStore(state => state.book);
  const review = reviewManageStore(state => state.reviews);
  const getProduct = productManageStore(state => state.getProductId)
  const product =  productManageStore(state => state.product);
  const getReview = reviewManageStore(state => state.getAllReview);
  const addReview = reviewManageStore(state => state.addReview)
  const addToCart = cartManageStore(state => state.addToCart);
  const { bookId } = useParams();
  console.log(book);
  // console.log(token);
  console.log("User",user);
  // console.log("Token",token);
  // console.log(getProduct);
  console.log("product", product);
  const hdlReview = () => {
    setShowReview(!showReview);
  }


  const hdlPostReview = async() => {
    try {
      const data = document.getElementById("review")
      const sendData = {userId: user, bookId: book.id, title: book.title, content: data.value, reviewPoint: 3}
      const response = await addReview(book.id, sendData, token)
      setShowReview(!showReview);
      setCreateReview(!createReview);
    } catch (error) {
      console.log(error);
    }
  }

  

  const cartData = async(data) => {
    try {
      const sendData = {userId: user, productId: product.id, quantity: 1 }
      const response = await addToCart(sendData, token);
      toast.success(response.data.message)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    const getbook = async () => {
      setLoading(true)
      // const res = await getBookById(bookId);
      // const review = await getReview(bookId);
      const [res, review] = await Promise.all([getBookById(bookId),getReview(bookId)])
      console.log(product);
      setLoading(false)
      
    }
    const getProduct = async() => {
      const product = await getProduct(bookId);
    }
    getbook(), getProduct()
  }, [createReview])

  return (
    <div className="bg-paper-elevation-6 min-h-[700px]">
      {loading
        ?
        <div className="p-20 text-2xl flex justify-center gap-2"><LoaderCircle className="animate-spin" />Page loading</div>
        :
        <div className="flex gap-4 p-20">
          <div className="w-2/5">
            <div className="">
              <div className="">
                {/* <img src={book?.edition.map((editions) => (
              editions.coverImage.toString()
            ))} alt="image picture" /> */}
              </div>
              <div className="flex flex-col gap-4 mb-5">
                <h1>{book?.title}</h1>
                <p>{book?.Author.name}</p>
                <div className="flex">
                  <Star className="w-10" />
                  <StarIcon/>
                  <p>{book?.averageRating}</p>
                </div>
                <div className="flex gap-6">
                  <p>{book?.ratingCount} Ratings</p>
                  <p>{book?.reviewCount} Reviews</p>
                  {/* <p>{book?.averageRating}</p> */}
                </div>
                <button className="p-3 border rounded-2xl w-fit" onClick={() => cartData(book?.id)}>Add to cart</button>
              </div>
            </div>
            <div className="mb-4 border">
              <h2>5 min read</h2>
              <p>{book?.description}</p>
            </div>
            <div className="mb-4 border">
              <h2>More Edition</h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, eaque.</p>
            </div>
            <div className="">
              <h2 className="mb-6">Gerne</h2>
              {book?.bookTag.map((tag) => (
                <button className="p-3 mr-5 border rounded-2xl" key={tag.id}>{tag.tag.name}</button>
              ))}
            </div>
          </div>
          <div className="w-3/5">
            <div className="mb-10 border">
              <h1>Do you know</h1>
              {book?.aiSuggestion ?
                <p>{book?.aiSuggestion}</p>
                : <p>Template for Ai suggestion.</p>
              }

            </div>
            <div className="">
              <div className="flex flex-col gap-5 border">

                <div className="flex gap-5">
                  <div className="">
                    {showReview &&
                      <div className="">
                        <input id="review" type="text" placeholder="Write a review" />
                      </div>
                    }
                    <p>Rate thie book</p>
                    <div className="flex">
                      <Star className="w-6" />
                      <Star className="w-6" />
                      <Star className="w-6" />
                      <Star className="w-6" />
                    </div>
                  </div>
                  {showReview 
                    ? 
                    <button className="p-4 border cursor-pointer rounded-2xl" onClick={() => hdlPostReview()}>Post</button>
                    :
                    <button className="p-4 border cursor-pointer rounded-2xl" onClick={() => hdlReview()}>Write a review</button>
                  }
                </div>
                {book?.review.length == 0 ? (
                  <div className="">
                    <h1>Nothing here</h1>
                    <p>Nothing there</p>
                  </div>
                ) : book?.review.map((review) => (
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
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
export default Book