import { ProductType } from "../../globals/ProductType";
import Products from "../products/products.json";

export const getAllProducts = (): Array<ProductType> => {
  return Products;
};
