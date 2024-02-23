import { ProductType } from "../globalTypes/ProductType";
import Products from "../products/products.json";

export const getSingleProduct = (id: string) => {
  return (Products as ProductType)[id];
};
