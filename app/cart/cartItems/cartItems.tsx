"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { useCartTotal } from "@/lib/use-product-price";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CartItem from "./cartItem";

const CartItems = () => {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurant");

  const cartItems = useAppSelector(state => state.cart.cartItems);
  const cart = restaurantId
    ? cartItems.filter(cartItem => cartItem.product.tenantId === restaurantId)
    : [];
  const totalPriceToPay = useCartTotal(cart);

  if (!cart.length) {
    return (
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <p className="text-gray-500">
          Your cart is empty!{" "}
          <Link
            className="text-orange-500"
            href={restaurantId ? `/?restaurant=${restaurantId}` : "/"}
          >
            continue shopping?
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 ">
      {cart.map((cartItem, index) => (
        <CartItem
          key={`${cartItem.configurationHash || cartItem.product._id}-${index}`}
          item={cartItem}
        />
      ))}
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">&#8377;{totalPriceToPay}</span>
        <Button>
          Checkout
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
