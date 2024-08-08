import { useEffect, useState } from "react";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getById } from "../../data/getData/getFilteredProducts";
import "./cart.scss";
import { ProductType } from "../../globals/ProductType";
import { getImageUrl } from "../../data/getData/getImageUrl";
import { useCartContext } from "../../context/cartContext";
import Settings from "../../settings/appSettings.json";
import { useNavigate } from "react-router-dom";
import {
  getHomeRouteLink,
  getSingleProductRouteLink,
} from "../../globals/Routes";
import {
  getLocalStorageItem,
  LocalStorageKeys,
} from "../../helpers/localStorageFunctions";
import { ImageWrapper } from "../../components/common/ImageWrapper/ImageWrapper";
import { TrashCan } from "../../svg/TrashCan";

type CartProductType = { count: number; product: ProductType }[];

export const Cart = () => {
  const { cart, addProductInCart, decreaseProductInCart, removeProductInCart } =
    useCartContext();

  const [products, setProducts] = useState<CartProductType>();
  const navigate = useNavigate();

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

  // Go back to home if there is no products in the Cart
  useEffect(() => {
    try {
      const lsCart = getLocalStorageItem(LocalStorageKeys.CART);

      if (!lsCart || lsCart.length === 0) navigate(getHomeRouteLink());
    } catch (error) {
      navigate(getHomeRouteLink());
    }
  }, [navigate, cart]);

  const fullPrice =
    products &&
    products.reduce((prev, { product, count }) => {
      const price = (+product.price * count).toFixed(2);

      return +price + prev;
    }, 0);

  const fullPriceWithDiscount =
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
    addProductInCart(id, false);
  };

  const handleProductClick = (id: string) => {
    navigate(getSingleProductRouteLink(id));
  };

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    removeProductInCart(id);
  };

  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content="Количка" />
      <div className="cart-content">
        {products &&
          products.map(({ product, count }) => {
            const source = getImageUrl(product.imageUrl);
            const discountText = `-${product.discount}%`;
            const hasDiscount = !!product.discount;
            const price = (+product.price * count).toFixed(2);
            const mainPrice = hasDiscount
              ? ((+price * (100 - product.discount)) / 100).toFixed(2)
              : price;

            return (
              <div key={product.id}>
                <div
                  onClick={() => handleProductClick(product.id)}
                  role="link"
                  className="cart-content__item"
                >
                  <div
                    onClick={(e) => handleDeleteClick(e, product.id)}
                    className="cart-content__item--trashcan"
                  >
                    <TrashCan color="#a7a7a7" />
                  </div>

                  <div className="cart-content__item--image__container--image">
                    {hasDiscount && (
                      <div className="cart-content__item--image__container--discount">
                        {discountText}
                      </div>
                    )}
                    <ImageWrapper src={source} height="100px" width="100px" />
                  </div>
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
                <hr className="hr-separator" />
              </div>
            );
          })}
      </div>
      <div className="cart-order">
        {fullPrice &&
          fullPriceWithDiscount &&
          fullPrice !== fullPriceWithDiscount && (
            <>
              <div className="cart-order--full-price">
                <div>Пълна цена</div>
                <div className="cart-order--full-price__price">
                  {fullPrice && fullPrice.toFixed(2)}лв.
                </div>
              </div>
              <div className="cart-order--discount">
                <div>Отстъпка</div>
                {fullPrice && fullPriceWithDiscount && (
                  <div className="cart-order--full-price__price">
                    -{(fullPrice - fullPriceWithDiscount).toFixed(2)}лв.
                  </div>
                )}
              </div>
            </>
          )}
        <div className="cart-order--price">
          <div>Общо</div>
          <div className="cart-order--price__price">
            {fullPriceWithDiscount && fullPriceWithDiscount.toFixed(2)}лв.
          </div>
        </div>
        {(Settings.freeDeliveryFrom || Settings.freeDeliveryFrom === 0) &&
          fullPriceWithDiscount && (
            <div className="cart-order--delivery">
              <div>Доставка</div>
              <div className="cart-order--delivery__price">
                {fullPriceWithDiscount > Settings.freeDeliveryFrom
                  ? "0.00лв."
                  : `${Settings.deliveryFee.toFixed(2)}лв.`}
              </div>
            </div>
          )}
        <div className="cart-order--pay-price">
          <div>Сума</div>
          <div className="cart-order--pay-price__dds">с ДДС</div>
          <div className="cart-order--pay-price__price">
            {fullPriceWithDiscount &&
            fullPriceWithDiscount > Settings.freeDeliveryFrom
              ? `${fullPriceWithDiscount.toFixed(2)}лв.`
              : `${(
                  (fullPriceWithDiscount as number) + Settings.deliveryFee
                ).toFixed(2)}лв.`}
          </div>
        </div>
      </div>
    </div>
  );
};
