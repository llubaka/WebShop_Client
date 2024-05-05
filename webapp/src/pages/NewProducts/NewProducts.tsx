import { useMemo } from "react";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { getByTags } from "../../data/getData/getFilteredProducts";
import "./newProducts.scss";

export const NewProducts = () => {
  const filteredProducts = useMemo(() => getByTags(["нов"]), []);
  return <DisplayProducts products={filteredProducts} />;
};
