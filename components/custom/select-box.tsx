"use client";
import { Resturants } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
  resturants?: Resturants[];
};
function SelectBox({ resturants }: Readonly<Props>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const availableResturants = Array.isArray(resturants) ? resturants : [];
  const currentResturantId = searchParams.get("restaurant");
  const selectedResturant = availableResturants.find(
    resturant => resturant.id === currentResturantId
  );

  return (
    <Select
      value={currentResturantId}
      onValueChange={value => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === null) {
          params.delete("restaurant");
        } else {
          params.set("restaurant", value);
        }
        router.push(`/?${params.toString()}`);
      }}
    >
      <SelectTrigger className="w-[180px]" disabled={availableResturants.length === 0}>
        <SelectValue>
          {selectedResturant?.name ??
            (availableResturants.length ? "Select restaurant" : "No restaurants available")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {availableResturants.map(resturant => (
          <SelectItem key={resturant.id} value={resturant.id}>
            {resturant.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectBox;
