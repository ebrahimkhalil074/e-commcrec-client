"use client";

import { Image } from "@heroui/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { useGetProductById } from "@/src/hooks/product.hook";
import { useAddCartItem } from "@/src/hooks/cart.hook";
import { useUser } from "@/src/context/User.context";
import ProductDetailsSkeleton from "@/src/components/skeloton/ProductDetailsSkeleton";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const { mutate } = useAddCartItem();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { data: productData, isLoading } = useGetProductById(id as string);

  const product = productData?.data || {
    id: "",
    name: "",
    description: "",
    price: 0,
    discount: 0,
    images: [],
    variants: [],
    stock: 0,
    brand: { name: "" },
    category: { name: "" },
    warranty: "",
  };

  const mainImage = product?.images[0]?.url || "";

  const handleImageClick = (imageUrl: string) => setSelectedImage(imageUrl);

  const colors = useMemo<string[]>(
    () =>
      Array.from(new Set<string>(product.variants.map((v: any) => v.color))),
    [product.variants],
  );

  const sizes = useMemo(() => {
    if (!selectedColor) return [];

    return (
      product.variants
        .find((v: any) => v.color === selectedColor)
        ?.sizes.map((s: any) => s.size) || []
    );
  }, [selectedColor, product.variants]);

  const selectedVariant = useMemo(() => {
    if (!selectedColor) return null;

    return product.variants.find((v: any) => v.color === selectedColor) || null;
  }, [selectedColor, product.variants]);

  const selectedSizeObj = useMemo(() => {
    if (!selectedVariant || !selectedSize) return null;

    return (
      selectedVariant.sizes.find((s: any) => s.size === selectedSize) || null
    );
  }, [selectedVariant, selectedSize]);

  const discountedPrice =
    product.price - ((product.discount || 0) * product.price) / 100;

  const variantDiscountedPrice = selectedVariant
    ? selectedVariant.price -
      ((product.discount || 0) * selectedVariant.price) / 100
    : null;

  const price = variantDiscountedPrice ?? discountedPrice;
  const stock = selectedSizeObj?.stock ?? product.stock;

  const handleAddToCart = () => {
    if (!user) {
      router.push(`/login?redirect=/product/${product.id}`);

      return;
    }
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size first!");

      return;
    }

    const cartItem = {
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      price,
      quantity,
      image: product.images[0]?.url,
      variantId: selectedVariant?.id || null,
      sizeStockId: selectedSizeObj?.id || null,
    };

    mutate(cartItem);
  };

  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 dark:bg-gray-900">
      {/* Left: Images */}
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          key={selectedImage || mainImage}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            alt={product.name}
            className="object-contain rounded-xl border"
            height={400}
            src={selectedImage.length > 0 ? selectedImage : mainImage}
            width={1000}
          />
        </motion.div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {product.images.map((image: any) => (
            <motion.div
              key={image.id}
              className={`cursor-pointer rounded-lg overflow-hidden border ${
                selectedImage === image.url ? "border-2 border-amber-500" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleImageClick(image.url)}
            >
              <Image
                alt={product.name}
                className="w-full h-24 object-cover"
                src={image.url}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right: Details */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-red-600">
            ${price.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <>
              <span className="ml-3 line-through text-red-500">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-2 text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                -{product.discount}%
              </span>
            </>
          )}
        </div>

        {/* Stock */}
        <p
          className={`mt-4 font-medium ${
            stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
        </p>

        {/* Colors */}
        <div className="mt-6">
          <h3 className="font-medium">Color:</h3>
          <div className="flex gap-3 mt-2">
            {colors.map((color) => (
              <motion.button
                key={color}
                aria-label={`Select color ${color}`}
                className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 ${
                  selectedColor === color
                    ? "border-black scale-110"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize(null);
                }}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium">Size:</h3>
            <div className="flex gap-3 mt-2 flex-wrap">
              {sizes.map((size: any) => (
                <motion.button
                  key={size}
                  className={`px-4 py-2 rounded border transition-colors duration-200 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mt-4 flex items-center gap-4">
          <motion.button
            className="px-3 py-1 border rounded"
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </motion.button>
          <span aria-live="polite">{quantity}</span>
          <motion.button
            className="px-3 py-1 border rounded"
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </motion.button>
        </div>

        {/* Add to Cart */}
        <motion.button
          className={`mt-6 w-full py-3 rounded-lg text-white font-bold transition-colors duration-200 ${
            stock > 0
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={stock <= 0}
          whileHover={{ scale: stock > 0 ? 1.02 : 1 }}
          whileTap={{ scale: stock > 0 ? 0.97 : 1 }}
          onClick={handleAddToCart}
        >
          {user ? "Add to Cart" : "Login to Add to Cart"}
        </motion.button>
      </motion.div>
    </div>
  );
}
