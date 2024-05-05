import { useParams } from "react-router-dom";
import "./fromBannerProducts.scss";
import { getSections } from "../../data/getData/getSections";
import { getByCategory, getByIds, getByTags } from "../../data/getData/getFilteredProducts";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { useMemo } from "react";

export const FromBannerProducts = () => {
  const { id } = useParams();
  const section = getSections().filter((sect) => sect.id === id)[0];

  const filteredProducts = useMemo(() => {
    if (section.category) return getByCategory(section.category);
    if (section.tags) return getByTags(section.tags);
    if (section.productsIds) return getByIds(section.productsIds);

    return [];
  }, [section.category, section.productsIds, section.tags]);

  return <DisplayProducts products={filteredProducts} />;
};
