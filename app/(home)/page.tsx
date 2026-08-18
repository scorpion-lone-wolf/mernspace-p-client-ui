import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const products = [
    {
      _id: "123",
      name: "Pizza1",
      description: "cheesy delicious pizza",
      image: "/pizza-main.png",
      price: 500,
    },
    {
      _id: "2",
      name: "Pizza1",
      description: "description",
      image: "/pizza-main.png",
      price: 100,
    },
    {
      _id: "3",
      name: "Pizza1",
      description: "description",
      image: "/pizza-main.png",
      price: 100,
    },
    {
      _id: "4",
      name: "Pizza1",
      description: "description",
      image: "/pizza-main.png",
      price: 100,
    },
    {
      _id: "5",
      name: "Pizza1",
      description: "description",
      image: "/pizza-main.png",
      price: 100,
    },
    {
      _id: "6",
      name: "Pizza1",
      description: "description",
      image: "/pizza-main.png",
      price: 100,
    },
    {
      _id: "7",
      name: "Pizza1",
      description: "description",
      image: "/pizza-main.png",
      price: 100,
    },
  ];
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 xl:px-12 py-24 flex justify-between">
          <div>
            <h1 className="text-6xl font-black font-sans ">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 minute!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div className="animate-[spin_5s_linear_infinite]">
            <Image src="/pizza-main.png" width={350} height={350} alt="hero-main-pizza" />
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 xl:px-12 py-1 flex justify-between">
          <Tabs defaultValue="pizza" className="w-full">
            <TabsList>
              <TabsTrigger value="pizza" className="text-md">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="text-md">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              {products.length > 0 && (
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="beverages">
              {products.length > 0 && (
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
