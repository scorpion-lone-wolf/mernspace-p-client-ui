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
  quantity: number;
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
      // In our cart is that product already exists
      // If so just increase the quantity
      if (
        state.cartItems.some(
          (cartItem: CartItem) => cartItem.product._id === action.payload.product._id
        )
      )
        return {
          cartItems: state.cartItems.map((cartItem: CartItem) => {
            if (cartItem.product._id === action.payload.product._id) {
              return {
                product: action.payload.product,
                choosenConfiguration: action.payload.choosenConfiguration,
                quantity: cartItem.quantity + 1,
              };
            }
            return cartItem;
          }),
        };

      return {
        cartItems: [
          ...state.cartItems,
          {
            product: action.payload.product,
            choosenConfiguration: action.payload.choosenConfiguration,
            quantity: 1,
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
