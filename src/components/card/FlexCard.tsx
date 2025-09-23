"use client";

import { FC } from "react";
import Image from "next/image";

interface FlexCardProps {
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

const FlexCard: FC<FlexCardProps> = ({ product }) => {
  const { price, discount = 0 } = product;
  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <div className="h-48 bg-gray-100 relative">
        {product.images?.[0]?.url ? (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-gray-400">
            No Image
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        {product.description && (
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
        )}

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

        <div className="mt-1 text-sm text-gray-500">Stock: {product.stock}</div>

        <button className="w-full mt-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
          Details
        </button>
      </div>
    </div>
  );
};

export default FlexCard;
