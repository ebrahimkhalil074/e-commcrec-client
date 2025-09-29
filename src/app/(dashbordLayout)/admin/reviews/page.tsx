"use client";

import { useState, useEffect } from "react";
import { FaStar, FaTrash, FaEdit } from "react-icons/fa";

// Example review type
type Review = {
  id: string;
  user: string;
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function AllReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Example fetch function (replace with API call)
  useEffect(() => {
    setTimeout(() => {
      setReviews([
        {
          id: "1",
          user: "John Doe",
          product: "iPhone 15",
          rating: 5,
          comment: "Amazing product!",
          createdAt: "2025-09-15T10:00:00Z",
        },
        {
          id: "2",
          user: "Jane Smith",
          product: "MacBook Pro",
          rating: 4,
          comment: "Very good, but a bit expensive.",
          createdAt: "2025-09-14T09:30:00Z",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p className="p-4">Loading reviews…</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-amber-600">All Reviews</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-amber-100">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">User</th>
              <th className="px-4 py-2 border-b">Product</th>
              <th className="px-4 py-2 border-b">Rating</th>
              <th className="px-4 py-2 border-b">Comment</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{review.user}</td>
                <td className="px-4 py-2 border-b">{review.product}</td>
                <td className="px-4 py-2 border-b flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating ? "text-amber-500" : "text-gray-300"
                      }
                    />
                  ))}
                </td>
                <td className="px-4 py-2 border-b">{review.comment}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
