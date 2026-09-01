import { getSession } from "@/lib/session";

import { redirect } from "next/navigation";
import CustomerForm from "./components/customerForm";

export default async function Checkout({ searchParams }: { searchParams: { restaurant: string } }) {
  const params = await searchParams;
  const session = await getSession();
  const checkoutParams = new URLSearchParams(params);
  const returnUrl = `/checkout?${checkoutParams.toString()}`;

  if (!session) {
    redirect(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
  }
  return <CustomerForm />;
}
