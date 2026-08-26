"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Category, Product, Topping } from "@/lib/types";
import { createHash } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";
import ToppingList from "./topping-list";

type ProductProps = {
  product: Product;
  category: Category;
};

type ChoosenConfig = {
  [key: string]: string;
};
function ProductModal({ product, category }: ProductProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const categoryData = category._id === product.categoryId ? category : null;
  const showToppingList = category.name.toLowerCase() === "pizza";
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const defaultConfig =
    categoryData &&
    Object.entries(categoryData.priceConfiguration)
      .map(([key, value]) => {
        return { [key]: value.availableOptions[0] };
      })
      .reduce((acc, config) => ({ ...acc, ...config }), {});

  const [choosenConfig, setChoosenConfig] = React.useState<ChoosenConfig>(defaultConfig!);
  const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);

  const totalPrice = useMemo(() => {
    // here we will calculate th price of the product
    const toppingPrice = selectedToppings.reduce((acc, topping) => acc + topping.price, 0);
    const configPrice = Object.entries(choosenConfig).reduce((acc, [key, value]) => {
      // based on this key and value we will calculate the price from product
      acc += product?.priceConfiguration[key].availableOptions[value];
      return acc;
    }, 0);
    return toppingPrice + configPrice;
  }, [choosenConfig, selectedToppings, product]);

  const handleToppingCheckbox = (topping: Topping) => {
    if (selectedToppings.some((selectedTopping: Topping) => selectedTopping._id === topping._id)) {
      setSelectedToppings(
        selectedToppings.filter((selectedTopping: Topping) => selectedTopping._id !== topping._id)
      );
    } else {
      setSelectedToppings((prev: Topping[]) => [...prev, topping]);
    }
  };
  const alreadyInCart = useMemo(() => {
    const configurationHash = createHash(
      JSON.stringify({
        productId: product._id,
        priceConfiguration: Object.entries(choosenConfig).sort(([firstKey], [secondKey]) =>
          firstKey.localeCompare(secondKey)
        ),
        toppingIds: selectedToppings.map(topping => topping._id).sort(),
      })
    );
    return cartItems.some(item => item.configurationHash === configurationHash);
  }, [cartItems, choosenConfig, product, selectedToppings]);
  const handleAddToCart = async () => {
    const itemToAdd = {
      product,
      choosenConfiguration: {
        priceConfiguration: choosenConfig,
        selectedToppings,
      },
    };
    const configurationHash = createHash(
      JSON.stringify({
        productId: product._id,
        priceConfiguration: Object.entries(choosenConfig).sort(([firstKey], [secondKey]) =>
          firstKey.localeCompare(secondKey)
        ),
        toppingIds: selectedToppings.map(topping => topping._id).sort(),
      })
    );

    dispatch(addToCart({ ...itemToAdd, configurationHash }));
    // clear the selected toppings
    setSelectedToppings([]);
    // close the dialog
    setDialogOpen(false);
  };

  const handleRadioChange = (key: string, data: string) => {
    setChoosenConfig((prev: ChoosenConfig) => {
      return {
        ...prev,
        [key]: data,
      };
    });
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        onClick={() => setDialogOpen(true)}
        className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
      >
        Choose
      </DialogTrigger>
      <DialogContent className="!max-w-2xl overflow-hidden p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex min-h-64 w-full shrink-0 items-center justify-center bg-white p-8 md:min-h-[28rem] md:w-[36%]">
            <Image
              src={product.image}
              width={280}
              height={280}
              className="h-auto w-full max-w-64 object-contain"
              alt={product.name}
              unoptimized
            />
          </div>
          <div className="min-w-0 flex-1 p-8 md:p-10">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="mt-1">{product.description}</p>

            {categoryData &&
              Object.entries(categoryData.priceConfiguration).map(([key, value]) => (
                <div key={key}>
                  <h4 className="mt-2 text-lg">Choose the {key}</h4>

                  <RadioGroup
                    defaultValue={value.availableOptions[0]}
                    onValueChange={(data: string) => {
                      handleRadioChange(key, data);
                    }}
                    className="grid grid-cols-3 gap-4"
                  >
                    {value.availableOptions.map(option => (
                      <div key={option}>
                        <RadioGroupItem
                          value={option}
                          id={`${product._id}-${option}`}
                          className="peer sr-only"
                          aria-label={option}
                        />

                        <Label
                          htmlFor={`${product._id}-${option}`}
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-checked:border-primary peer-data-checked:bg-primary/10"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            {showToppingList && (
              <ToppingList
                handleToppingCheckbox={handleToppingCheckbox}
                selectedToppings={selectedToppings}
              />
            )}
            <div className="flex items-center justify-between mt-8">
              <span className="font-bold">₹ {totalPrice}</span>
              <Button
                disabled={alreadyInCart}
                onClick={handleAddToCart}
                className="bg-primary text-white h-10"
              >
                <ShoppingCart className="mr-2" />
                {alreadyInCart ? <p>Already in Cart</p> : <p>Add to Cart</p>}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductModal;
