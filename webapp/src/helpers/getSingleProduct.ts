import Products from "../products/products.json";

export const getSingleProduct = (id: string) => {
  return Products.filter((pr) => pr.id === id)[0];
};
