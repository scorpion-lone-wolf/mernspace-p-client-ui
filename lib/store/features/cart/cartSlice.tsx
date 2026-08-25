import { Product, Topping } from "@/lib/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  product: Product;
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  configurationHash: string;

  quantity: number;
};

type AddToCartPayload = Omit<CartItem, "quantity">;

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },

    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const existingItem = state.cartItems.find(
        item => item.configurationHash === action.payload.configurationHash
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, clearCart, initializeCart } = cartSlice.actions;

export default cartSlice.reducer;
