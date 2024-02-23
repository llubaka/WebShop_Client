import { createContext, useContext } from "react";

export const CartContext = createContext<Array<string> | null>(null);

export const useCartContext = () => useContext(CartContext);
