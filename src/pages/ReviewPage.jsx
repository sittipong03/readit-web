import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';

function BookReviewPage() {
  const [reviews, setReviews] = useState([]);
  const { bookId } = useParams()

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:6500/api/review/${bookId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(`http://localhost:6500/api/review/${bookId}`);
        console.log("API response:", response.data);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  return (
    <div className="p-4 space-y-6">
      {reviews.length === 0 ? (
        <p>No reviews for this book.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} onRefresh={fetchReviews} />
        ))
      )}
    </div>
  );
}

export default BookReviewPage;