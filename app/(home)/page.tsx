import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
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
          <Tabs defaultValue="pizza">
            <TabsList>
              <TabsTrigger value="pizza" className="text-md">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="text-md">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">This is for pizza.</TabsContent>
            <TabsContent value="beverages">This is for beverages.</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
