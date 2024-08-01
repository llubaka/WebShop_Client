import { useState } from "react";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getById, getByIds } from "../../data/getData/getFilteredProducts";
import {
  getLocalStorageItem,
  LocalStorageKeys,
} from "../../helpers/localStorageFunctions";
import "./cart.scss";
import { ProductType } from "../../globals/ProductType";
type CartProductType = { count: number; product: ProductType }[];

export const Cart = () => {
  const [products, setProducts] = useState<CartProductType>();
  const x = (): CartProductType => {
    const lsCart = getLocalStorageItem(LocalStorageKeys.CART) as [] | null;
    if (!lsCart) throw new Error("");

    return lsCart.map((el: any) => {
      return {
        product: getById(el.productId),
        count: el.count as number,
      };
    });
  };
  console.log(x());

  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content="Количка" />
    </div>
  );
};
