"use client";
import { motion } from "framer-motion";

import ProductCard from "../card/Product";
import FeturedProductSkeletonGrid from "../skeloton/FeturedProductSkl";

import { useGetAllFeaturedProducts } from "@/src/hooks/product.hook";

export default function FeaturedProducts() {
  const { data: productsData, isLoading: productsLoading } =
    useGetAllFeaturedProducts();
  const products = productsData?.data || [];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 px-6 overflow-hidden">
      <motion.h2
        className="text-3xl text-amber-600 font-bold mb-6"
        initial="hidden"
        variants={fadeUp}
        viewport={{ once: false, amount: 0.2 }}
        whileInView="visible"
      >
        Featured Products
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        variants={{
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
          },
        }}
        viewport={{ once: false, amount: 0.15 }}
        whileInView="visible"
      >
        {productsLoading ? (
          <motion.div
            className="col-span-full"
            variants={fadeUp}
            viewport={{ once: false }}
          >
            <FeturedProductSkeletonGrid />
          </motion.div>
        ) : (
          products.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              className="rounded-xl"
              transition={{ duration: 0.3 }}
              variants={fadeUp}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
}
