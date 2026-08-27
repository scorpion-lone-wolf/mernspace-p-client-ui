"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function CartCounter() {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurant");
  const count = useAppSelector((state: RootState) =>
    restaurantId
      ? state.cart.cartItems
          .filter(cartItem => cartItem.product.tenantId === restaurantId)
          .reduce((total, cartItem) => total + cartItem.quantity, 0)
      : 0
  );

  return (
    <div className="relative">
      <Link
        className="hover:text-primary relative"
        href={restaurantId ? `/cart?restaurant=${restaurantId}` : "/cart"}
      >
        <ShoppingBasket />
        <span className="absolute -top-3 -right-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-white">
          {count}
        </span>
      </Link>
    </div>
  );
}

export default CartCounter;
