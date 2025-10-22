"use client";

import { motion } from "framer-motion";

import ProductCard from "../card/Product";
import FeturedProductSkeletonGrid from "../skeloton/FeturedProductSkl";

import { useGetJustForYouProducts } from "@/src/hooks/product.hook";

export default function JustForYouProducts() {
  const { data: productsData, isLoading: productsLoading } =
    useGetJustForYouProducts();

  const products = productsData?.data || [];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    
  };

  return (
    <section className="py-12 px-6">
      <motion.h2
        className="text-3xl text-amber-600 font-bold mb-6"
        initial={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }} // scroll এ ফিরে আসলেও animate হবে
        whileInView={{ opacity: 1, y: 0 }}
      >
        Just For You
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsLoading ? (
          <FeturedProductSkeletonGrid />
        ) : (
          products.map((product: any, index: number) => (
            <motion.div
              key={product.id || index}
              className="w-full"
              initial="hidden"
              variants={cardVariants}
               whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
              viewport={{ once: false, amount: 0.2 }} // scroll এ আবার animate হবে
              whileInView="visible"
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
