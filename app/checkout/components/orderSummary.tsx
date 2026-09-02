import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo, useState } from "react";

const TAXES_PERCENTAGE = 0.12;
const DELIVERY_CHARGES = 100;
function OrderSummary() {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const cart = useAppSelector(state => state.cart.cartItems);
  //   subtotal
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
  // discount
  const discountAmount = useMemo(() => {
    return Math.round(calculatedTotal * (discountPercentage / 100));
  }, [calculatedTotal, discountPercentage]);
  //   taxes
  const taxes = useMemo(() => {
    const amountAfterDiscount = calculatedTotal - discountAmount;
    // 12% tax (Currently hardcoded)
    return Math.round(amountAfterDiscount * 0.12);
  }, [calculatedTotal, discountAmount]);
  //   grand total
  const grandTotal = useMemo(() => {
    return calculatedTotal - discountAmount + taxes + DELIVERY_CHARGES;
  }, [calculatedTotal, taxes, discountAmount]);
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
          <span className="font-bold">₹{taxes}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery charges</span>
          <span className="font-bold">₹{DELIVERY_CHARGES}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-bold">₹{discountAmount}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="font-bold">Order total</span>
          <span className="font-bold">₹{grandTotal}</span>
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
