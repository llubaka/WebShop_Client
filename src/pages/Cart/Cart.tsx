import { useCallback, useState } from "react";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getById } from "../../data/getData/getFilteredProducts";
import {
  getLocalStorageItem,
  LocalStorageKeys,
} from "../../helpers/localStorageFunctions";
import "./cart.scss";
import { ProductType } from "../../globals/ProductType";
import { getImageUrl } from "../../data/getData/getImageUrl";
type CartProductType = { count: number; product: ProductType }[];

export const Cart = () => {
  const getCartProducts = useCallback((): CartProductType => {
    const lsCart = getLocalStorageItem(LocalStorageKeys.CART) as [] | null;
    if (!lsCart) throw new Error("");

    return lsCart.map((el: any) => {
      return {
        product: getById(el.productId),
        count: el.count as number,
      };
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, _] = useState<CartProductType>(getCartProducts());
  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content="Количка" />
      <div className="cart-content">
        {products.map(({ product, count }) => {
          const source = getImageUrl(product.imageUrl);
          const altAtr = product.imageUrl.split(".")[0];
          const discountText = `-${product.discount}%`;
          return (
            <div>
              <div className="cart-content__item">
                {!!product.discount && (
                  <div className="cart-content__item--image__container--discount">
                    {discountText}
                  </div>
                )}
                <img
                  className="cart-content__item--image__container--image"
                  src={source}
                  alt={altAtr}
                />

                <div>{product.info}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
