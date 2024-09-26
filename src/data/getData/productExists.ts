import { getAllProducts } from "./getAllProducts";

export const productExists = (id: string) => {
  return !!getAllProducts().find((product) => product.id === id);
};
