import { createContext, useContext } from "react";

export type CartType = Array<{ productId: string; count: number }>;

export type AddProductInCartFuncType = (productId: string) => void;

export type CartContextType = {
  cart: CartType;
  addProductInCart: AddProductInCartFuncType;
};

export const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = (): CartContextType => {
  if (!CartContext) throw new Error("Cart Context was not provided!");

  return useContext(CartContext) as CartContextType;
};
