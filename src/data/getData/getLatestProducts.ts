import { ProductType } from "../../globals/ProductType";
import Products from "../../settings/products.json";

export const getLatestProducts = (returnCount: number): Array<ProductType> => {
  const productsLength = Products.length;

  // In case the products are less then the count we want to initially show
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
