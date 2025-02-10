import { ProductType } from "../../globals/ProductType";
import Products from "/etc/secrets/products.json";

export const getAllProducts = (): Array<ProductType> => {
  return Products;
};
