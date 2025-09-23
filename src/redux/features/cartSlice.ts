//  import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CounterState {
//   value: number;
// }

// const initialState: CounterState = {
//   value: 0,
// };

// const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// export default counterSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 🛒 Cart Item Type
export interface CartItem {
  id: string; // unique id (productId-color-size)
  productId: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
  variantId: string,
  sizeStockId:string
}

// 🛒 Cart State Type
interface CartState {
  items: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart from storage", error);
    return [];
  }
};

const saveCartToStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to storage", error);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === newItem.productId &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
