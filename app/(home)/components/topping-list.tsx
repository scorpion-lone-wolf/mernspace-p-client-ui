"use client";
import { useState } from "react";
import ToppingCard, { Topping } from "./topping-card";

const toppings = [
  {
    _id: "1",
    name: "Chicken",
    image: "/chicken.png",
    price: 50,
    isAvailable: true,
  },
  {
    _id: "2",
    name: "Jelapeno",
    image: "/jelapeno.png",
    price: 50,
    isAvailable: true,
  },
  {
    _id: "3",
    name: "Cheese",
    image: "/cheese.png",
    price: 50,
    isAvailable: true,
  },
];
function ToppingList() {
  const [selectedToppings, setSelectedToppings] = useState([toppings[0]]);
  const handleToppingCheckbox = (topping: Topping) => {
    if (selectedToppings.some(selectedTopping => selectedTopping._id === topping._id)) {
      setSelectedToppings(
        selectedToppings.filter(selectedTopping => selectedTopping._id !== topping._id)
      );
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  return (
    <section>
      <h4 className="mt-4 text-lg">Extra Toppings</h4>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {toppings.map(topping => {
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
