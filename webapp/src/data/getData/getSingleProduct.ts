import { ProductType } from "../../globals/ProductType";
import Products from "../products/products.json";

export const getSingleProduct = (id: string): ProductType => {
  return Products.filter((pr) => pr.id === id)[0];
};
