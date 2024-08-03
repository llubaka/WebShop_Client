import { useNavigate } from "react-router-dom";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getFavorites } from "../../data/getData/getFilteredProducts";
import { ProductType } from "../../globals/ProductType";
import "./favoriteProducts.scss";
import { getHomeRouteLink } from "../../globals/Routes";

export const FavoriteProducts = () => {
  const navigate = useNavigate();

  let favoriteProducts: ProductType[] = [];

  const navigateToHome = () => {
    setTimeout(() => {
      navigate(getHomeRouteLink());
    }, 0);
  };

  try {
    favoriteProducts = getFavorites();
    if (favoriteProducts.length === 0) navigateToHome();
  } catch (e) {
    navigateToHome();
  }

  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content="Любими" />
      {favoriteProducts && <DisplayProducts products={favoriteProducts} />}
    </div>
  );
};
