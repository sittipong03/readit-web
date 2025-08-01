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
    <div>Book</div>
  )
}
export default Book