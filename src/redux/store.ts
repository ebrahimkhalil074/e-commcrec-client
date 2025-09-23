import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    card: cardReducer,
  },
});

// Types (TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
