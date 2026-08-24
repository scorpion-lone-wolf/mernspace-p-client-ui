"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

function CartCounter() {
  const count = useAppSelector((state: RootState) => state.cart.cartItems.length);
  return (
    <div className="relative">
      <Link className="hover:text-primary relative" href="/">
        <ShoppingBasket />
        <span className="absolute -top-3 -right-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-white">
          {count}
        </span>
      </Link>
    </div>
  );
}

export default CartCounter;
