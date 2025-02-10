import { ProductType } from "../../globals/ProductType";
import Products from "/etc/secrets/products.json";

export const getLatestProducts = (returnCount: number): Array<ProductType> => {
  const productsLength = Products.length;

  if (productsLength < returnCount) {
    return Products;
  } else {
    let pr: ProductType[] = [];
    for (let i = productsLength - returnCount; i < productsLength; i++) {
      pr = [...pr, Products[i]];
    }
    return pr;
  }
};
