"use client";
import { initializeCart } from "@/lib/store/features/cart/cartSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Create the store instance the first time this render
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        store.dispatch(initializeCart(parsedCart));
      } catch {
        localStorage.removeItem("cartItems");
      }
    }

    const unsubscribe = store.subscribe(() => {
      localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.cartItems));
    });

    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
