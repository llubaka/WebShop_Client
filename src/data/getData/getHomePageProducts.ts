import HomePageProducts from "../../settings/homePageProducts.json";

export const getHomePageProductsIds = (): Array<string> => {
  return HomePageProducts.displayedProductsIds;
};
