import { useMemo } from "react";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { getByTags } from "../../data/getData/getFilteredProducts";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import HomePageProductsSettings from "../../settings/homePageProducts.json";

export const HomePageProducts = () => {
  const filteredProducts = useMemo(
    () => getByTags([HomePageProductsSettings.productsTag]),
    []
  );
  return (
    <>
      <NavBanner
        contentType={ContentType.INFO}
        content={HomePageProductsSettings.title}
      />
      <DisplayProducts products={filteredProducts} />
    </>
  );
};
