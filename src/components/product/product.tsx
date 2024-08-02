import "./product.scss";
import { useCartContext } from "../../context/cartContext";
import { useFavoriteContext } from "../../context/favoriteContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getSingleProductRouteLink } from "../../globals/Routes";
import { getImageUrl } from "../../data/getData/getImageUrl";
import { getById } from "../../data/getData/getFilteredProducts";
import { HeartSvg } from "../../svg/Heart";

interface IProduct {
  id: string;
}

export const Product: React.FC<IProduct> = ({ id }) => {
  const { addProductInCart } = useCartContext();
  const { favorites, addFavorite } = useFavoriteContext();
  const navigate = useNavigate();

  const handleAddInCartClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    addProductInCart(id, true);
  };

  const handleAddFavoriteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    addFavorite(id);
  };

  const handleNavigate = () => {
    navigate(getSingleProductRouteLink(id));
  };

  const isFavorite = useCallback(() => {
    return favorites.includes(id);
  }, [favorites, id]);

  const product = getById(id);

  if (!product) return <></>;

  const hasDiscount = !!product.discount;
  const mainPrice = hasDiscount
    ? ((+product.price * (100 - product.discount)) / 100).toFixed(2)
    : product.price;

  const source = getImageUrl(product.imageUrl);
  const altAtr = product.imageUrl.split(".")[0];
  const discountText = `-${product.discount}%`;

  return (
    <div className="product-container">
      <div onClick={handleNavigate} className="product-container__shadow">
        <div className="product-container__image">
          <div className="product-image">
            <div className="product-image__actions">
              <button
                onClick={handleAddFavoriteClick}
                className="product-image__actions--add-favorite"
              >
                <span className="product-image__actions--add-favorite--heart-icon">
                  <HeartSvg color={isFavorite() ? "gold" : "#ddd"} />
                </span>
              </button>
              {!!product.discount && (
                <div className="product-image__actions--discount">
                  {discountText}
                </div>
              )}
            </div>
            <img className="product-image__image" src={source} alt={altAtr} />
          </div>
        </div>
        <p className="product-container__info">{product.info}</p>
        <div className="product-container__price">
          {mainPrice}лв.
          {hasDiscount && (
            <span className="product-container__price--discount">
              {product.price}лв.
            </span>
          )}
        </div>
        <button
          onClick={handleAddInCartClick}
          className="product-container__add-to-cart-button"
        >
          Добави в количката
        </button>
      </div>
    </div>
  );
};
