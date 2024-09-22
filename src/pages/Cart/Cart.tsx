import { useEffect, useRef, useState } from "react";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getById } from "../../data/getData/getFilteredProducts";
import "./cart.scss";
import { ProductType } from "../../globals/ProductType";
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
import { TrashCan } from "../../svg/TrashCan";
import { ImageWrapperNoLazy } from "../../components/common/ImageWrapper/ImageWrapperNoLazy";
import {
  calcDeliveryFee,
  calcFullPrice,
  calcFullPriceWithDiscount,
  calcFullPriceWithDiscountAndDelivery,
} from "../../helpers/cartFunctions";

type CartProductType = {
  count: number;
  product: ProductType;
  isDeleted: boolean;
}[];

type CartProps = {
  setVisible: () => void;
};

export const Cart: React.FC<CartProps> = ({ setVisible }) => {
  const { cart, addProductInCart, decreaseProductInCart, removeProductInCart } =
    useCartContext();
  const [products, setProducts] = useState<CartProductType>([]);
  const navigate = useNavigate();
  const isHeightSetRef = useRef(false);

  // Set height of the elements after products are populated from cart.
  // Technique is used to enable transition for height.
  useEffect(() => {
    if (products.length > 0 && !isHeightSetRef.current) {
      products.forEach(({ product: { id } }) => {
        const el = document.getElementById(id);
        if (el) el.style.height = el.offsetHeight + "px";
      });

      isHeightSetRef.current = true;
    }
  }, [products]);

  // If products.length is 0, this means that the products are not yet populated from cart.
  // Splitting the logic in the useEffect for before and after populating the products hook.
  useEffect(() => {
    if (products.length > 0) {
      setProducts((prev) =>
        prev.map((product) => {
          const productInCart = cart.find(
            (cartEl) => cartEl.productId === product.product.id
          );

          if (!productInCart) {
            // Being deleted now
            //
            // Set styles when product from Cart is deleted
            if (!product.isDeleted) {
              const el = document.getElementById(product.product.id);

              if (el) {
                el.style.marginTop = "0px";
                el.style.height = "0px";
                el.style.filter = "blur(10px)";
              }
            }

            return { ...product, isDeleted: true };
          } else {
            return {
              product: getById(productInCart.productId),
              count: productInCart.count,
              isDeleted: false,
            };
          }
        })
      );
    } else {
      setProducts(() =>
        cart.map((el) => {
          return {
            product: getById(el.productId),
            count: el.count,
            isDeleted: false,
          };
        })
      );
    }
  }, [cart, products.length]);

  // Go back to home if there is no products in the Cart.
  // Timeout with 300ms to allow finishing of the animation/transition.
  useEffect(() => {
    try {
      const lsCart = getLocalStorageItem(LocalStorageKeys.CART);

      if (!lsCart || lsCart.length === 0) {
        setTimeout(() => {
          navigate(getHomeRouteLink());
        }, 300);
      }
    } catch (error) {
      navigate(getHomeRouteLink());
    }
  }, [navigate, cart]);

  const fullPrice = calcFullPrice(cart);

  const fullPriceWithDiscount = calcFullPriceWithDiscount(cart);

  const deliveryFee = calcDeliveryFee;

  const fullPriceWithDiscountAndDelivery =
    calcFullPriceWithDiscountAndDelivery(cart);

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
    <div className="cart-container-div">
      <NavBanner contentType={ContentType.INFO} content="Количка" />
      <div className="cart-desktop-container">
        <div className="cart-content">
          {products &&
            products.map(({ product, count }) => {
              const source = product.imageUrl;
              const discountText = `-${product.discount}%`;
              const hasDiscount = !!product.discount;
              const price = (+product.price * count).toFixed(2);
              const mainPrice = hasDiscount
                ? ((+price * (100 - product.discount)) / 100).toFixed(2)
                : price;

              return (
                <div
                  id={product.id}
                  key={product.id}
                  className="cart-content--wrapper"
                >
                  <div className="cart-content--fix-element"> </div>
                  <div
                    onClick={() => handleProductClick(product.id)}
                    role="link"
                    className="cart-content__item"
                  >
                    <div
                      onClick={(e) => handleDeleteClick(e, product.id)}
                      className="cart-content__item--trashcan"
                    >
                      <TrashCan color="rgb(155, 155, 155)" />
                    </div>

                    <div className="cart-content__item--image__container--image">
                      {hasDiscount && (
                        <div className="cart-content__item--image__container--discount">
                          {discountText}
                        </div>
                      )}
                      <ImageWrapperNoLazy
                        src={source}
                        height="100px"
                        width="100px"
                      />
                    </div>
                    <div className="cart-content__item--info">
                      {product.info}
                    </div>
                  </div>
                  <div className="cart-price-count">
                    <div className="cart-price-count--count">
                      <button
                        className="cart-price-count--count__button"
                        onClick={() => decreaseItem(product.id)}
                        aria-label="Decrease count of the product"
                      >
                        -
                      </button>
                      <div>{count}</div>
                      <button
                        className="cart-price-count--count__button"
                        onClick={() => increaseItem(product.id)}
                        aria-label="Increase count of the product"
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
        <div className="cart-desktop-container__prices">
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
          </div>
          <div className="cart-order__delivery-pay-price-container">
            {(Settings.freeDeliveryFrom || Settings.freeDeliveryFrom === 0) &&
              fullPriceWithDiscount && (
                <div className="cart-order--delivery">
                  <div>Доставка</div>
                  <div className="cart-order--delivery__price">
                    {fullPriceWithDiscount > Settings.freeDeliveryFrom ||
                    cart.length === 0
                      ? "0.00лв."
                      : `${deliveryFee.toFixed(2)}лв.`}
                  </div>
                </div>
              )}
            <div className="cart-order--pay-price">
              <div>Сума</div>
              <div className="cart-order--pay-price__dds">с ДДС</div>
              <div className="cart-order--pay-price__price">
                {cart.length === 0
                  ? "0.00лв."
                  : `${fullPriceWithDiscountAndDelivery.toFixed(2)}лв.`}
              </div>
            </div>

            <button
              role="link"
              aria-label="Finish order"
              className="cart-order__delivery-pay-price-container--finish-order"
              onClick={setVisible}
            >
              Завърши поръчката
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
