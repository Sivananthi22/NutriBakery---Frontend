import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar'; // Adjust path based on your structure
import Footer from './Footer';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch existing reviews
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/review/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/review/reviews', newReview);
      setReviews([...reviews, newReview]);
      setNewReview({ name: '', rating: 0, comment: '' });
      setError('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('There was an error submitting your review.');
    }
  };

  const handleStarClick = (rating) => {
    setNewReview((prevReview) => ({ ...prevReview, rating }));
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-semibold text-[#915F57] my-6">Customer Reviews</h1>

      {/* Review List */}
      <div className="w-full max-w-4xl mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white shadow-lg p-6 rounded-lg">
            <p className="font-bold text-gray-800">{review.name}</p>
            <div className="text-yellow-500 flex">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Review Submission Form */}
      <form className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg mb-12" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Leave a Review</h2>
        
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          className="block w-full p-3 mb-4 border border-gray-300 rounded"
          required
        />

        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              className={`cursor-pointer text-2xl ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Your Comment"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="block w-full p-3 mb-4 border border-gray-300 rounded"
          required
        ></textarea>

        <button type="submit" className="w-full bg-[#915F57] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90">
          Submit Review
        </button>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
      
      {/* Footer outside the container to span full width */}
      <Footer />
    </div>
  );
};

export default ReviewPage;
