"use client";

import Image from "next/image";
import { FC } from "react";

interface SmallCardProps {
   product: {
    id: string;
    name: string;
    price: number;
    discount?: number;
    stock: number;
    rating?: number;
    brand: { name: string };
    images: { url: string }[];
    description?: string;
  };
}

const SmallCard: FC<SmallCardProps> = ({ product}) => {
    const { price, discount = 0 } = product;
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;
  return (
    <div className="bg-white shadow rounded-lg flex gap-3 p-3 hover:shadow-lg transition">
      {/* Image */}
      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">
        {product.images?.[0] ? (
          <Image
            src={product?.images[0]?.url}
            width={80}
            height={80}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-xs">No Image</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
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
           {discount > 0 && (
            <span className="ml-2 text-green-500 text-sm">
              -${product?.discount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
