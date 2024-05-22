import { useParams } from "react-router-dom";
import "./byCategoryProducts.scss";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";

export const ByCategoryProducts = () => {
  const { param: category } = useParams();
  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content={category || ""} />
    </div>
  );
};
