// prodctdetails page

// "use client";

// import { useGetProductById } from "@/src/hooks/product.hook";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { FaStar } from "react-icons/fa";
// import { useState } from "react";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { data: productData, isLoading } = useGetProductById(id);
//   const product = productData?.data;

//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState("");

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;
//   if (!product) return <div className="text-center py-10">Product not found</div>;

//   const { price, discount = 0, stock } = product;
//   const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

//   const mainImage = selectedImage || product.images?.[0]?.url || "/placeholder.jpg";

//   const increaseQty = () => {
//     if (quantity < stock) setQuantity(q => q + 1);
//   };

//   const decreaseQty = () => {
//     if (quantity > 1) setQuantity(q => q - 1);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
//       {/* Product Images */}
//       <div className="space-y-4">
//         {/* Main Image */}
//         <div className="relative w-full h-[400px] rounded-xl overflow-hidden border">
//           <Image
//             src={mainImage}
//             alt={product.name}
//             fill
//             className="object-cover transition-all duration-300"
//           />
//         </div>

//         {/* Thumbnail Images */}
//         {product.images?.length > 1 && (
//           <div className="flex gap-2 overflow-x-auto">
//             {product.images.map((img, i) => (
//               <div
//                 key={i}
//                 onClick={() => setSelectedImage(img.url)}
//                 className={`relative w-20 h-20 cursor-pointer rounded overflow-hidden border-2 ${
//                   mainImage === img.url ? "border-amber-500" : "border-gray-300"
//                 }`}
//               >
//                 <Image src={img.url} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{product.name}</h1>

//         {/* Rating */}
//         <div className="flex items-center gap-2 text-sm text-amber-500">
//           <FaStar />
//           <span>{product.rating?.toFixed(1) || "N/A"}</span>
//           {product.reviewCount && (
//             <span className="text-gray-500 dark:text-gray-400 ml-2">
//               ({product.reviewCount} reviews)
//             </span>
//           )}
//         </div>

//         {/* Price */}
//         <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//           <span className="text-amber-600">${discountedPrice.toFixed(2)}</span>
//           {discount > 0 && (
//             <>
//               <span className="ml-3 line-through text-red-500">${price.toFixed(2)}</span>
//               <span className="ml-2 text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
//                 -{discount}%
//               </span>
//             </>
//           )}
//         </div>

//           {/* Stock, Brand, Category */}
//          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
//    <p>
//      <span className="font-medium">Stock:</span>{" "}
//      {product.stock > 0 ? (
//       <span className="text-green-600 font-semibold">{product.stock} available</span>
//     ) : (
//       <span className="text-red-500 font-semibold">Out of stock</span>
//     )}
//   </p>

//   {/* Brand */}
//   <div className="flex items-center gap-2">
//     <span className="font-medium">Brand:</span>
//     <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full shadow-sm">
//       {product.brand.name}
//     </span>
//   </div>

//   {/* Category */}
//   <div className="flex items-center gap-2">
//     <span className="font-medium">Category:</span>
//     <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full shadow-sm">
//       {product.category.name}
//     </span>
//   </div>

//   {/* Warranty (optional) */}
//   {product.warranty && (
//     <div className="flex items-center gap-2">
//       <span className="font-medium">Warranty:</span>
//       <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full shadow-sm">
//         {product.warranty}
//       </span>
//     </div>
//   )}
// </div>

//         {/* Description */}
//         <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
//           {product.description}
//         </p>

//         {/* Quantity Selector */}
//         <div className="flex items-center gap-4 mt-4">
//           <span className="text-sm font-medium">Quantity:</span>
//           <div className="flex items-center border rounded-full px-3 py-1 bg-white dark:bg-gray-900">
//             <button
//               onClick={decreaseQty}
//               className="px-2 text-xl font-bold text-amber-600 hover:scale-110"
//             >
//               −
//             </button>
//             <span className="px-4 text-lg font-semibold">{quantity}</span>
//             <button
//               onClick={increaseQty}
//               className="px-2 text-xl font-bold text-amber-600 hover:scale-110"
//               disabled={quantity >= stock}
//             >
//               +
//             </button>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-4 pt-4">
//           <button
//             disabled={stock <= 0}
//             className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full transition disabled:opacity-50"
//           >
//             Add to Cart
//           </button>
//           <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white px-6 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//             Add to Wishlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// "use client";

// import { useGetProductById } from "@/src/hooks/product.hook";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { FaStar } from "react-icons/fa";
// import { useState } from "react";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { data: productData, isLoading } = useGetProductById(id);
//   const product = productData?.data;

//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [selectedVariant, setSelectedVariant] = useState(null);

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;
//   if (!product) return <div className="text-center py-10">Product not found</div>;

//   const { price, discount = 0, stock, variants = [] } = product;
//   const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

//   const mainImage = selectedImage || product.images?.[0]?.url || "/placeholder.jpg";

//   const increaseQty = () => {
//     if (quantity < stock) setQuantity(q => q + 1);
//   };

//   const decreaseQty = () => {
//     if (quantity > 1) setQuantity(q => q - 1);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
//       {/* Product Images */}
//       <div className="space-y-4">
//         <div className="relative w-full h-[400px] rounded-xl overflow-hidden border">
//           <Image
//             src={mainImage}
//             alt={product.name}
//             fill
//             className="object-cover transition-all duration-300"
//           />
//         </div>

//         {product.images?.length > 1 && (
//           <div className="flex gap-2 overflow-x-auto">
//             {product.images.map((img, i) => (
//               <div
//                 key={i}
//                 onClick={() => setSelectedImage(img.url)}
//                 className={`relative w-20 h-20 cursor-pointer rounded overflow-hidden border-2 ${
//                   mainImage === img.url ? "border-amber-500" : "border-gray-300"
//                 }`}
//               >
//                 <Image src={img.url} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{product.name}</h1>

//         {/* Rating */}
//         <div className="flex items-center gap-2 text-sm text-amber-500">
//           <FaStar />
//           <span>{product.rating?.toFixed(1) || "N/A"}</span>
//           {product.reviewCount && (
//             <span className="text-gray-500 dark:text-gray-400 ml-2">
//               ({product.reviewCount} reviews)
//             </span>
//           )}
//         </div>

//         {/* Price */}
//         <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//           <span className="text-amber-600">${discountedPrice.toFixed(2)}</span>
//           {discount > 0 && (
//             <>
//               <span className="ml-3 line-through text-red-500">${price.toFixed(2)}</span>
//               <span className="ml-2 text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
//                 -{discount}%
//               </span>
//             </>
//           )}
//         </div>

//         {/* Variant Size Selector */}
//         {variants.length > 0 && (
//           <div>
//             <span className="font-medium text-gray-800 dark:text-gray-200">Select Size:</span>
//             <div className="flex flex-wrap gap-3 mt-2">
//               {variants.map((variant, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedVariant(variant)}
//                   className={`px-4 py-2 rounded-full border transition ${
//                     selectedVariant?.size === variant.size
//                       ? "bg-amber-500 text-white border-amber-500"
//                       : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
//                   }`}
//                 >
//                   {variant.size}
//                 </button>
//               ))}
//             </div>
//             {selectedVariant && (
//               <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                 Stock:{" "}
//                 {selectedVariant.stock > 0 ? (
//                   <span className="text-green-600">{selectedVariant.stock} available</span>
//                 ) : (
//                   <span className="text-red-500">Out of stock</span>
//                 )}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Stock, Brand, Category */}
//         <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
//           <p>
//             <span className="font-medium">Stock:</span>{" "}
//             {product.stock > 0 ? (
//               <span className="text-green-600 font-semibold">{product.stock} available</span>
//             ) : (
//               <span className="text-red-500 font-semibold">Out of stock</span>
//             )}
//           </p>

//           <div className="flex items-center gap-2">
//             <span className="font-medium">Brand:</span>
//             <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full shadow-sm">
//               {product.brand.name}
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="font-medium">Category:</span>
//             <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full shadow-sm">
//               {product.category.name}
//             </span>
//           </div>

//           {product.warranty && (
//             <div className="flex items-center gap-2">
//               <span className="font-medium">Warranty:</span>
//               <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full shadow-sm">
//                 {product.warranty}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Description */}
//         <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
//           {product.description}
//         </p>

//         {/* Quantity Selector */}
//         <div className="flex items-center gap-4 mt-4">
//           <span className="text-sm font-medium">Quantity:</span>
//           <div className="flex items-center border rounded-full px-3 py-1 bg-white dark:bg-gray-900">
//             <button
//               onClick={decreaseQty}
//               className="px-2 text-xl font-bold text-amber-600 hover:scale-110"
//             >
//               −
//             </button>
//             <span className="px-4 text-lg font-semibold">{quantity}</span>
//             <button
//               onClick={increaseQty}
//               className="px-2 text-xl font-bold text-amber-600 hover:scale-110"
//               disabled={quantity >= stock}
//             >
//               +
//             </button>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-4 pt-4">
//           <button
//             disabled={stock <= 0 || (variants.length > 0 && !selectedVariant)}
//             className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full transition disabled:opacity-50"
//           >
//             Add to Cart
//           </button>
//           <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white px-6 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//             Add to Wishlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// "use client";

// import { useGetProductById } from "@/src/hooks/product.hook";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { FaStar } from "react-icons/fa";
// import { useState, useMemo, useEffect } from "react";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { data: productData, isLoading } = useGetProductById(id);
//   const product = productData?.data;
// console.log(product)
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [variantStock, setVariantStock] = useState(null);
//   const [variantPrice, setVariantPrice] = useState(null);

//   // Unique color গুলো বের করা (stock > 0 থাকা)
//   const colors = useMemo(() => {
//     if (!product?.variants) return [];
//     const uniqueColors = [
//       ...new Set(
//         product.variants
//           .filter((v) => v.stock > 0 && v.color)
//           .map((v) => v.color)
//       ),
//     ];
//     return uniqueColors;
//   }, [product?.variants]);

//   // Unique size গুলো বের করা (selectedColor এর উপর ভিত্তি করে)
//   const sizes = useMemo(() => {
//     if (!product?.variants || !selectedColor) return [];
//     const filteredSizes = product.variants
//       .filter(v => v.color === selectedColor && v.size)
//       .map(v => v.size);

//     return [...new Set(filteredSizes)]; // Unique sizes
//   }, [product?.variants, selectedColor]);

//   // যখন color এবং size সিলেক্ট হবে, তখন variant stock এবং price সেট করা
//   useEffect(() => {
//     if (selectedColor && selectedSize) {
//       const matchedVariant = product.variants.find(
//         (v) => v.color === selectedColor && v.size === selectedSize
//       );
//       if (matchedVariant) {
//         setVariantStock(matchedVariant.stock);
//         setVariantPrice(matchedVariant.price);
//         setQuantity(q => (q > matchedVariant.stock ? matchedVariant.stock : q));
//       } else {
//         setVariantStock(null);
//         setVariantPrice(null);
//       }
//     } else {
//       setVariantStock(null);
//       setVariantPrice(null);
//       setQuantity(1);
//     }
//   }, [selectedColor, selectedSize, product?.variants]);

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;
//   if (!product) return <div className="text-center py-10">Product not found</div>;

//   const discountedPrice =
//     variantPrice !== null
//       ? variantPrice
//       : product.price - ((product.discount || 0) * product.price) / 100;

//   const mainImage = selectedImage || product.images?.[0]?.url || "/placeholder.jpg";

//   const increaseQty = () => {
//     if (variantStock !== null && quantity < variantStock) setQuantity(q => q + 1);
//     else if (variantStock === null && quantity < product.stock) setQuantity(q => q + 1);
//   };

//   const decreaseQty = () => {
//     if (quantity > 1) setQuantity(q => q - 1);
//   };

//   const handleAddToCart = () => {
//     if (!selectedColor || !selectedSize) {
//       alert("Please select color and size");
//       return;
//     }
//     if (variantStock <= 0) {
//       alert("Selected variant is out of stock");
//       return;
//     }
//     const cartItem = {
//       productId: product.id,
//       name: product.name,
//       color: selectedColor,
//       size: selectedSize,
//       price: variantPrice || discountedPrice,
//       quantity,
//       image: mainImage,
//     };
//     console.log("Add to Cart:", cartItem);
//     alert("Added to cart! Check console for data.");
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
//       {/* Product Images */}
//       <div className="space-y-4">
//         <div className="relative w-full h-[400px] rounded-xl overflow-hidden border">
//           <Image
//             src={mainImage}
//             alt={product.name}
//             fill
//             className="object-cover transition-all duration-300"
//           />
//         </div>

//         {product.images?.length > 1 && (
//           <div className="flex gap-2 overflow-x-auto">
//             {product.images.map((img, i) => (
//               <div
//                 key={i}
//                 onClick={() => setSelectedImage(img.url)}
//                 className={`relative w-20 h-20 cursor-pointer rounded overflow-hidden border-2 ${
//                   mainImage === img.url ? "border-amber-500" : "border-gray-300"
//                 }`}
//               >
//                 <Image src={img.url} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{product.name}</h1>

//         <div className="flex items-center gap-2 text-sm text-amber-500">
//           <FaStar />
//           <span>{product.rating?.toFixed(1) || "N/A"}</span>
//           {product.reviewCount && (
//             <span className="text-gray-500 dark:text-gray-400 ml-2">
//               ({product.reviewCount} reviews)
//             </span>
//           )}
//         </div>

//         {/* Price */}
//         <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//           <span className="text-amber-600">${discountedPrice.toFixed(2)}</span>
//           {product.discount > 0 && variantPrice === null && (
//             <>
//               <span className="ml-3 line-through text-red-500">${product.price.toFixed(2)}</span>
//               <span className="ml-2 text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
//                 -{product.discount}%
//               </span>
//             </>
//           )}
//         </div>

//         {/* Color Selector */}
//         {colors.length > 0 && (
//           <div>
//             <span className="font-medium text-sm">Color:</span>
//             <div className="flex gap-2 mt-2">
//               {colors.map((color, idx) => {
//                 const hasStock = product.variants.some(v => v.color === color && v.stock > 0);
//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => hasStock && setSelectedColor(color)}
//                     className={`w-8 h-8 rounded-full border-2 transition ${
//                       selectedColor === color ? "border-amber-500 scale-110" : "border-gray-300"
//                     } ${!hasStock ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
//                     style={{ backgroundColor: color }}
//                     disabled={!hasStock}
//                     title={color}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Size Selector */}
//         {selectedColor && sizes.length > 0 && (
//           <div>
//             <span className="font-medium text-sm">Size:</span>
//             <div className="flex gap-2 mt-2">
//               {sizes.map((size, idx) => {
//                 const variantForSize = product.variants.find(
//                   v => v.color === selectedColor && v.size === size
//                 );
//                 const stock = variantForSize?.stock || 0;

//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => stock > 0 && setSelectedSize(size)}
//                     className={`px-3 py-1 border rounded-md text-sm transition ${
//                       selectedSize === size
//                         ? "bg-amber-500 text-white border-amber-500"
//                         : "border-gray-300 hover:border-amber-400"
//                     } ${stock <= 0 ? "opacity-40 cursor-not-allowed" : ""}`}
//                     disabled={stock <= 0}
//                     title={`${size} ${stock <= 0 ? "(Out of stock)" : ""}`}
//                   >
//                     {size}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Stock Info */}
//         <div className="text-sm text-gray-700 dark:text-gray-300">
//           Stock:{" "}
//           {variantStock !== null ? (
//             variantStock > 0 ? (
//               <span className="text-green-600 font-semibold">{variantStock} available</span>
//             ) : (
//               <span className="text-red-500 font-semibold">Out of stock</span>
//             )
//           ) : product.stock > 0 ? (
//             <span className="text-green-600 font-semibold">{product.stock} available</span>
//           ) : (
//             <span className="text-red-500 font-semibold">Out of stock</span>
//           )}
//         </div>

//         {/* Quantity Selector */}
//         <div className="flex items-center gap-4 mt-4">
//           <span className="text-sm font-medium">Quantity:</span>
//           <div className="flex items-center border rounded-full px-3 py-1 bg-white dark:bg-gray-900">
//             <button
//               onClick={decreaseQty}
//               className="px-2 text-xl font-bold text-amber-600 hover:scale-110"
//               disabled={quantity <= 1}
//             >
//               −
//             </button>
//             <span className="px-4 text-lg font-semibold">{quantity}</span>
//             <button
//               onClick={increaseQty}
//               className="px-2 text-xl font-bold text-amber-600 hover:scale-110"
//               disabled={variantStock !== null ? quantity >= variantStock : quantity >= product.stock}
//             >
//               +
//             </button>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4 pt-4">
//           <button
//             onClick={handleAddToCart}
//             disabled={variantStock !== null ? variantStock <= 0 : product.stock <= 0}
//             className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full transition disabled:opacity-50"
//           >
//             Add to Cart
//           </button>
//           <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white px-6 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//             Add to Wishlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// "use client";

// import { useGetProductById } from "@/src/hooks/product.hook";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { FaStar } from "react-icons/fa";
// import { useState, useMemo, useEffect, useCallback } from "react";

// // ================== TYPES ==================
// interface ProductSize {
//   size: string;
//   stock: number;
//   price?: number;
// }

// interface ProductVariant {
//   color: string;
//   price?: number;
//   sizes: ProductSize[];
// }

// interface ProductImage {
//   url: string;
// }

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   discount?: number;
//   rating?: number;
//   reviewCount?: number;
//   stock: number;
//   variants?: ProductVariant[];
//   images?: ProductImage[];
// }

// const ProductDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data: productData, isLoading } = useGetProductById(id);
//   const product: Product | undefined = productData?.data;

//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [variantStock, setVariantStock] = useState<number | null>(null);
//   const [variantPrice, setVariantPrice] = useState<number | null>(null);

//   // ===== Colors with stock > 0 =====
//   const colors = useMemo(() => {
//     if (!product?.variants) return [];
//     return Array.from(
//       new Set(
//         product.variants
//           .filter(v => v.sizes?.some(size => size.stock > 0))
//           .map(v => v.color)
//       )
//     );
//   }, [product?.variants]);

//   // ===== Sizes for selectedColor =====
//   const sizes = useMemo(() => {
//     if (!product?.variants || !selectedColor) return [];
//     const variant = product.variants.find(v => v.color === selectedColor);
//     return variant?.sizes.filter(s => s.stock > 0).map(s => s.size) || [];
//   }, [product?.variants, selectedColor]);

//   // ===== Update Stock & Price on Selection =====
//   useEffect(() => {
//     if (selectedColor && selectedSize && product?.variants) {
//       const variant = product.variants.find(v => v.color === selectedColor);
//       const sizeObj = variant?.sizes.find(s => s.size === selectedSize);
//       if (sizeObj) {
//         setVariantStock(sizeObj.stock);
//         setVariantPrice(sizeObj.price ?? variant?.price ?? null);
//         setQuantity(q => (q > sizeObj.stock ? sizeObj.stock : q));
//         return;
//       }
//     }
//     setVariantStock(null);
//     setVariantPrice(null);
//     setQuantity(1);
//   }, [selectedColor, selectedSize, product?.variants]);

//   // ===== Derived Values =====
//   const discountedPrice = useMemo(() => {
//     if (variantPrice !== null) return variantPrice;
//     if (!product) return 0;
//     return product.price - ((product.discount || 0) * product.price) / 100;
//   }, [variantPrice, product]);

//   const mainImage = useMemo(() => {
//     return selectedImage || product?.images?.[0]?.url || "/placeholder.jpg";
//   }, [selectedImage, product?.images]);

//   // ===== Quantity Handlers =====
//   const increaseQty = useCallback(() => {
//     if (variantStock !== null && quantity < variantStock) {
//       setQuantity(q => q + 1);
//     } else if (variantStock === null && product && quantity < product.stock) {
//       setQuantity(q => q + 1);
//     }
//   }, [variantStock, quantity, product]);

//   const decreaseQty = useCallback(() => {
//     if (quantity > 1) setQuantity(q => q - 1);
//   }, [quantity]);

//   // ===== Cart Handler =====
//   const handleAddToCart = useCallback(() => {
//     if (!product || !selectedColor || !selectedSize) {
//       alert("Please select color and size");
//       return;
//     }
//     if (variantStock !== null && variantStock <= 0) {
//       alert("Selected variant is out of stock");
//       return;
//     }
//     const cartItem = {
//       productId: product.id,
//       name: product.name,
//       color: selectedColor,
//       size: selectedSize,
//       price: variantPrice || discountedPrice,
//       quantity,
//       image: mainImage,
//     };
//     console.log("Add to Cart:", cartItem);
//     alert("Added to cart!");
//   }, [product, selectedColor, selectedSize, variantStock, variantPrice, discountedPrice, quantity, mainImage]);

//   // ===== Loading & Empty State =====
//   if (isLoading) return <div className="text-center py-10">Loading...</div>;
//   if (!product) return <div className="text-center py-10">Product not found</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
//       {/* Product Images */}
//       <div className="space-y-4">
//         <div className="relative w-full h-[400px] rounded-xl overflow-hidden border">
//           <Image src={mainImage} alt={product.name} fill className="object-cover" />
//         </div>
//         {product.images && product.images.length > 1 && (
//           <div className="flex gap-2 overflow-x-auto">
//             {product.images.map((img, i) => (
//               <div
//                 key={i}
//                 onClick={() => setSelectedImage(img.url)}
//                 className={`relative w-20 h-20 cursor-pointer rounded overflow-hidden border-2 ${
//                   mainImage === img.url ? "border-amber-500" : "border-gray-300"
//                 }`}
//               >
//                 <Image src={img.url} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="space-y-6">
//         {/* Title */}
//         <h1 className="text-3xl font-bold">{product.name}</h1>

//         {/* Rating */}
//         <div className="flex items-center gap-2 text-sm text-amber-500">
//           <FaStar />
//           <span>{product.rating?.toFixed(1) || "N/A"}</span>
//           {product.reviewCount && <span className="text-gray-500">({product.reviewCount} reviews)</span>}
//         </div>

//         {/* Price */}
//         <div className="text-xl font-semibold">
//           <span className="text-amber-600">${discountedPrice.toFixed(2)}</span>
//           {product.discount && variantPrice === null && (
//             <>
//               <span className="ml-3 line-through text-red-500">${product.price.toFixed(2)}</span>
//               <span className="ml-2 text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
//                 -{product.discount}%
//               </span>
//             </>
//           )}
//         </div>

//         {/* Colors */}
//         {colors.length > 0 && (
//           <div>
//             <span className="font-medium text-sm">Color:</span>
//             <div className="flex gap-2 mt-2">
//               {colors.map((color, idx) => {
//                 const hasStock = product.variants?.some(v => v.color === color && v.sizes.some(s => s.stock > 0));
//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => hasStock && setSelectedColor(color)}
//                     style={{ backgroundColor: color }}
//                     className={`w-8 h-8 rounded-full border-2 ${
//                       selectedColor === color ? "border-amber-500 scale-110" : "border-gray-300"
//                     } ${!hasStock ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
//                     disabled={!hasStock}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Sizes */}
//         {selectedColor && sizes.length > 0 && (
//           <div>
//             <span className="font-medium text-sm">Size:</span>
//             <div className="flex gap-2 mt-2">
//               {sizes.map((size, idx) => {
//                 const variant = product.variants?.find(v => v.color === selectedColor);
//                 const stock = variant?.sizes.find(s => s.size === size)?.stock || 0;
//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => stock > 0 && setSelectedSize(size)}
//                     className={`px-3 py-1 border rounded-md text-sm ${
//                       selectedSize === size ? "bg-amber-500 text-white border-amber-500" : "border-gray-300 hover:border-amber-400"
//                     } ${stock <= 0 ? "opacity-40 cursor-not-allowed" : ""}`}
//                     disabled={stock <= 0}
//                   >
//                     {size}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Stock Info */}
//         <div className="text-sm">
//           Stock:{" "}
//           {variantStock !== null
//             ? variantStock > 0
//               ? `${variantStock} available`
//               : "Out of stock"
//             : product.stock > 0
//             ? `${product.stock} available`
//             : "Out of stock"}
//         </div>

//         {/* Quantity */}
//         <div className="flex items-center gap-4 mt-4">
//           <span className="text-sm font-medium">Quantity:</span>
//           <div className="flex items-center border rounded-full px-3 py-1">
//             <button onClick={decreaseQty} disabled={quantity <= 1} className="px-2 text-xl">
//               −
//             </button>
//             <span className="px-4">{quantity}</span>
//             <button
//               onClick={increaseQty}
//               disabled={variantStock !== null ? quantity >= variantStock : quantity >= product.stock}
//               className="px-2 text-xl"
//             >
//               +
//             </button>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4 pt-4">
//           <button
//             onClick={handleAddToCart}
//             disabled={variantStock !== null ? variantStock <= 0 : product.stock <= 0}
//             className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-full disabled:opacity-50"
//           >
//             Add to Cart
//           </button>
//           <button className="border px-6 py-2 rounded-full hover:bg-gray-100">Add to Wishlist</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// "use client";
// import { useState, useMemo } from "react";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from "@/src/redux/store";
// import { addToCart } from "@/src/redux/features/cartSlice";
// import { useParams } from "next/navigation";
// import { useGetProductById } from "@/src/hooks/product.hook";

// export default function ProductDetails() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { id } = useParams();
//   const { data: productData, isLoading } = useGetProductById(id);

//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);

//   const product = productData?.data;

//   // Always define hooks before any conditional return
//   const colors = useMemo(
//     () =>
//       Array.from(
//         new Set(product?.variants?.map((v) => v.color).filter(Boolean))
//       ) as string[],
//     [product?.variants]
//   );

//   const sizes = useMemo(
//     () =>
//       Array.from(
//         new Set(product?.variants?.map((v) => v.size).filter(Boolean))
//       ) as string[],
//     [product?.variants]
//   );

//   const selectedVariant = useMemo(
//     () =>
//       product?.variants.find(
//         (v) => v.color === selectedColor && v.size === selectedSize
//       ),
//     [product?.variants, selectedColor, selectedSize]
//   );

//   if (isLoading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (!product) {
//     return <div className="text-center py-10">Product not found</div>;
//   }

//   const handleAddToCart = () => {
//     if (!selectedColor || !selectedSize) {
//       alert("Please select color and size!");
//       return;
//     }
//     if (!selectedVariant) {
//       alert("Selected variant not available!");
//       return;
//     }
//     if (quantity > selectedVariant.stock) {
//       alert("Not enough stock!");
//       return;
//     }

//     dispatch(
//       addToCart({
//         id: `${product.id}-${selectedColor}-${selectedSize}`,
//         productId: product.id,
//         name: product.name,
//         color: selectedColor,
//         size: selectedSize,
//         price: selectedVariant.price || product.basePrice,
//         quantity,
//         image: product.image,
//       })
//     );
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-64 object-cover rounded-xl"
//       />
//       <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
//       <p className="text-lg font-semibold mt-2 text-green-600">
//         ৳ {selectedVariant?.price || product.basePrice}
//       </p>
//       {selectedVariant && (
//         <p className="text-sm mt-1 text-gray-500">
//           Stock: {selectedVariant.stock}
//         </p>
//       )}

//       {/* Color Selector */}
//       <div className="mt-4">
//         <h3 className="font-semibold mb-2">Color:</h3>
//         <div className="flex gap-2">
//           {colors.map((color) => (
//             <button
//               key={color}
//               className={`w-8 h-8 rounded-full border-2 ${
//                 selectedColor === color ? "border-black" : "border-gray-300"
//               }`}
//               style={{ backgroundColor: color }}
//               onClick={() => setSelectedColor(color)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Size Selector */}
//       <div className="mt-4">
//         <h3 className="font-semibold mb-2">Size:</h3>
//         <div className="flex gap-2">
//           {sizes.map((size) => (
//             <button
//               key={size}
//               className={`px-4 py-2 border rounded ${
//                 selectedSize === size
//                   ? "bg-black text-white"
//                   : "bg-white text-black"
//               }`}
//               onClick={() => setSelectedSize(size)}
//             >
//               {size}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Quantity Selector */}
//       <div className="mt-4 flex items-center gap-3">
//         <button
//           onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//           className="px-3 py-1 border rounded"
//         >
//           -
//         </button>
//         <span>{quantity}</span>
//         <button
//           onClick={() =>
//             setQuantity((q) =>
//               selectedVariant ? Math.min(selectedVariant.stock, q + 1) : q + 1
//             )
//           }
//           className="px-3 py-1 border rounded"
//         >
//           +
//         </button>
//       </div>

//       <button
//         onClick={handleAddToCart}
//         className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// "use client";

// import { useGetProductById } from "@/src/hooks/product.hook";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { FaStar } from "react-icons/fa";
// import { useState, useMemo, useEffect } from "react";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { data: productData, isLoading } = useGetProductById(id);
//   const product = productData?.data;
// console.log(product)
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [variantStock, setVariantStock] = useState(null);
//   const [variantPrice, setVariantPrice] = useState(null);

//   // Unique color গুলো বের করা (stock > 0 থাকা)
//   const colors = useMemo(() => {
//     if (!product?.variants) return [];
//     const uniqueColors = [
//       ...new Set(
//         product.variants
//           .filter((v) => v.stock > 0 && v.color)
//           .map((v) => v.color)
//       ),
//     ];
//     return uniqueColors;
//   }, [product?.variants]);
//   const clr =product?.variants.map(item => item.color)
//   console.log(clr)
// console.log({colors})
//   // Unique size গুলো বের করা (selectedColor এর উপর ভিত্তি করে)
//   const sizes = useMemo(() => {
//     if (!product?.variants || !selectedColor) return [];
//     const filteredSizes = product.variants.size
//       .filter(v => v.color === selectedColor && v.size)
//       .map(v => v.size);

//     return [...new Set(filteredSizes)]; // Unique sizes
//   }, [product?.variants, selectedColor]);
// console.log(sizes)
//   // যখন color এবং size সিলেক্ট হবে, তখন variant stock এবং price সেট করা
//   useEffect(() => {
//     if (selectedColor && selectedSize) {
//       const matchedVariant = product.variants.find(
//         (v) => v.color === selectedColor && v.size === selectedSize
//       );
//       if (matchedVariant) {
//         setVariantStock(matchedVariant.stock);
//         setVariantPrice(matchedVariant.price);
//         setQuantity(q => (q > matchedVariant.stock ? matchedVariant.stock : q));
//       } else {
//         setVariantStock(null);
//         setVariantPrice(null);
//       }
//     } else {
//       setVariantStock(null);
//       setVariantPrice(null);
//       setQuantity(1);
//     }
//   }, [selectedColor, selectedSize, product?.variants]);

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;
//   if (!product) return <div className="text-center py-10">Product not found</div>;

//   const discountedPrice =
//     variantPrice !== null
//       ? variantPrice
//       : product.price - ((product.discount || 0) * product.price) / 100;

//   const mainImage = selectedImage || product.images?.[0]?.url || "/placeholder.jpg";

//   const increaseQty = () => {
//     if (variantStock !== null && quantity < variantStock) setQuantity(q => q + 1);
//     else if (variantStock === null && quantity < product.stock) setQuantity(q => q + 1);
//   };

//   const decreaseQty = () => {
//     if (quantity > 1) setQuantity(q => q - 1);
//   };

//   const handleAddToCart = () => {
//     if (!selectedColor || !selectedSize) {
//       alert("Please select color and size");
//       return;
//     }
//     if (variantStock <= 0) {
//       alert("Selected variant is out of stock");
//       return;
//     }
//     const cartItem = {
//       productId: product.id,
//       name: product.name,
//       color: selectedColor,
//       size: selectedSize,
//       price: variantPrice || discountedPrice,
//       quantity,
//       image: mainImage,
//     };
//     console.log("Add to Cart:", cartItem);
//     alert("Added to cart! Check console for data.");
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
//       {/* Product Images */}
//       <div className="space-y-4">
//         <div className="relative w-full h-[400px] rounded-xl overflow-hidden border">
//           <Image
//             src={mainImage}
//             alt={product.name}
//             fill
//             className="object-cover transition-all duration-300"
//           />
//         </div>

//         {product.images?.length > 1 && (
//           <div className="flex gap-2 overflow-x-auto">
//             {product.images.map((img, i) => (
//               <div
//                 key={i}
//                 onClick={() => setSelectedImage(img.url)}
//                 className={`relative w-20 h-20 cursor-pointer rounded overflow-hidden border-2 ${
//                   mainImage === img.url ? "border-amber-500" : "border-gray-300"
//                 }`}
//               >
//                 <Image src={img.url} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{product.name}</h1>

//         <div className="flex items-center gap-2 text-sm text-amber-500">
//           <FaStar />
//           <span>{product.rating?.toFixed(1) || "N/A"}</span>
//           {product.reviewCount && (
//             <span className="text-gray-500 dark:text-gray-400 ml-2">
//               ({product.reviewCount} reviews)
//             </span>
//           )}
//         </div>

//         {/* Price */}
//         <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//           <span className="text-amber-600">${discountedPrice.toFixed(2)}</span>
//           {product.discount > 0 && variantPrice === null && (
//             <>
//               <span className="ml-3 line-through text-red-500">${product.price.toFixed(2)}</span>
//               <span className="ml-2 text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
//                 -{product.discount}%
//               </span>
//             </>
//           )}
//         </div>

//         {/* Color Selector */}
//         {colors.length > 0 && (
//           <div>
//             <span className="font-medium text-sm">Color:</span>
//             <div className="flex gap-2 mt-2">
//               {colors.map((color, idx) => {
//                 const hasStock = product.variants.some(v => v.color === color && v.stock > 0);
//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => hasStock && setSelectedColor(color)}
//                     className={`w-8 h-8 rounded-full border-2 transition ${
//                       selectedColor === color ? "border-amber-500 scale-110" : "border-gray-300"
//                     } ${!hasStock ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
//                     style={{ backgroundColor: color }}
//                     disabled={!hasStock}
//                     title={color}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Size Selector */}
//         {selectedColor && sizes.length > 0 && (
//           <div>
//             <span className="font-medium text-sm">Size:</span>
//             <div className="flex gap-2 mt-2">
//               {sizes.map((size, idx) => {
//                 const variantForSize = product.variants.find(
//                   v => v.color === selectedColor && v.size === size
//                 );
//                 const stock = variantForSize?.stock || 0;

//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => stock > 0 && setSelectedSize(size)}
//                     className={`px-3 py-1 border rounded-md text-sm transition ${
//                       selectedSize === size
//                         ? "bg-amber-500 text-white border-amber-500"
//                         : "border-gray-300 hover:border-amber-400"
//                     } ${stock <= 0 ? "opacity-40 cursor-not-allowed" : ""}`}
//                     disabled={stock <= 0}
//                     title={`${size} ${stock <= 0 ? "(Out of stock)" : ""}`}
//                   >
//                     {size}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Stock Info */}
//         <div className="text-sm text-gray-700 dark:text-gray-300">
//           Stock:{" "}
//           {variantStock !== null ? (
//             variantStock > 0 ? (
//               <span className="text-green-600 font-semibold">{variantStock} available</span>
//             ) : (
//               <span className="text-red-500 font-semibold">Out of stock</span>
//             )
//           ) : product.stock > 0 ? (
//             <span className="text-green-600 font-semibold">{product.stock} available</span>
//           ) : (
//             <span className="text-red-500 font-semibold">Out of stock</span>
//           )}
//         </div>

//         {/* Quantity Selector */}
//         <div className="flex items-center gap-4 mt-4">
//           <span className="text-sm font-medium">Quantity:</span>
//           <div className="flex items-center border rounded-full px-3 py-1 bg-white dark:bg-gray-900">
//             <button
//               onClick={decreaseQty}
//               className="px-2 text-xl font-bold text-amber-600 hover:scale-110"
//               disabled={quantity <= 1}
//             >
//               −
//             </button>
//             <span className="px-4 text-lg font-semibold">{quantity}</span>
//             <button
//               onClick={increaseQty}
//               className="px-2 text-xl font-bold text-amber-600 hover:scale-110"
//               disabled={variantStock !== null ? quantity >= variantStock : quantity >= product.stock}
//             >
//               +
//             </button>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4 pt-4">
//           <button
//             onClick={handleAddToCart}
//             disabled={variantStock !== null ? variantStock <= 0 : product.stock <= 0}
//             className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full transition disabled:opacity-50"
//           >
//             Add to Cart
//           </button>
//           <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white px-6 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//             Add to Wishlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// "use client";

// import { useGetProductById } from "@/src/hooks/product.hook";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { FaStar } from "react-icons/fa";
// import { useState, useMemo } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/src/redux/features/cartSlice";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { data: productData, isLoading } = useGetProductById(id);
//   const product = productData?.data;

//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");

//   const dispatch = useDispatch();

//   const colors = useMemo(() => {
//     if (!product?.variants) return [];
//     return [...new Set(product.variants.map(v => v.color).filter(Boolean))];
//   }, [product?.variants]);

//   const sizes = useMemo(() => {
//     if (!product?.variants) return [];
//     return [...new Set(product.variants.map(v => v.size).filter(Boolean))];
//   }, [product?.variants]);

//   // Selected variant info
//   const selectedVariant = useMemo(() => {
//     return product?.variants.find(
//       v => v.color === selectedColor && v.size === selectedSize
//     );
//   }, [selectedColor, selectedSize, product?.variants]);

//   const price = selectedVariant?.price ?? product?.price ?? 0;
//   const stock = selectedVariant?.stock ?? product?.stock ?? 0;

//   const mainImage = selectedImage || product?.images?.[0]?.url || "/placeholder.jpg";

//   const increaseQty = () => {
//     if (quantity < stock) setQuantity(q => q + 1);
//   };
//   const decreaseQty = () => {
//     if (quantity > 1) setQuantity(q => q - 1);
//   };

//   const handleAddToCart = () => {
//     if (!product) return;
//     dispatch(
//       addToCart({
//         productId: product.id,
//         name: product.name,
//         price,
//         quantity,
//         color: selectedColor,
//         size: selectedSize,
//         stock,
//         image: mainImage,
//       })
//     );
//   };

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;
//   if (!product) return <div className="text-center py-10">Product not found</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
//       {/* Left: Images */}
//       <div className="space-y-4">
//         <div className="relative w-full h-[400px] rounded-xl overflow-hidden border">
//           <Image src={mainImage} alt={product.name} fill className="object-cover" />
//         </div>
//         {product.images?.length > 1 && (
//           <div className="flex gap-2 overflow-x-auto">
//             {product.images.map((img, i) => (
//               <div
//                 key={i}
//                 onClick={() => setSelectedImage(img.url)}
//                 className={`relative w-20 h-20 cursor-pointer rounded overflow-hidden border-2 ${
//                   mainImage === img.url ? "border-amber-500" : "border-gray-300"
//                 }`}
//               >
//                 <Image src={img.url} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Right: Info */}
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold">{product.name}</h1>

//         <div className="flex items-center gap-2 text-sm text-amber-500">
//           <FaStar />
//           <span>{product.rating?.toFixed(1) || "N/A"}</span>
//           {product.reviewCount && <span>({product.reviewCount} reviews)</span>}
//         </div>

//         {/* Price */}
//         <div className="text-2xl font-semibold text-amber-600">${price.toFixed(2)}</div>

//         {/* Color Selector */}
//         {colors.length > 0 && (
//           <div>
//             <span className="font-medium text-sm">Color:</span>
//             <div className="flex gap-2 mt-2">
//               {colors.map((color, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedColor(color)}
//                   className={`w-8 h-8 rounded-full border-2 ${
//                     selectedColor === color ? "border-amber-500 scale-110" : "border-gray-300"
//                   }`}
//                   style={{ backgroundColor: color }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Size Selector */}
//         {sizes.length > 0 && (
//           <div>
//             <span className="font-medium text-sm">Size:</span>
//             <div className="flex gap-2 mt-2">
//               {sizes.map((size, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-3 py-1 border rounded-md text-sm ${
//                     selectedSize === size ? "bg-amber-500 text-white" : "border-gray-300"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Stock Info */}
//         <div>Stock: {stock > 0 ? `${stock} available` : "Out of stock"}</div>

//         {/* Quantity Selector */}
//         <div className="flex items-center gap-4">
//           <span>Quantity:</span>
//           <div className="flex items-center border rounded-full px-3 py-1">
//             <button onClick={decreaseQty}>−</button>
//             <span className="px-4">{quantity}</span>
//             <button onClick={increaseQty} disabled={quantity >= stock}>
//               +
//             </button>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-4">
//           <button
//             disabled={stock <= 0}
//             onClick={handleAddToCart}
//             className="bg-amber-500 text-white px-6 py-2 rounded-full"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// prodctdetails page
