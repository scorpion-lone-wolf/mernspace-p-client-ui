"use client";
import { AppStore, makeStore } from "@/lib/store/store";
import { useState } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Create the store instance the first time this renders
  const [store] = useState<AppStore>(() => {
    const newStore = makeStore();
    // TODO: Initialize the stor data here if you need that should be loaded when store is created/loaded
    return newStore;
  });

  return <Provider store={store}>{children}</Provider>;
}
