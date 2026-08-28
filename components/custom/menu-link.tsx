"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

type MenuLinkProps = {
  children: ReactNode;
};

export default function MenuLink({ children }: MenuLinkProps) {
  const restaurantId = useSearchParams().get("restaurant");

  return <Link href={restaurantId ? `/?restaurant=${restaurantId}` : "/"}>{children}</Link>;
}
