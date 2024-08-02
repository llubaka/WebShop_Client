import { createContext, useContext } from "react";

export type CartType = Array<{ productId: string; count: number }>;

export type AddProductInCartFuncType = (productId: string) => void;

export type IsProductInCartFuncType = (productId: string) => boolean;

export type DecreaseProductInCartFuncType = (productId: string) => void;

export type RemoveProductInCartFuncType = (productId: string) => void;

export type CartContextType = {
  cart: CartType;
  addProductInCart: AddProductInCartFuncType;
  decreaseProductInCart: DecreaseProductInCartFuncType;
  removeProductInCart: RemoveProductInCartFuncType;
  isProductInCart: IsProductInCartFuncType;
};

export const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = (): CartContextType => {
  if (!CartContext) throw new Error("Cart Context was not provided!");

  return useContext(CartContext) as CartContextType;
};
