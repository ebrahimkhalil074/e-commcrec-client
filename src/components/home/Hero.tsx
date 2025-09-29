import Link from "next/link";

const Hero = () => {
  return (
    <div className="container mx-auto relative bg-[url('https://i.ibb.co.com/5hSW5ZJP/alfred-kenneally-lxw7-Dqi-RF2s-unsplash.jpg')] bg-cover bg-center min-h-[50vh] flex items-center justify-center text-white px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-6 py-8 rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-500">
          মায়ের দোয়া ইলেকট্রনিক্স
        </h1>
        <p className="text-lg md:text-xl mb-6 text-amber-100">
          আপনার ব্যবসা কিংবা ব্যক্তিগত চাহিদার জন্য, আমরা দিচ্ছি সেরা
          ইলেকট্রনিক্স পণ্য পাইকারি ও খুচরা মূল্যে।
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
