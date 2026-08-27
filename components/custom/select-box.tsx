"use client";
import { Resturants } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
  resturants?: Resturants[];
};
function SelectBox({ resturants }: Readonly<Props>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const availableResturants = Array.isArray(resturants) ? resturants : [];
  const currentResturantId = searchParams.get("restaurant");
  const [selectedResturantId, setSelectedResturantId] = useState<string | null>(
    currentResturantId
  );
  const selectedResturant = availableResturants.find(
    resturant => resturant.id === selectedResturantId
  );

  return (
    <Select
      value={selectedResturantId}
      onValueChange={value => {
        setSelectedResturantId(value);
        const params = new URLSearchParams(searchParams.toString());
        if (value === null) {
          params.delete("restaurant");
        } else {
          params.set("restaurant", value);
        }
        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
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
