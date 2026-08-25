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
    initializeCart: (state, action) => {
      return {
        cartItems: action.payload,
      };
    },
    addToCart: (state, action) => {
      // TODO: Add quantity
      const newItem = {
        product: action.payload.product,
        choosenConfiguration: action.payload.choosenConfiguration,
      };
      // add state to local storage
      window.localStorage.setItem("cartItems", JSON.stringify([...state.cartItems, newItem]));
      return {
        cartItems: [...state.cartItems, newItem],
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
export const { addToCart, clearCart, initializeCart } = cartSlice.actions;

export default cartSlice.reducer;
