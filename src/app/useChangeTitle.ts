import { useEffect } from "react";
import AppSettings from "../settings/appSettings.json";
import { getById } from "../data/getData/getFilteredProducts";
import { Routes } from "../globals/Routes";
import { useLocation } from "react-router-dom";

export const useChangeTitle = () => {
  const location = useLocation();

  const getStringBetweenChars = (str: string) => {
    const removedLeadDash = str.replace("/", "");
    if (removedLeadDash.indexOf("/") === -1) return removedLeadDash;

    return removedLeadDash.substring(0, removedLeadDash.indexOf("/"));
  };

  useEffect(() => {
    const webAppName = AppSettings.appName;

    switch (getStringBetweenChars(location.pathname)) {
      case Routes.CART.replace("/", ""):
        document.title = `${webAppName} - Количка`;
        break;
      case getStringBetweenChars(Routes.BY_TAG_PRODUCTS):
      case getStringBetweenChars(Routes.FROM_BANNER_PRODUCTS):
      case getStringBetweenChars(Routes.FROM_MENU):
      case Routes.HOME_PAGE_PRODUCTS.replace("/", ""):
        document.title = `${webAppName} - Разглеждане на златни бижута`;
        break;
      case Routes.HOME.replace("/", ""):
        document.title = `${webAppName} - Онлайн магазин за златни бижута - топ цени - промоции - отстъпки - ОниксГолд`;
        break;
      case Routes.FAVORITES.replace("/", ""):
        document.title = `${webAppName} - Любими`;
        break;
      case getStringBetweenChars(Routes.SINGLE_PRODUCT):
        const lastQueryParam = location.pathname.substring(
          location.pathname.lastIndexOf("/") + 1
        );

        const info = lastQueryParam ? getById(lastQueryParam).info : "";
        document.title = `${webAppName} - ${info}`;
        break;
      default:
        break;
    }
  }, [location.pathname]);
};
