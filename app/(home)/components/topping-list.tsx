import { Topping } from "@/lib/types";
import { useEffect, useState } from "react";
import ToppingCard from "./topping-card";

function ToppingList() {
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    const fetchToppings = async () => {
      // TODO: Add dynamic tenantId
      const toppingResponse = await fetch(`
          ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=06c08096-664a-4ca8-b97c-ae8b4a0f3fad&limit=100`);
      const toppings = (await toppingResponse.json()).data;
      setToppings(toppings);
    };
    fetchToppings();
  }, []);

  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const handleToppingCheckbox = (topping: Topping) => {
    if (selectedToppings.some((selectedTopping: Topping) => selectedTopping._id === topping._id)) {
      setSelectedToppings(
        selectedToppings.filter((selectedTopping: Topping) => selectedTopping._id !== topping._id)
      );
    } else {
      setSelectedToppings((prev: Topping[]) => [...prev, topping]);
    }
  };

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
