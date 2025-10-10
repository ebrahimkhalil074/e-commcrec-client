"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  // Variants for staggered children
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="container mx-auto relative bg-[url('https://i.ibb.co/5hSW5ZJP/alfred-kenneally-lxw7-Dqi-RF2s-unsplash.jpg')] bg-cover bg-center min-h-[50vh] flex items-center justify-center text-white px-4 overflow-hidden">
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black opacity-30"
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        whileInView={{ opacity: 0.3 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl px-6 py-8 rounded-xl"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: false, amount: 0.3 }}
        whileInView="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-amber-500"
          variants={fadeUp}
        >
          মায়ের দোয়া ইলেকট্রনিক্স
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-6 text-amber-100"
          variants={fadeUp}
        >
          আপনার ব্যবসা কিংবা ব্যক্তিগত চাহিদার জন্য, আমরা দিচ্ছি সেরা
          ইলেকট্রনিক্স পণ্য পাইকারি ও খুচরা মূল্যে।
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          variants={fadeUp}
        >
          <Link
            className="bg-transparent border border-amber-600 text-amber-600 px-6 py-2 rounded-full hover:bg-amber-600 hover:text-black transition"
            href="/contact"
          >
            Contact Me
          </Link>
          <Link
            className="bg-amber-600 text-black px-6 py-2 rounded-full font-semibold hover:bg-amber-400 transition"
            href="/product"
          >
            Shop Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
