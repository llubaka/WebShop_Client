import { useParams } from "react-router-dom";
import "./byTagProducts.scss";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";

export const ByTagProcuts = () => {
  const { param: tag } = useParams();
  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content={tag || ""} />
    </div>
  );
};
