import { useParams } from "react-router-dom";
import "./byTagProducts.scss";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getByTags } from "../../data/getData/getFilteredProducts";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";

export const ByTagProcuts = () => {
  const { param: tag } = useParams();

  const products = getByTags([tag || ""]);

  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content={tag || ""} />
      <DisplayProducts products={products} />
    </div>
  );
};
