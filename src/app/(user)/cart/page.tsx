// "use client";

// import React, { useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/src/redux/store";
// import {
//   removeFromCart,
//   updateQuantity,
//   clearCart,
//   CartItem,
// } from "@/src/redux/features/cartSlice";
// import Link from "next/link";

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.card.items);

//   const totalPrice = React.useMemo(
//     () =>
//       cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
//     [cartItems]
//   );

//   const handleRemove = useCallback(
//     (id: string) => {
//       dispatch(removeFromCart(id));
//     },
//     [dispatch]
//   );

//   const handleQuantityChange = useCallback(
//     (id: string, quantity: number) => {
//       if (quantity < 1) return;
//       dispatch(updateQuantity({ id, quantity }));
//     },
//     [dispatch]
//   );

//   const handleClearCart = useCallback(() => {
//     dispatch(clearCart());
//   }, [dispatch]);

//   if (!cartItems.length) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 text-center">
//         <h2 className="text-2xl font-semibold mb-3 text-amber-600">
//           Your cart is empty 🛒
//         </h2>
//         <p className="text-gray-600">Add products to start shopping.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4 pb-28">
//       <h1 className="text-3xl font-bold mb-6 text-amber-700">Shopping Cart</h1>

//       <div className="flex flex-col gap-3">
//         {cartItems.map((item: CartItem) => (
//           <div
//             key={item.id}
//             className="flex items-center bg-white border border-amber-100 shadow-sm rounded-lg p-2 gap-2 sm:p-3 hover:shadow-md transition-all"
//           >
//             {/* Product Image */}
//             <img
//               src={item.image || "/placeholder.png"}
//               alt={item.name}
//               className="w-12 h-12 sm:w-20 sm:h-20 object-contain rounded border border-gray-200 flex-shrink-0"
//               loading="lazy"
//             />

//             {/* Product Details */}
//             <div className="flex-1 min-w-0">
//               <h3 className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
//                 {item.name}
//               </h3>
//               <p className="hidden sm:block text-xs text-gray-500 truncate">
//                 Color: <span className="font-medium">{item.color}</span> | Size:{" "}
//                 <span className="font-medium">{item.size}</span>
//               </p>
//               <p className="text-xs sm:text-sm text-amber-700 font-semibold">
//                 ৳{item.price.toFixed(2)}
//               </p>
//             </div>

//             {/* Quantity Control */}
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={() =>
//                   handleQuantityChange(item.id, item.quantity - 1)
//                 }
//                 className="px-1.5 py-0.5 border border-amber-300 rounded text-xs hover:bg-amber-100 disabled:opacity-50"
//                 disabled={item.quantity <= 1}
//               >
//                 −
//               </button>
//               <input
//                 type="number"
//                 min={1}
//                 value={item.quantity}
//                 onChange={(e) =>
//                   handleQuantityChange(item.id, Number(e.target.value))
//                 }
//                 className="w-8 sm:w-10 text-center border border-gray-300 rounded text-xs focus:border-amber-400 focus:ring-2 focus:ring-amber-300 outline-none"
//               />
//               <button
//                 onClick={() =>
//                   handleQuantityChange(item.id, item.quantity + 1)
//                 }
//                 className="px-1.5 py-0.5 border border-amber-300 rounded text-xs hover:bg-amber-100"
//               >
//                 +
//               </button>
//             </div>

//             {/* Price */}
//             <div className="font-bold text-amber-600 text-xs sm:text-sm w-12 sm:w-16 text-right">
//               ৳{(item.price * item.quantity).toFixed(0)}
//             </div>

//             {/* Remove */}
//             <button
//               onClick={() => handleRemove(item.id)}
//               className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-bold px-1"
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Total Bar */}
//       <div className="fixed bottom-0 left-0 w-full bg-white border-t border-amber-200 shadow-lg p-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 z-50">
//         <div className="text-lg sm:text-xl font-bold text-gray-800">
//           Total: <span className="text-amber-600">৳{totalPrice.toFixed(2)}</span>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={handleClearCart}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm text-sm sm:text-base"
//           >
//             Clear
//           </button>
//          <Link href='/checkout'>
//           <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm text-sm sm:text-base">
//             Checkout
//           </button>
//          </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import {
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaCheck,
  FaShoppingBag,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  useGetCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
} from "@/src/hooks/cart.hook";
import EmptyCart from "@/src/components/EmptyCartComponent";

export default function CartPage() {
  const { data, isLoading } = useGetCart();
  const { mutate: updateQty } = useUpdateCartItem();
  const { mutate: removeItem } = useRemoveCartItem();
  const router = useRouter();
  const { mutate: clearAll } = useClearCart();

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;

  const items = (data as { items: any[] })?.items ?? [];

  const totalPrice = items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className=" min-h-[70vh] mx-auto p-6 dark:bg-gray-900">
      <div className="w-full flex justify-between items-center mb-6">
        {/* Left: Cart Title */}
        <h1 className="flex items-center gap-2 text-2xl font-bold text-amber-600">
          <FaShoppingCart className="text-amber-500" />
          Your Cart
        </h1>

        {/* Right: Continue Shopping */}
        <Link
          className="flex items-center gap-2 text-lg font-medium text-amber-600 hover:text-amber-700 transition-colors"
          href="/shop"
        >
          <FaShoppingBag className="text-amber-500" />
          Continue Shopping
        </Link>
      </div>

      {!items.length && <EmptyCart onShopNow={() => router.push("/product")} />}

      <div className="space-y-4">
        {items?.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between border border-amber-300  rounded-xl p-4 shadow-sm bg-white"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <Image
                alt={item?.product?.name}
                className="w-20 h-20 object-content rounded-md border border-amber-200"
                height={40}
                src={
                  item.product.category.image ||
                  "https://via.placeholder.com/80"
                }
                width={30}
              />
              <div>
                <h2 className="font-semibold text-lg text-amber-700">
                  {item.product.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {item.variant?.color && <>Color: {item.variant.color}, </>}
                  Size: {item.sizeStock?.size}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  ৳{item.price}
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button
                className="p-2 border border-amber-300 rounded-full hover:bg-amber-100 disabled:opacity-50"
                disabled={item.quantity <= 1}
                onClick={() =>
                  updateQty({ id: item.id, quantity: item.quantity - 1 })
                }
              >
                <FaMinus />
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                className="p-2 border border-amber-300 rounded-full hover:bg-amber-100"
                onClick={() =>
                  updateQty({ id: item.id, quantity: item.quantity + 1 })
                }
              >
                <FaPlus />
              </button>
            </div>

            {/* Subtotal + Remove */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-lg font-bold text-amber-700">
                ৳{(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                className="text-amber-600 hover:text-amber-800"
                title="Remove Item"
                onClick={() => removeItem(item.id)}
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!!items.length && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center border-t pt-4">
          <p className="text-xl font-bold">
            Total:{" "}
            <span className="text-amber-700">৳{totalPrice.toFixed(2)}</span>
          </p>
          <div className="flex gap-4 flex-col md:flex-row w-full md:w-auto">
            <button
              className="mt-4 md:mt-0 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-md"
              onClick={() => clearAll()}
            >
              <FaTrashAlt /> Clear Cart
            </button>
            <Link href="/checkout">
              <button className="mt-4 md:mt-0 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-md">
                <FaCheck /> Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
