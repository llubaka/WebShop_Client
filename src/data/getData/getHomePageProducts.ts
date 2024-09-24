import HomePageProducts from "../../settings/homePageProducts.json";
import { getLatestProducts } from "./getLatestProducts";

export const getHomePageProductsIds = (): Array<string> => {
  // In case showLast is added we return the last elements of the products equal to showLast
  if (HomePageProducts.showLast) {
    return getLatestProducts(HomePageProducts.showLast).map((pr) => pr.id);
  }

  return HomePageProducts.displayedProductsIds;
};
