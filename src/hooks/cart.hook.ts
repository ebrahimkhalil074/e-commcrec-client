// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { FieldValues } from "react-hook-form";
// import { toast } from "sonner";

// import {
//   getCart,
//   addCartItem,
//   updateCartItem,
//   removeCartItem,
//   clearCart,
//   syncCart,
// } from "../services/cartServices";

// // Fetch user's cart
// export const useGetCart = () => {
//   return useQuery({
//     queryKey: ["CART"],
//     queryFn: getCart,
//     staleTime: 1000 * 60, // 1 min cache
//   });
// };

// // Add item to cart
// export const useAddCartItem = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["ADD_CART_ITEM"],
//     mutationFn: async (item: FieldValues) => await addCartItem(item),
//     onSuccess: () => {
//       toast.success("Item added to cart");
//       queryClient.invalidateQueries({ queryKey: ["CART"] }); // TS-safe
//     },
//     onError: (error: any) => {
//       toast.error(error.message || "Failed to add item");
//     },
//   });
// };

// // Update cart item quantity
// export const useUpdateCartItem = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["UPDATE_CART_ITEM"],
//     mutationFn: async ({ id, quantity }: { id: string; quantity: number }) =>
//       await updateCartItem(id, quantity),
//     onSuccess: () => {
//       toast.success("Cart updated");
//       queryClient.invalidateQueries({ queryKey: ["CART"] });
//     },
//     onError: (error: any) => {
//       toast.error(error.message || "Failed to update cart");
//     },
//   });
// };

// // Remove cart item
// export const useRemoveCartItem = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["REMOVE_CART_ITEM"],
//     mutationFn: async (id: string) => await removeCartItem(id),
//     onSuccess: () => {
//       toast.success("Item removed");
//       queryClient.invalidateQueries({ queryKey: ["CART"] });
//     },
//     onError: (error: any) => {
//       toast.error(error.message || "Failed to remove item");
//     },
//   });
// };

// // Clear entire cart
// export const useClearCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["CLEAR_CART"],
//     mutationFn: clearCart,
//     onSuccess: () => {
//       toast.success("Cart cleared");
//       queryClient.invalidateQueries({ queryKey: ["CART"] });
//     },
//     onError: (error: any) => {
//       toast.error(error.message || "Failed to clear cart");
//     },
//   });
// };

// // Sync guest/local cart with user cart
// export const useSyncCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["SYNC_CART"],
//     mutationFn: async (items: FieldValues[]) => await syncCart(items),
//     onSuccess: () => {
//       toast.success("Cart synced");
//       queryClient.invalidateQueries({ queryKey: ["CART"] });
//     },
//     onError: (error: any) => {
//       toast.error(error.message || "Failed to sync cart");
//     },
//   });
// };

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
  syncCart,
} from "../services/cartServices";

// Fetch user's cart
export const useGetCart = () => {
  return useQuery({
    queryKey: ["CART"],
    queryFn: getCart,
    staleTime: 1000 * 60, // 1 min cache
  });
};

// Add item to cart (Optimistic)
export const useAddCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ADD_CART_ITEM"],
    mutationFn: async (item: FieldValues) => await addCartItem(item),

    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["CART"] });
      const prevCart = queryClient.getQueryData<any>(["CART"]);

      queryClient.setQueryData(["CART"], (old: any) => {
        if (!old) return { items: [newItem] };

        return {
          ...old,
          items: [...old.items, newItem],
        };
      });

      return { prevCart };
    },

    onError: (error: any, _, context) => {
      toast.error(error.message || "Failed to add item");
      if (context?.prevCart) {
        queryClient.setQueryData(["CART"], context.prevCart);
      }
    },

    onSuccess: () => {
      toast.success("Item added to cart");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["CART"] });
    },
  });
};

// Update cart item quantity (Optimistic)
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_CART_ITEM"],
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) =>
      await updateCartItem(id, quantity),

    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["CART"] });
      const prevCart = queryClient.getQueryData<any>(["CART"]);

      queryClient.setQueryData(["CART"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.map((item: any) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        };
      });

      return { prevCart };
    },

    onError: (error: any, _, context) => {
      toast.error(error.message || "Failed to update cart");
      if (context?.prevCart) {
        queryClient.setQueryData(["CART"], context.prevCart);
      }
    },

    onSuccess: () => {
      toast.success("Cart updated");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["CART"] });
    },
  });
};

// Remove cart item (Optimistic)
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["REMOVE_CART_ITEM"],
    mutationFn: async (id: string) => await removeCartItem(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["CART"] });
      const prevCart = queryClient.getQueryData<any>(["CART"]);

      queryClient.setQueryData(["CART"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.filter((item: any) => item.id !== id),
        };
      });

      return { prevCart };
    },

    onError: (error: any, _, context) => {
      toast.error(error.message || "Failed to remove item");
      if (context?.prevCart) {
        queryClient.setQueryData(["CART"], context.prevCart);
      }
    },

    onSuccess: () => {
      toast.success("Item removed");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["CART"] });
    },
  });
};

// Clear entire cart (invalidate only, no optimistic needed)
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CLEAR_CART"],
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["CART"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to clear cart");
    },
  });
};

// Sync guest/local cart with user cart
export const useSyncCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["SYNC_CART"],
    mutationFn: async (items: FieldValues[]) => await syncCart(items),
    onSuccess: () => {
      toast.success("Cart synced");
      queryClient.invalidateQueries({ queryKey: ["CART"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to sync cart");
    },
  });
};
