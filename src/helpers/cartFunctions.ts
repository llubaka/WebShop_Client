import { CartType } from "../context/cartContext";
import { getById } from "../data/getData/getFilteredProducts";
import Settings from "../settings/appSettings.json";

export const mapCartToProducts = (cart: CartType) => {
  return cart.map((el) => {
    return {
      product: getById(el.productId),
      count: el.count,
      isDeleted: false,
    };
  });
};

//Price without discount and without delivery
export const calcFullPrice = (cart: CartType) =>
  mapCartToProducts(cart).reduce((prev, { product, count }) => {
    const price = (+product.price * count).toFixed(2);

    return +price + prev;
  }, 0);

//Price with discount and without delivery
export const calcFullPriceWithDiscount = (cart: CartType) =>
  mapCartToProducts(cart).reduce((prev, { product, count }) => {
    const hasDiscount = !!product.discount;
    const price = (+product.price * count).toFixed(2);
    const mainPrice = hasDiscount
      ? ((+price * (100 - product.discount)) / 100).toFixed(2)
      : price;

    return +mainPrice + prev;
  }, 0);

export const calcDeliveryFee = Settings.deliveryFee;

export const calcFullPriceWithDiscountAndDelivery = (cart: CartType) =>
  calcFullPriceWithDiscount(cart) > Settings.freeDeliveryFrom
    ? calcFullPriceWithDiscount(cart)
    : calcFullPriceWithDiscount(cart) + calcDeliveryFee;
