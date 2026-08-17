import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

type PropType = {
  product: Product;
};

function ProductCard({ product }: Readonly<PropType>) {
  return (
    <Card className="relative w-full  overflow-hidden rounded-xl border-none pt-0">
      <CardHeader className="my-4 flex items-center justify-center">
        <Image src={product.image} width={150} height={150} alt={product.name} />
      </CardHeader>

      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>

        <p className="mt-2">{product.description}</p>
      </CardContent>

      <CardFooter className="flex justify-between border-none bg-white">
        <p>
          <span>From </span>
          <span className="font-bold">₹{product.price}</span>
        </p>

        <Button className="rounded-full bg-orange-200 text-orange-500 hover:bg-orange-300">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
