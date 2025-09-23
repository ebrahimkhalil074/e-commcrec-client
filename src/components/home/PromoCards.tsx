"use client";

import { FaTruck, FaUndo, FaLock, FaHeadset } from "react-icons/fa";

const promoItems = [
  {
    id: 1,
    icon: <FaTruck className="text-3xl text-amber-500 mb-3" />,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    id: 2,
    icon: <FaUndo className="text-3xl text-amber-500 mb-3" />,
    title: "Easy Returns",
    description: "30-day money-back guarantee",
  },
  {
    id: 3,
    icon: <FaLock className="text-3xl text-amber-500 mb-3" />,
    title: "Secure Payments",
    description: "100% secure checkout",
  },
  {
    id: 4,
    icon: <FaHeadset className="text-3xl text-amber-500 mb-3" />,
    title: "24/7 Support",
    description: "We’re here to help anytime",
  },
];

export default function PromoCards() {
  return (

    <section className="py-12 px-6 ">
      <h2 className="text-3xl  text-amber-500 font-bold py-2">
        Why Shop With Us?
      </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-4">
      {promoItems.map((item) => (
        <div
          key={item.id}
          className="bg-white flex justify-center items-center gap-4 dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center"
        >
          {item.icon}
         <div>
             <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {item.description}
          </p>
         </div>
        </div>
      ))}
    </div>
    </section>
  );
}
