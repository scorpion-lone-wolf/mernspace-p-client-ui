import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import ToppingList from "./topping-list";

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};
type PropTypes = { product: Product };

const ProductCard = ({ product }: PropTypes) => {
  return (
    <Card className="border-none rounded-xl">
      <CardHeader className="flex items-center justify-center">
        <Image alt="pizza-image" width={150} height={150} src={product.image} />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-4">
        <p>
          <span>From </span>
          <span className="font-bold">₹{product.price}</span>
        </p>

        <Dialog>
          <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
            Choose
          </DialogTrigger>
          <DialogContent className="!max-w-2xl overflow-hidden p-0">
            <div className="flex flex-col md:flex-row">
              <div className="flex min-h-64 w-full shrink-0 items-center justify-center bg-white p-8 md:min-h-[28rem] md:w-[36%]">
                <Image
                  src={product.image}
                  width={280}
                  height={280}
                  className="h-auto w-full max-w-64 object-contain"
                  alt={product.name}
                />
              </div>
              <div className="min-w-0 flex-1 p-8 md:p-10">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-1">{product.description}</p>

                <div>
                  <h4 className="mt-4 text-lg">Choose the size</h4>
                  <RadioGroup defaultValue="small" className="grid grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem
                        value="small"
                        id={`${product._id}-small`}
                        className="peer sr-only"
                        aria-label="Small"
                      />
                      <Label
                        htmlFor={`${product._id}-small`}
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-checked:border-primary peer-data-checked:bg-primary/10"
                      >
                        Small
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="medium"
                        id={`${product._id}-medium`}
                        className="peer sr-only"
                        aria-label="Medium"
                      />
                      <Label
                        htmlFor={`${product._id}-medium`}
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-checked:border-primary peer-data-checked:bg-primary/10"
                      >
                        Medium
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="large"
                        id={`${product._id}-large`}
                        className="peer sr-only"
                        aria-label="Large"
                      />
                      <Label
                        htmlFor={`${product._id}-large`}
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-checked:border-primary peer-data-checked:bg-primary/10"
                      >
                        Large
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h4 className="mt-2 text-lg">Choose the crust</h4>
                  <RadioGroup defaultValue="thin" className="grid grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem
                        value="thin"
                        id={`${product._id}-thin`}
                        className="peer sr-only"
                        aria-label="Thin"
                      />
                      <Label
                        htmlFor={`${product._id}-thin`}
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-checked:border-primary peer-data-checked:bg-primary/10"
                      >
                        Thin
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="thick"
                        id={`${product._id}-thick`}
                        className="peer sr-only"
                        aria-label="Thick"
                      />
                      <Label
                        htmlFor={`${product._id}-thick`}
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-checked:border-primary peer-data-checked:bg-primary/10"
                      >
                        Thick
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <ToppingList />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
