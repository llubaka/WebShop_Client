import "./product.scss";
import { getSingleProduct } from "../../helpers/getSingleProduct";
import { useCartContext } from "../../context/cartContext";
import { useFavoriteContext } from "../../context/favoriteContext";
import styled from "styled-components";
import { useCallback } from "react";

interface IProduct {
  id: string;
}

export const Product: React.FC<IProduct> = ({ id }) => {
  const { addProductInCart } = useCartContext();
  const { favorites, addFavorite } = useFavoriteContext();

  const handleAddInCartClick = () => {
    addProductInCart(id);
  };

  const handleAddFavoriteClick = () => {
    addFavorite(id);
  };

  const isFavorite = useCallback(() => {
    return favorites.includes(id);
  }, [favorites, id]);

  const product = getSingleProduct(id);
  const hasDiscount = !!product.discount;
  const mainPrice = hasDiscount ? ((+product.price * (100 - product.discount)) / 100).toFixed(2) : product.price;

  const source = `/products/${product.imageUrl}`;
  const altAtr = product.imageUrl.split(".")[0];
  const discountText = `-${product.discount}%`;

  return (
    <div className="product-container">
      <div className="product-container__image">
        <div className="product-image">
          <div className="product-image__actions">
            <button onClick={handleAddFavoriteClick} className="product-image__actions--add-favorite">
              <SpanStyled className="product-image__actions--add-favorite--heart-icon" isFavorite={isFavorite()}>
                &#10084;
              </SpanStyled>
            </button>
            {!!product.discount && <div className="product-image__actions--discount">{discountText}</div>}
          </div>
          <img className="product-image__image" src={source} alt={altAtr} />
        </div>
      </div>
      <p className="product-container__info">{product.info}</p>
      <div className="product-container__price">
        {mainPrice}лв.{hasDiscount && <span className="product-container__price--discount">{product.price}лв.</span>}
      </div>
      <button onClick={handleAddInCartClick} className="product-container__add-to-cart-button">
        Добави в количката
      </button>
    </div>
  );
};

const SpanStyled = styled("div")<{ isFavorite: boolean }>(({ isFavorite }) => ({
  display: "inline-block",
  color: isFavorite ? "#ddd" : "gold",
}));
