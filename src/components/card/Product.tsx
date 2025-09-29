// "use client";
// import { Button } from "@heroui/button";
//  // Optional, use normal button if not using Hero U
//  import { FaStar } from "react-icons/fa";
// import Image from "next/image";

// interface ProductCardProps {
//   product: {
//     id: string;
//     name: string;
//     price: number;
//     discount?: number;
//     stock: number;
//     rating?: number;
//     brand: {
//       name: string;
//     };
//     images: { url: string }[];
//   };
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const discountedPrice = product.discount
//     ? product.price - (product.price * product.discount) / 100
//     : product.price;

//   return (
//     <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
//       {/* Product Image */}
//       <div className="relative w-full h-52">
//         <Image
//           src={product.images?.[0]?.url || "/placeholder.jpg"}
//           alt={product.name}
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Product Info */}
//       <div className="p-4 space-y-2">
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
//           {product.name}
//         </h3>

//         {/* Price */}
//         <div className="text-sm text-gray-600 dark:text-gray-300">
//           <span className="font-bold text-lg text-primary">
//             ${discountedPrice.toFixed(2)}
//           </span>
//           {product.discount && (
//             <span className="line-through ml-2 text-red-500 text-sm">
//               ${product.price.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* Rating & Stock */}
//         <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//           <div className="flex items-center gap-1">
//             <FaStar
//             className="text-yellow-400" />
//             <span>{product.rating?.toFixed(1) || "N/A"}</span>
//           </div>
//           <span>
//             {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
//           </span>
//         </div>

//         {/* Brand */}
//         <p className="text-xs text-gray-500">Brand: {product.brand.name}</p>

//         {/* Action Button */}
//         <div className="pt-3">
//           <Button
//             as="a"
//             href={`/product/${product.id}`}
//             color="primary"
//             fullWidth
//             radius="full"
//           >
//             View Details
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

"use client";

import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
  const { price, discount = 0 } = product;
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="bg-white dark:bg-gray-900 border border-amber-100 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ">
      {/* Product Image */}

      <div className="relative  h-[250px]">
        <Image
          fill
          alt={product.name}
          className="object-cover "
          src={product.images?.[0]?.url || "/placeholder.jpg"}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
            -{discount}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-bold text-lg text-amber-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="line-through ml-2 text-red-500 text-sm">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating & Stock */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FaStar className="text-amber-400" />
            <span>{product.rating?.toFixed(1) || "N/A"}</span>
          </div>
          <span>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Brand */}
        <p className="text-xs text-gray-500">Brand: {product?.brand?.name}</p>

        {/* Action Button */}
        <div className="pt-3">
          <Link
            className="block text-center bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-full transition"
            href={`/product/${product.id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
