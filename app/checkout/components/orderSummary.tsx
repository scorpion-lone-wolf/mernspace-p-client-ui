import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyCoupon } from "@/lib/http/api";
import { useAppSelector } from "@/lib/store/hooks";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";

const TAXES_PERCENTAGE = 0.12;
const DELIVERY_CHARGES = 100;

function OrderSummary() {
  const searchParams = useSearchParams();
  const couponCodeRef = useRef<HTMLInputElement>(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);

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
    return Math.round(amountAfterDiscount * TAXES_PERCENTAGE);
  }, [calculatedTotal, discountAmount]);
  //   grand total
  const grandTotal = useMemo(() => {
    return calculatedTotal - discountAmount + taxes + DELIVERY_CHARGES;
  }, [calculatedTotal, taxes, discountAmount]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["coupon"],
    mutationFn: async () => {
      const tenant = searchParams.get("restaurant");
      if (!tenant) {
        throw new Error("Restaurant is missing from the checkout URL");
      }
      const code = couponCodeRef.current?.value.trim();
      if (!code) {
        throw new Error("Enter a coupon code");
      }
      return (await verifyCoupon(code, tenant)).data.data;
    },
    onSuccess: data => {
      if (data.valid) {
        setDiscountPercentage(data.discount);
        setCouponError(null);
        return;
      }
      setDiscountPercentage(0);
      setCouponError("This coupon is invalid or expired");
    },
    onError: error => {
      setDiscountPercentage(0);
      setCouponError(error instanceof Error ? error.message : "Unable to validate the coupon");
    },
  });
  const handleCouponValidation = (event: React.MouseEvent) => {
    event.preventDefault();
    setCouponError(null);
    mutate();
  };
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
        {couponError && <span className="text-red-500">{couponError}</span>}
        <div className="flex items-center gap-4">
          <Input
            id="coupon"
            name="code"
            type="text"
            className="w-full"
            placeholder="Coupon code"
            ref={couponCodeRef}
            aria-invalid={Boolean(couponError)}
          />
          <Button onClick={handleCouponValidation} type="button" variant={"outline"} disabled={isPending}>
            {isPending ? "Checking..." : "Apply"}
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
