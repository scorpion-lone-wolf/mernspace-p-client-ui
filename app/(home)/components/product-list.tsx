import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/lib/types";
import ProductCard from "./product-card";

async function ProductList() {
  // fetch all categories
  const categoriesPromise = fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/categories?limit=100`,
    {
      next: {
        revalidate: 60 * 60, // 1 hour cache
      },
    }
  );
  // fetch all products
  const productPromise = fetch(
    // TODO: Add dynamic tenantId
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/products?tenantId=06c08096-664a-4ca8-b97c-ae8b4a0f3fad&limit=100`,
    {
      next: {
        revalidate: 60 * 60, // 1 hour cache
      },
    }
  );
  // fetching data in parallel
  const [categoriesResponse, productResponse] = await Promise.all([
    categoriesPromise,
    productPromise,
  ]);

  if (!categoriesResponse.ok) throw new Error("Failed to fetch tenants");
  if (!productResponse.ok) throw new Error("Failed to fetch tenants");

  const categories: Category[] = (await categoriesResponse.json()).data;
  const products: Product[] = (await productResponse.json()).data;
  return (
    <section>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 xl:px-12 py-1 flex justify-between">
        <Tabs defaultValue={categories[0]._id} className="w-full">
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category._id} value={category._id} className="text-md">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map(category => (
            <TabsContent key={category._id} value={category._id}>
              {products.length > 0 && (
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                  {products
                    .filter(product => product.categoryId === category._id)
                    .map(product => (
                      <ProductCard key={product._id} product={product} category={category} />
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default ProductList;
