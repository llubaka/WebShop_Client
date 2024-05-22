export enum Routes {
  HOME = "/",
  NEW_PRODUCTS = "/new",
  CART = "/cart",
  FAVORITES = "/favorites",
  SINGLE_PRODUCT = "/product/:param",
  BY_CATEGORY_PRODUCTS = "/category/:param",
  BY_TAG_PRODUCTS = "/tags/:param",
  FROM_BANNER_PRODUCTS = "/frombanner/:param",
}

const setParam = (str: string, param: string) => {
  return str.replace(":param", param);
};

export const getByTagProductsLink = (param: string) => {
  return setParam(Routes.BY_TAG_PRODUCTS, param);
};

export const getFromBannerProductsLink = (param: string) => {
  return setParam(Routes.FROM_BANNER_PRODUCTS, param);
};

export const getByCategoryProductsLink = (param: string) => {
  return setParam(Routes.BY_CATEGORY_PRODUCTS, param);
};

export const getSingleProductRouteLink = (param: string) => {
  return setParam(Routes.SINGLE_PRODUCT, param);
};

export const getFavoritesRouteLink = () => {
  return Routes.FAVORITES;
};

export const getHomeRouteLink = () => {
  return Routes.HOME;
};

export const getNewProductsRouteLink = () => {
  return Routes.NEW_PRODUCTS;
};

export const getCartRouteLink = () => {
  return Routes.CART;
};
