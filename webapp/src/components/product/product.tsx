import "./product.scss";
import { getSingleProduct } from "../../helpers/getSingleProduct";
import { ProductImage } from "../common/ProductImageSection";
import { useCartContext } from "../../context/cartContext";

interface IProduct {
  id: string;
}

export const Product: React.FC<IProduct> = ({ id }) => {
  const { addProductInCart } = useCartContext();

  const handleOnClick = () => {
    addProductInCart(id);
  };

  const product = getSingleProduct(id);
  const hasDiscount = !!product.discount;
  const mainPrice = hasDiscount ? ((+product.price * (100 - product.discount)) / 100).toFixed(2) : product.price;

  return (
    <div className="product-container">
      <div className="product-container__image">
        <ProductImage src={product.imageUrl} discount={product.discount} />
      </div>
      <p className="product-container__info">{product.info}</p>
      <div className="product-container__price">
        {mainPrice}лв.{hasDiscount && <span className="product-container__price--discount">{product.price}лв.</span>}
      </div>
      <button onClick={handleOnClick} className="product-container__add-to-cart-button">
        Добави в количката
      </button>
    </div>
  );
};
