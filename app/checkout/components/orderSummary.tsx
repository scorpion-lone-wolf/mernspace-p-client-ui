import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";

function OrderSummary() {
  const cart = useAppSelector(state => state.cart.cartItems);

  const calculatedTotal = useMemo(() => {
    let total = 0;
    cart.forEach(item => {
      let itemTotal = 0;
      const quantity = item.quantity;
      Object.entries(item.product.priceConfiguration).forEach(([key, value]) => {
        const selectedOption = item.choosenConfiguration.priceConfiguration[key];
        if (selectedOption) {
          itemTotal += value.availableOptions[selectedOption];
        }
      });
      item.choosenConfiguration.selectedToppings.forEach(topping => {
        itemTotal += topping.price;
      });
      total += itemTotal * quantity;
    });

    return total;
  }, [cart]);

  return (
    <Card className="w-2/5 border-none h-auto self-start">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-bold">₹{calculatedTotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span className="font-bold">₹82</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery charges</span>
          <span className="font-bold">₹100</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-bold">₹0</span>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="font-bold">Order total</span>
          <span className="font-bold">₹8300</span>
        </div>
        <div className="flex items-center gap-4">
          <Input id="fname" type="text" className="w-full" placeholder="Coupon code" />
          <Button type="button" variant={"outline"}>
            Apply
          </Button>
        </div>

        <div className="text-right mt-6">
          <Button type="submit">Place order</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderSummary;
