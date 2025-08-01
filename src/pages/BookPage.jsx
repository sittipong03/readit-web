import { useEffect, useState } from "react";
import bookManageStore from "../stores/booksManageStore";
import { useLocation, useParams } from "react-router";
import { Star } from "../icons/Index";

function Book() {
  const [loading, setLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const getBookById = bookManageStore(state => state.getBookById);
  const book = bookManageStore(state => state.book);
  const { bookId } = useParams();
  console.log(bookId)
  const hdlReview = () => {
    setShowReview(!showReview);
  }

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      const res = await getBookById(bookId);
      setLoading(false)
      console.log(res.data);
    }
    run()
  }, [])
  console.log(book);
  return (
    <>
      {loading
        ?
        <div className="p-20 text-2xl">Page loading</div>
        :
        <div className="p-20 flex gap-4">
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
                  <p>{book?.averageRating}</p>
                </div>
                <div className="flex gap-6">
                  <p>{book?.ratingCount} Ratings</p>
                  <p>{book?.reviewCount} Reviews</p>
                  {/* <p>{book?.averageRating}</p> */}
                </div>
                <button className="p-3 border rounded-2xl w-fit">Add to cart</button>
              </div>
            </div>
            <div className="border mb-4">
              <h2>5 min read</h2>
              <p>{book?.description}</p>
            </div>
            <div className="border mb-4">
              <h2>More Edition</h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, eaque.</p>
            </div>
            <div className="">
              <h2 className="mb-6">Gerne</h2>
              {book?.bookTag.map((tag) => (
                <button className="mr-5 border p-3 rounded-2xl" key={tag.id}>{tag.tag.name}</button>
              ))}
            </div>
          </div>
          <div className="w-3/5">
            <div className="border mb-10">
              <h1>Do you know</h1>
              {book?.aiSuggestion ?
                <p>{book?.aiSuggestion}</p>
                : <p>Template for Ai suggestion.</p>
              }

            </div>
            <div className="">
              <div className="border flex flex-col gap-5">

                <div className="flex gap-5">
                  <div className="">
                    {showReview &&
                      <div className="">
                        <input type="text" placeholder="Write a review" />
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
                    <button className="border p-4 rounded-2xl cursor-pointer" onClick={() => hdlReview()}>Post</button>
                    :
                    <button className="border p-4 rounded-2xl cursor-pointer" onClick={() => hdlReview()}>Write a review</button>
                  }
                </div>
                {book?.review.length == 0 ? (
                  <div className="">
                    <h1>Nothing here</h1>
                    <p>Nothing there</p>
                  </div>
                ) : book?.review.map((review) => {
                  <h1>{review}</h1>
                })
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default Book