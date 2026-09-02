"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { getCustmer } from "@/lib/http/api";
import { Customer } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { Coins, CreditCard } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import AddAddress from "./addAddress";

const formSchema = z.object({
  address: z.string().min(1, "Please select a delivery address"),
  paymentMode: z.enum(["cash", "card"], { error: "Please select a payment method" }),
  comment: z.string(),
});

function CustomerForm() {
  const customerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      comment: "",
    },
  });
  const { data: customer, isLoading } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
      return (await getCustmer())?.data?.data;
    },
  });
  const selectedAddress = useWatch({ control: customerForm.control, name: "address" });
  const selectedPaymentMode = useWatch({ control: customerForm.control, name: "paymentMode" });
  const { errors } = customerForm.formState;

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <form onSubmit={customerForm.handleSubmit(onSubmit)}>
      <div className="container mx-auto mt-16 flex w-full max-w-[1200px] items-center justify-center gap-6 px-4">
        <Card className="w-3/5 border-none">
          <CardHeader>
            <CardTitle>Customer details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  id="fname"
                  type="text"
                  className="w-full"
                  defaultValue={customer?.firstName}
                  disabled
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  id="lname"
                  type="text"
                  className="w-full"
                  defaultValue={customer?.lastName}
                  disabled
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  className="w-full"
                  defaultValue={customer?.email}
                  disabled
                />
              </div>
              <div className="grid gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="name">Address</Label>
                    <AddAddress customerId={customer?._id} />
                  </div>
                  <RadioGroup
                    className="grid grid-cols-2 gap-6 mt-2"
                    value={selectedAddress}
                    onValueChange={(address) => customerForm.setValue("address", address, { shouldDirty: true, shouldValidate: true })}
                  >
                    {customer?.addresses?.map((address, index) => (
                      <Card
                        key={address.text}
                        className={`cursor-pointer p-6 ${selectedAddress === address.text ? "border-primary" : ""}`}
                        onClick={() => customerForm.setValue("address", address.text, { shouldDirty: true, shouldValidate: true })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={address.text} id={`address-${index}`} />
                          <Label htmlFor={`address-${index}`} className="leading-normal">
                            {address.text}
                          </Label>
                        </div>
                      </Card>
                    ))}
                  </RadioGroup>
                  {errors.address && <p className="mt-2 text-sm text-destructive">{errors.address.message}</p>}
                </div>
              </div>
              <div className="grid gap-3">
                <Label>Payment Mode</Label>
                <RadioGroup
                  className="flex gap-6"
                  value={selectedPaymentMode}
                  onValueChange={(paymentMode) =>
                    customerForm.setValue("paymentMode", paymentMode as "cash" | "card", { shouldDirty: true, shouldValidate: true })
                  }
                >
                  <div className="w-36" onClick={() => customerForm.setValue("paymentMode", "card", { shouldDirty: true, shouldValidate: true })}>
                    <RadioGroupItem
                      value={"card"}
                      id={"card"}
                      className="peer sr-only"
                      aria-label={"card"}
                    />
                    <Label
                      htmlFor={"card"}
                      className={`flex cursor-pointer items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground ${selectedPaymentMode === "card" ? "border-primary" : ""}`}
                    >
                      <CreditCard size={"20"} />
                      <span className="ml-2">Card</span>
                    </Label>
                  </div>
                  <div className="w-36" onClick={() => customerForm.setValue("paymentMode", "cash", { shouldDirty: true, shouldValidate: true })}>
                    <RadioGroupItem
                      value={"cash"}
                      id={"cash"}
                      className="peer sr-only"
                      aria-label={"cash"}
                    />
                    <Label
                      htmlFor={"cash"}
                      className={`flex cursor-pointer items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground ${selectedPaymentMode === "cash" ? "border-primary" : ""}`}
                    >
                      <Coins size={"20"} />
                      <span className="ml-2 text-md">Cash</span>
                    </Label>
                  </div>
                </RadioGroup>
                {errors.paymentMode && <p className="text-sm text-destructive">{errors.paymentMode.message}</p>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="comment">Comment</Label>
                <Textarea id="comment" {...customerForm.register("comment")} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-2/5 border-none h-auto self-start">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-6">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-bold">₹8130</span>
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
              <Button type="button" variant={"outline"}>Apply</Button>
            </div>

            <div className="text-right mt-6">
              <Button type="submit">Place order</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

export default CustomerForm;
