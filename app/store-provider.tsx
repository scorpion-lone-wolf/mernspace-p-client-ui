"use client";
import { initializeCart } from "@/lib/store/features/cart/cartSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Create the store instance the first time this render
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      store.dispatch(initializeCart(JSON.parse(cartItems)));
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
