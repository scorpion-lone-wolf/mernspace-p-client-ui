import type { Product, Topping } from "@/lib/types";
import type { CartItem } from "@/lib/store/features/cart/cartSlice";
import { useMemo } from "react";

type UseProductPriceArgs = {
  product: Product;
  selectedPriceConfiguration: Record<string, string>;
  selectedToppings?: Topping[];
  quantity?: number;
};

export function calculateProductPrice({
  product,
  selectedPriceConfiguration,
  selectedToppings = [],
  quantity = 1,
}: UseProductPriceArgs) {
  const configurationPrice = Object.entries(selectedPriceConfiguration).reduce(
    (total, [key, selectedOption]) =>
      total + (product.priceConfiguration[key]?.availableOptions[selectedOption] ?? 0),
    0
  );
  const toppingsPrice = selectedToppings.reduce((total, topping) => total + topping.price, 0);
  const unitPrice = configurationPrice + toppingsPrice;

  return {
    unitPrice,
    totalPrice: unitPrice * quantity,
  };
}

export function useProductPrice({
  product,
  selectedPriceConfiguration,
  selectedToppings = [],
  quantity = 1,
}: UseProductPriceArgs) {
  return useMemo(
    () =>
      calculateProductPrice({
        product,
        selectedPriceConfiguration,
        selectedToppings,
        quantity,
      }),
    [product, quantity, selectedPriceConfiguration, selectedToppings]
  );
}

export function useCartTotal(cartItems: CartItem[]) {
  return useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const { totalPrice } = calculateProductPrice({
          product: item.product,
          selectedPriceConfiguration: item.choosenConfiguration.priceConfiguration,
          selectedToppings: item.choosenConfiguration.selectedToppings,
          quantity: item.quantity,
        });

        return total + totalPrice;
      }, 0),
    [cartItems]
  );
}
