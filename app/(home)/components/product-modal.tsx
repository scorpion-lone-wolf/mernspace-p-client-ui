"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { increment } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { Category, Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import ToppingList from "./topping-list";

type ProductProps = {
  product: Product;
  category: Category;
};
function ProductModal({ product, category }: ProductProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(increment());
    console.log("handleAddToCart");
    setDialogOpen(false);
  };
  const categoryData = category._id === product.categoryId ? category : null;
  return (
    <Dialog open={dialogOpen}>
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
            <ToppingList />
            <div className="flex items-center justify-between mt-8">
              <span className="font-bold">₹ 400</span>
              <Button onClick={handleAddToCart} className="bg-primary text-white h-10">
                <ShoppingCart className="mr-2" />
                <p>Add to Cart</p>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductModal;
