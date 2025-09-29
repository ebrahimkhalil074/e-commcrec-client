"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

export default function FailedPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("tid");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-6">
      <FaTimesCircle className="text-red-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-red-600">Payment Failed </h1>

      <p className="text-gray-700 mt-2">
        Sorry, your payment could not be completed. Please try again.
      </p>

      {transactionId && (
        <p className="mt-3 text-gray-800 font-medium">
          Transaction ID: <span className="text-red-600">{transactionId}</span>
        </p>
      )}

      <Link
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        href="/"
      >
        Back to My Orders
      </Link>
    </div>
  );
}
