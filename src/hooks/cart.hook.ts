import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { 
  getCart, 
  addCartItem, 
  updateCartItem, 
  removeCartItem, 
  clearCart, 
  syncCart 
} from "../services/cartServices";

// Fetch user's cart
export const useGetCart = () => {
  return useQuery({
    queryKey: ["CART"],
    queryFn: getCart,
    staleTime: 1000 * 60, // 1 min cache
    onError: (error: any) => {
      toast.error(error.message || "Failed to fetch cart");
    },
  });
};

// Add item to cart
export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["ADD_CART_ITEM"],
    mutationFn: async (item: FieldValues) => await addCartItem(item),
    onSuccess: () => {
      toast.success("Item added to cart");
      queryClient.invalidateQueries({ queryKey: ["CART"] }); // TS-safe
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add item");
    },
  });
};

// Update cart item quantity
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_CART_ITEM"],
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => 
      await updateCartItem(id, quantity),
    onSuccess: () => {
      toast.success("Cart updated");
      queryClient.invalidateQueries({ queryKey: ["CART"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update cart");
    },
  });
};

// Remove cart item
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["REMOVE_CART_ITEM"],
    mutationFn: async (id: string) => await removeCartItem(id),
    onSuccess: () => {
      toast.success("Item removed");
      queryClient.invalidateQueries({ queryKey: ["CART"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove item");
    },
  });
};

// Clear entire cart
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
