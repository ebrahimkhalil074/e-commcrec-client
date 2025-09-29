import Image from "next/image";
import React from "react";

export default function EmptyCart({ onShopNow }: { onShopNow: any }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-gradient-to-b from-indigo-50 via-amber-50 to-pink-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 transition-all">
        {/* Left: Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-72 h-56 md:w-80 md:h-64">
            {/* Decorative blurred background */}
            <div className="absolute inset-0 rounded-2xl -z-10 blur-3xl opacity-40 bg-gradient-to-tr from-amber-300 to-pink-200 dark:from-indigo-600 dark:to-amber-600" />

            {/* Main image (online) */}
            <Image
              fill
              alt="Empty cart illustration"
              className="w-full h-full object-contain rounded-2xl drop-shadow-2xl"
              loading="lazy"
              src="https://static.vecteezy.com/system/resources/previews/014/322/476/non_2x/shopping-cart-out-off-order-icon-illustration-glyph-style-design-with-color-and-plus-sign-png.png"
            />

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-indigo-600 to-amber-600 rounded-full p-3 shadow-lg transform animate-bounce">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Message & actions */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Oops! Your cart is empty
          </h3>
          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
            You havent added anything yet. Discover exciting products and start
            shopping to fill this space with your favorites.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-4 justify-center md:justify-start">
            <button
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-transform"
              onClick={onShopNow}
            >
              Start Shopping
              <svg
                className="h-5 w-5 opacity-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  fillRule="evenodd"
                />
              </svg>
            </button>

            <a
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              href="/collections/best-sellers"
            >
              Browse Best Sellers
            </a>
          </div>

          <div className="mt-6 text-xs text-slate-400 dark:text-slate-500 italic">
            Tip: Save products to your wishlist for quick checkout later.
          </div>
        </div>
      </div>
    </div>
  );
}
