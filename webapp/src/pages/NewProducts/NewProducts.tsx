import { useMemo } from "react";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { getByTags } from "../../data/getData/getFilteredProducts";
import "./newProducts.scss";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";

export const NewProducts = () => {
  const filteredProducts = useMemo(() => getByTags(["нов"]), []);
  return (
    <>
      <NavBanner contentType={ContentType.INFO} content="Нови продукти" />
      <DisplayProducts products={filteredProducts} />
    </>
  );
};
