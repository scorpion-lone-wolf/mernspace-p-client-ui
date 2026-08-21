import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Category, Product } from "@/lib/types";
import Image from "next/image";
import ProductModal from "./product-modal";

// export type Product = {
//   _id: string;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
// };
type PropTypes = { product: Product; category: Category };

const ProductCard = ({ product, category }: PropTypes) => {
  return (
    <Card className="border-none rounded-xl">
      <CardHeader className="flex items-center justify-center">
        <Image alt="pizza-image" width={150} height={150} src={product.image} unoptimized />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-4">
        <p>
          <span>From </span>
          {/* <span className="font-bold">₹{product.price}</span>
           */}
          <span className="font-bold">₹{500}</span>
        </p>

        <ProductModal product={product} category={category} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
