"use client";

import { Resturants } from "@/lib/types";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
  resturants: Resturants[];
};
function SelectBox({ resturants }: Readonly<Props>) {
  const [selectedResturant, setSelectedResturant] = useState<Resturants | null>(null);

  return (
    <Select
      onValueChange={value => {
        const restaurant = resturants.find(restaurant => restaurant.id === value);

        setSelectedResturant(restaurant ?? null);
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
