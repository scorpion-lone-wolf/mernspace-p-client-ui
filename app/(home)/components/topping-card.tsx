import { Button } from "@/components/ui/button";
import { Topping } from "@/lib/types";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

type PropType = {
  topping: Topping;
  selectedToppings: Topping[];
  handleToppingCheckbox: (topping: Topping) => void;
};

function ToppingCard({ topping, selectedToppings, handleToppingCheckbox }: PropType) {
  const isCurrentSelected = selectedToppings.some(
    selectedTopping => selectedTopping._id === topping._id
  );
  return (
    <Button
      onClick={() => {
        handleToppingCheckbox(topping);
      }}
      variant={"outline"}
      className={`relative flex flex-col h-34 ${isCurrentSelected ? "border-orange-400 border-2" : ""}`}
    >
      <Image src={topping.image} alt={topping.name} width={50} height={50} unoptimized />
      <h4>{topping.name}</h4>
      <p>₹{topping.price}</p>
      {isCurrentSelected && (
        <CircleCheck className="absolute top-0 right-0 mt-1 mr-1 text-primary" />
      )}
    </Button>
  );
}

export default ToppingCard;
