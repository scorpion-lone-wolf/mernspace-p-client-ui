import { Product, Topping } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  product: Product;
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  // quantity: number;
};

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
    addToCart: (state, action) => {
      return {
        cartItems: [
          ...state.cartItems,
          {
            product: action.payload.product,
            choosenConfiguration: action.payload.choosenConfiguration,
          },
        ],
      };
    },
    clearCart: state => {
      return {
        cartItems: [],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
