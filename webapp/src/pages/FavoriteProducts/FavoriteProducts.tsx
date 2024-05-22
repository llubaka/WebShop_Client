import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getFavorites } from "../../data/getData/getFilteredProducts";
import "./favoriteProducts.scss";

export const FavoriteProducts = () => {
  const favoriteProducts = getFavorites();

  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content="Любими" />
      <DisplayProducts products={favoriteProducts} />
    </div>
  );
};
