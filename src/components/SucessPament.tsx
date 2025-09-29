"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("tid");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 px-6">
      <FaCheckCircle className="text-amber-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-amber-600">Payment Successful </h1>

      <p className="text-gray-700 mt-2">
        Thank you! Your payment has been processed successfully.
      </p>

      {transactionId && (
        <p className="mt-3 text-gray-800 font-medium">
          Transaction ID:{" "}
          <span className="text-amber-600">{transactionId}</span>
        </p>
      )}

      <Link
        className="mt-6 px-6 py-3 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700"
        href="/"
      >
        Go to Home
      </Link>
    </div>
  );
}
