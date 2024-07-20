import { useParams } from "react-router-dom";
import "./byCategoryProducts.scss";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getByCategory } from "../../data/getData/getFilteredProducts";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";

export const ByCategoryProducts = () => {
  const { param: category } = useParams();

  const products = getByCategory(category || "");

  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content={category || ""} />
      <DisplayProducts products={products} />
    </div>
  );
};
