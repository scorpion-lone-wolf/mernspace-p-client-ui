export type Resturants = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
};

export type Category = {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
};
export type PriceConfiguration = {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
};
export type Attribute = {
  name: string;
  widgetType: "radio" | "switch";
  defaultValue: string;
  availableOptions: string[];
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  tenantId: string;
  image: string;
  categoryId: Category["_id"] | Category;
  priceConfiguration: ProductPriceConfiguration;
  attribute: { name: string; value: unknown }[];
  isPublished: boolean;
};
export type ProductPriceConfiguration = {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: Record<string, number>;
  };
};

export type Topping = {
  _id: string;
  name: string;
  image: string;
  price: number;
  isPublished: boolean;
};
