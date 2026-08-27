"use client";
import { Resturants } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
  resturants: Resturants[];
};
function SelectBox({ resturants }: Readonly<Props>) {
  const searchParams = useSearchParams();
  const restaurant = resturants.find(
    restaurant => restaurant.id === searchParams.get("restaurant")
  );
  const [selectedResturant, setSelectedResturant] = useState<Resturants | null>(restaurant ?? null);
  const router = useRouter();

  return (
    <Select
      onValueChange={value => {
        const restaurant = resturants.find(restaurant => restaurant.id === value);
        setSelectedResturant(restaurant ?? null);
        if (restaurant) router.push(`/?restaurant=${restaurant.id}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Resturants">{selectedResturant?.name}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {resturants.map((resturant: Resturants) => (
          <SelectItem key={resturant.id} value={resturant.id}>
            {resturant.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectBox;
