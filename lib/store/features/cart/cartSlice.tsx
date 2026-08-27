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
      // Migrate cart items saved before the quantity field was added.
      state.cartItems = action.payload.map(item => ({
        ...item,
        quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
      }));
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
    changeQuantity: (
      state,
      action: PayloadAction<{ configurationHash: string; delta: number }>
    ) => {
      const itemIndex = state.cartItems.findIndex(
        item => item.configurationHash === action.payload.configurationHash
      );
      if (itemIndex === -1) return;

      const item = state.cartItems[itemIndex];
      const nextQuantity = item.quantity + action.payload.delta;

      if (nextQuantity <= 0) {
        state.cartItems.splice(itemIndex, 1);
      } else {
        item.quantity = nextQuantity;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, clearCart, initializeCart, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
