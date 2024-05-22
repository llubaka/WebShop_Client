import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import "./favoriteProducts.scss";

export const FavoriteProducts = () => {
  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content="Любими" />
    </div>
  );
};
