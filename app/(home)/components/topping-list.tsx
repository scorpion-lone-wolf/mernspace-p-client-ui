import { Topping } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ToppingCard from "./topping-card";

type ToppingListProps = {
  handleToppingCheckbox: (topping: Topping) => void;
  selectedToppings: Topping[];
};

function ToppingList({ handleToppingCheckbox, selectedToppings }: ToppingListProps) {
  const searchParams = useSearchParams();
  const tenanatId = searchParams.get("restaurant");
  // this is for showing what toppings are available
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    const fetchToppings = async () => {
      const toppingResponse = await fetch(`
          ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=${tenanatId}&limit=100`);
      const toppings = (await toppingResponse.json()).data;
      setToppings(toppings);
    };
    fetchToppings();
  }, [tenanatId]);

  return (
    <section>
      <h4 className="mt-4 text-lg">Extra Toppings</h4>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {toppings &&
          toppings.map(topping => {
            return (
              <ToppingCard
                key={topping._id}
                topping={topping}
                selectedToppings={selectedToppings}
                handleToppingCheckbox={handleToppingCheckbox}
              />
            );
          })}
      </div>
    </section>
  );
}

export default ToppingList;
