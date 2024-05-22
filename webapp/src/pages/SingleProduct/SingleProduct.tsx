import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getById } from "../../data/getData/getFilteredProducts";
import "./singleProduct.scss";
import { useParams } from "react-router";

export const SingleProduct = () => {
  const { param: id } = useParams();

  const product = getById(id as string);
  return (
    <>
      <NavBanner contentType={ContentType.INFO} content={product.info} />
    </>
  );
};
