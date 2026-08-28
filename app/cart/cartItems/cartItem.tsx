import { Button } from "@/components/ui/button";
import { changeQuantity, CartItem as Item, removeItem } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useProductPrice } from "@/lib/use-product-price";
import { X } from "lucide-react";
import Image from "next/image";
import QtyChanger from "./qtyChanger";

const CartItem = ({ item }: { item: Item }) => {
  const dispatch = useAppDispatch();
  const { totalPrice } = useProductPrice({
    product: item.product,
    selectedPriceConfiguration: item.choosenConfiguration.priceConfiguration,
    selectedToppings: item.choosenConfiguration.selectedToppings,
    quantity: item.quantity,
  });

  return (
    <>
      <div key={item.configurationHash} className="grid grid-cols-2">
        <div className="flex items-center w-3/4">
          <Image src={item.product.image} width={100} height={100} alt={item.product.name} />
          <div className="flex gap-12 ml-6 w-full">
            <div className="flex-1">
              <h2 className="font-bold">{item.product.name}</h2>
              <h3 className="text-xs text-gray-500">
                {Object.values(item.choosenConfiguration.priceConfiguration)
                  .map(value => value)
                  .join(", ")}
              </h3>
              <h3 className="text-xs text-gray-500">
                {item.choosenConfiguration.selectedToppings.map(topping => topping.name).join(", ")}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <div>
            <QtyChanger
              handleQtyChange={qty => {
                dispatch(changeQuantity({ configurationHash: item.configurationHash, delta: qty }));
              }}
            >
              {item.quantity}
            </QtyChanger>
          </div>
          <div className="flex">
            <div className="font-bold w-12">&#8377;{totalPrice}</div>
            <Button
              className="ml-4 cursor-pointer"
              onClick={() => {
                dispatch(removeItem({ configurationHash: item.configurationHash }));
              }}
            >
              <X />
            </Button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
