import type { Product, Topping } from "@/lib/types";
import { useMemo } from "react";

type UseProductPriceArgs = {
  product: Product;
  selectedPriceConfiguration: Record<string, string>;
  selectedToppings?: Topping[];
  quantity?: number;
};

export function useProductPrice({
  product,
  selectedPriceConfiguration,
  selectedToppings = [],
  quantity = 1,
}: UseProductPriceArgs) {
  return useMemo(() => {
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
  }, [product, quantity, selectedPriceConfiguration, selectedToppings]);
}
