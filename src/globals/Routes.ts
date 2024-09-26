export enum Routes {
  HOME = "/",
  NEW_PRODUCTS_PAGE = "/new",
  CART = "/cart",
  FAVORITES = "/favorites",
  SINGLE_PRODUCT = "/product/:param",
  BY_TAG_PRODUCTS = "/tags/:param/:param2",
  FROM_BANNER_PRODUCTS = "/frombanner/:param",
  FROM_MENU = "/frommenu/:param/:param2/:param3",
  COMPLIANCE_PAGE = "compliance",
}

const setParam = (str: string, param: string, paramName = ":param") => {
  return str.replace(paramName, param);
};

export const getByTagProductsLink = (tag: string, page: string = "1") => {
  return setParam(setParam(Routes.BY_TAG_PRODUCTS, tag), page, ":param2");
};

export const getFromMenuProductsLink = (menuId: string, subMenuId: string, page: string = "1") => {
  return setParam(
    setParam(setParam(Routes.FROM_MENU, menuId), subMenuId, ":param2"),
    page,
    ":param3"
  );
};

export const getFromBannerProductsLink = (param: string) => {
  return setParam(Routes.FROM_BANNER_PRODUCTS, param);
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

export const getNewProductsPageRouteLink = () => {
  return Routes.NEW_PRODUCTS_PAGE;
};

export const getCartRouteLink = () => {
  return Routes.CART;
};

export const getCompliancePageRouteLink = () => {
  return Routes.COMPLIANCE_PAGE;
};
