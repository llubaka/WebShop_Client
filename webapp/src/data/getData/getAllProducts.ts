import { ProductType } from "../../globals/ProductType";
import Products from "../../settings/products/products.json";

export const getAllProducts = (): Array<ProductType> => {
  return Products;
};
