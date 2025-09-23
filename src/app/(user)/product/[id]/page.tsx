"use client";

import { useAddCartItem } from "@/src/hooks/cart.hook";
import { useGetProductById } from "@/src/hooks/product.hook";
import { addToCart } from "@/src/redux/features/cartSlice";
import { Image } from "@heroui/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@/src/context/User.context"; // আপনার ইউজার হুক

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser(); // লগইন ইউজার
  const { mutate } = useAddCartItem();
  const dispatch = useDispatch();

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

  const colors = useMemo(
    () => [...new Set(product.variants.map((v) => v.color))],
    [product.variants]
  );

  const sizes = useMemo(() => {
    if (!selectedColor) return [];
    return product.variants
      .find((v) => v.color === selectedColor)
      ?.sizes.map((s) => s.size) || [];
  }, [selectedColor, product.variants]);

  const selectedVariant = useMemo(() => {
    if (!selectedColor) return null;
    return product.variants.find((v) => v.color === selectedColor) || null;
  }, [selectedColor, product.variants]);

  const selectedSizeObj = useMemo(() => {
    if (!selectedVariant || !selectedSize) return null;
    return selectedVariant.sizes.find((s) => s.size === selectedSize) || null;
  }, [selectedVariant, selectedSize]);

  const discountedPrice =
    product.price - ((product.discount || 0) * product.price) / 100;

  const variantDiscountedPrice = selectedVariant
    ? selectedVariant.price - ((product.discount || 0) * selectedVariant.price) / 100
    : null;

  const price = variantDiscountedPrice ?? discountedPrice;
  const stock = selectedSizeObj?.stock ?? product.stock;

  const handleAddToCart = () => {
    // লগইন চেক
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
    dispatch(addToCart(cartItem));
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 dark:bg-gray-900">
      {/* Left: Images */}
      <div>
        <Image
          src={selectedImage.length > 0 ? selectedImage : mainImage}
          alt={product.name}
          className="w-full rounded-xl border"
        />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {product.images.map((image) => (
            <Image
              key={image.id}
              src={image.url}
              alt={product.name}
              className={`w-full h-24 object-cover rounded-lg cursor-pointer ${
                selectedImage === image.url ? "border-2 border-amber-500" : ""
              }`}
              onClick={() => handleImageClick(image.url)}
            />
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-red-600">${price.toFixed(2)}</span>
          {product.discount > 0 && (
            <>
              <span className="ml-3 line-through text-red-500">${product.price.toFixed(2)}</span>
              <span className="ml-2 text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                -{product.discount}%
              </span>
            </>
          )}
        </div>

        {/* Stock */}
        <p className={`mt-4 font-medium ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
        </p>

        {/* Colors */}
        <div className="mt-6">
          <h3 className="font-medium">Color:</h3>
          <div className="flex gap-3 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize(null);
                }}
                className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 ${
                  selectedColor === color ? "border-black scale-110" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium">Size:</h3>
            <div className="flex gap-3 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded border transition-colors duration-200 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mt-4 flex items-center gap-4">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 border rounded">
            -
          </button>
          <span aria-live="polite">{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border rounded">
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className={`mt-6 w-full py-3 rounded-lg text-white font-bold transition-colors duration-200 ${
            stock > 0
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {user ? "Add to Cart" : "Login to Add to Cart"}
        </button>
      </div>
    </div>
  );
}
