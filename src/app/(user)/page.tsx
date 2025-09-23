
import Brand from "../../components/home/Brand";
import Category from "../../components/home/Category";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import FlashSale from "../../components/home/FlashSele";
import Hero from "../../components/home/Hero";
import Slider from "../../components/home/Slider";
import JastForYouProducts from "../../components/home/JastForYou";
import PromoCards from "../../components/home/PromoCards";
export default function Home() {
  const slideData =[
    {
      title: "Welcome to Our Site",
      description: "Explore our features and offerings.",
      image: "https://i.ibb.co.com/5hSW5ZJP/alfred-kenneally-lxw7-Dqi-RF2s-unsplash.jpg",
      link: "/features"
    },
    {
      title: "Join Our Community",
      description: "Connect with like-minded individuals.",
      image: "https://i.ibb.co.com/5hSW5ZJP/alfred-kenneally-lxw7-Dqi-RF2s-unsplash.jpg",
      link: "/community"
    },
    {
      title: "Learn More",
      description: "Discover more about what we do.",
      image: "https://i.ibb.co.com/5hSW5ZJP/alfred-kenneally-lxw7-Dqi-RF2s-unsplash.jpg",
      link: "/learn"
    }
  ]
  return (
    <>
    <Hero />
    <Slider slideData={slideData} />
    <PromoCards />
    <FeaturedProducts />
    <Category />
    <FlashSale />
    <Brand />
    <JastForYouProducts />
    {/* <Newsletter /> */}
    {/* <Testimonials /> */}
    {/* <PromoCards /> */}
    </>
  );
}


// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// const dummyProducts = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     price: 45.99,
//     image: "https://via.placeholder.com/150?text=Headphones",
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     price: 89.99,
//     image: "https://via.placeholder.com/150?text=Smart+Watch",
//   },
//   {
//     id: 3,
//     name: "Sneakers",
//     price: 59.99,
//     image: "https://via.placeholder.com/150?text=Sneakers",
//   },
//   {
//     id: 4,
//     name: "Backpack",
//     price: 39.99,
//     image: "https://via.placeholder.com/150?text=Backpack",
//   },
// ];

// function Countdown({ targetDate }: { targetDate: Date }) {
//   const [timeLeft, setTimeLeft] = useState(0);

//   useEffect(() => {
//     function updateCountdown() {
//       const now = new Date().getTime();
//       const diff = targetDate.getTime() - now;
//       setTimeLeft(diff > 0 ? diff : 0);
//     }
//     updateCountdown();
//     const intervalId = setInterval(updateCountdown, 1000);
//     return () => clearInterval(intervalId);
//   }, [targetDate]);

//   if (timeLeft <= 0) return <span>Sale ended</span>;

//   const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
//   const seconds = Math.floor((timeLeft / 1000) % 60);

//   return (
//     <span>
//       {hours.toString().padStart(2,"0")}:
//       {minutes.toString().padStart(2,"0")}:
//       {seconds.toString().padStart(2,"0")}
//     </span>
//   );
// }

// export default function HomePageDemo() {
//   // Flash sale ends 2 hours from now
//   const flashSaleEnd = new Date(Date.now() + 2 * 60 * 60 * 1000);

//   // Simple slider state
//   const banners = [
//     "https://via.placeholder.com/1200x400?text=Big+Summer+Sale",
//     "https://via.placeholder.com/1200x400?text=New+Arrivals",
//     "https://via.placeholder.com/1200x400?text=Exclusive+Deals",
//   ];
//   const [currentBanner, setCurrentBanner] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [banners.length]);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      // {/* Promo Cards */}
      // <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
      //   <div className="bg-white p-6 rounded shadow text-center">
      //     <h3 className="font-semibold mb-2">Free Shipping</h3>
      //     <p>On orders over $50</p>
      //   </div>
      //   <div className="bg-white p-6 rounded shadow text-center">
      //     <h3 className="font-semibold mb-2">Easy Returns</h3>
      //     <p>30-day money-back guarantee</p>
      //   </div>
      //   <div className="bg-white p-6 rounded shadow text-center">
      //     <h3 className="font-semibold mb-2">Secure Payments</h3>
      //     <p>100% secure checkout</p>
      //   </div>
      // </section>

//       {/* Categories */}
//       <section className="p-6 max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {["Electronics", "Fashion", "Home", "Sports"].map((cat) => (
//             <div key={cat} className="bg-white shadow rounded p-6 text-center cursor-pointer hover:shadow-lg transition">
//               {cat}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="p-6 max-w-6xl mx-auto bg-gray-100 dark:bg-gray-800 rounded">
//         <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {dummyProducts.map(({ id, name, price, image }) => (
//             <div
//               key={id}
//               className="bg-white rounded shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
//             >
//               <img src={image} alt={name} className="w-32 h-32 object-contain mb-4" />
//               <h3 className="font-semibold">{name}</h3>
//               <p className="text-amber-500 font-bold">${price.toFixed(2)}</p>
//               <button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded transition">
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Flash Sale */}
//       <section className="p-6 max-w-6xl mx-auto text-center bg-red-600 text-white rounded my-12">
//         <h2 className="text-3xl font-bold mb-2">Flash Sale Ends In</h2>
//         <p className="text-4xl font-mono mb-4">
//           <Countdown targetDate={flashSaleEnd} />
//         </p>
//         <button className="bg-white text-red-600 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition">
//           Grab the Deals
//         </button>
//       </section>

//       {/* Testimonials */}
//       <section className="p-6 max-w-6xl mx-auto bg-gray-100 dark:bg-gray-800 rounded">
//         <h2 className="text-3xl font-bold mb-6 text-center">What Our Customers Say</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {[
//             "Great quality and fast shipping!",
//             "Amazing customer support.",
//             "Highly recommend ShopMate for online shopping.",
//           ].map((text, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded shadow p-6 italic text-center text-gray-700 dark:text-gray-300"
//             >
//               “{text}”
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="p-6 max-w-6xl mx-auto text-center bg-amber-500 text-white rounded my-12">
//         <h2 className="text-3xl font-bold mb-4">Subscribe for Updates & Offers</h2>
//         <form className="flex justify-center gap-2 max-w-md mx-auto">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="p-3 rounded text-black w-full"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-white text-amber-500 font-semibold px-6 rounded hover:bg-gray-100 transition"
//           >
//             Subscribe
//           </button>
//         </form>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 p-6 text-center">
//         <p>© 2025 ShopMate. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
