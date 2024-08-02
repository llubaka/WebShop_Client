import { useEffect, useState } from "react";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getById } from "../../data/getData/getFilteredProducts";
import "./cart.scss";
import { ProductType } from "../../globals/ProductType";
import { getImageUrl } from "../../data/getData/getImageUrl";
import { useCartContext } from "../../context/cartContext";
type CartProductType = { count: number; product: ProductType }[];

export const Cart = () => {
  const { cart, addProductInCart, decreaseProductInCart } = useCartContext();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useState<CartProductType>();

  useEffect(() => {
    setProducts(() =>
      cart.map((el) => {
        return {
          product: getById(el.productId),
          count: el.count,
        };
      })
    );
  }, [cart]);

  const fullPrice =
    products &&
    products.reduce((prev, { product, count }) => {
      const hasDiscount = !!product.discount;
      const price = (+product.price * count).toFixed(2);
      const mainPrice = hasDiscount
        ? ((+price * (100 - product.discount)) / 100).toFixed(2)
        : price;

      return +mainPrice + prev;
    }, 0);

  const decreaseItem = (id: string) => {
    decreaseProductInCart(id);
  };

  const increaseItem = (id: string) => {
    addProductInCart(id);
  };
  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content="Количка" />
      <div className="cart-content">
        {products &&
          products.map(({ product, count }) => {
            const source = getImageUrl(product.imageUrl);
            const altAtr = product.imageUrl.split(".")[0];
            const discountText = `-${product.discount}%`;
            const hasDiscount = !!product.discount;
            const price = (+product.price * count).toFixed(2);
            const mainPrice = hasDiscount
              ? ((+price * (100 - product.discount)) / 100).toFixed(2)
              : price;
            return (
              <div>
                <div className="cart-content__item">
                  {hasDiscount && (
                    <div className="cart-content__item--image__container--discount">
                      {discountText}
                    </div>
                  )}
                  <img
                    className="cart-content__item--image__container--image"
                    src={source}
                    alt={altAtr}
                  />

                  <div className="cart-content__item--info">{product.info}</div>
                </div>
                <div className="cart-price-count">
                  <div className="cart-price-count--count">
                    <button
                      className="cart-price-count--count__button"
                      onClick={() => decreaseItem(product.id)}
                    >
                      -
                    </button>
                    <div>{count}</div>
                    <button
                      className="cart-price-count--count__button"
                      onClick={() => increaseItem(product.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-price-count--price">
                    <div className="cart-price-count--price__content">
                      {hasDiscount && (
                        <div className="cart-price-count--price__content--discount">
                          {price}лв.
                        </div>
                      )}
                      <div className="cart-price-count--price__content--full-price">
                        {mainPrice}лв.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="cart-order">
        <div className="cart-order--price">
          <div>Сума с ДДС</div>
          <div>{fullPrice && fullPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
