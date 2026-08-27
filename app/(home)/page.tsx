import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";
import ProductList from "./components/product-list";

async function Home({ searchParams }: { searchParams: { restaurant: string } }) {
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
          <div className="animate-[spin_5s_linear_infinite] flex justify-center items-center">
            <Image src="/pizza-main.png" width={350} height={350} alt="hero-main-pizza" />
          </div>
        </div>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
export default Home;
