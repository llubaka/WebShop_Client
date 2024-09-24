import { useMemo } from "react";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { getByIds } from "../../data/getData/getFilteredProducts";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import HomePageProductsSettings from "../../settings/homePageProducts.json";
import AppSettings from "../../settings/appSettings.json";
import { getLatestProducts } from "../../data/getData/getLatestProducts";

export const NewProductsPage = () => {
  const filteredProducts = useMemo(
    () => getByIds(getLatestProducts(AppSettings.newPageProductsCount).map((pr) => pr.id)),
    []
  );

  return (
    <>
      <NavBanner contentType={ContentType.INFO} content={HomePageProductsSettings.title} />
      <DisplayProducts products={filteredProducts} />
    </>
  );
};
