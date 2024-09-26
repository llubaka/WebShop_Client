import { ProductType } from "../../globals/ProductType";
import { LocalStorageKeys, getLocalStorageItem } from "../../helpers/localStorageFunctions";
import { getAllProducts } from "./getAllProducts";

export const getByTags = (tags: string[]): ProductType[] => {
  return getAllProducts().filter((product) => product.tags.some((tag) => tags.includes(tag)));
};

export const getById = (id: string): ProductType => {
  const product = getAllProducts().find((product) => product.id === id);
  if (!product) throw new Error(`No product with id: ${id}`);

  return product;
};

export const getById_NoError = (id: string): ProductType | undefined => {
  return getAllProducts().find((product) => product.id === id);
};

export const getByIds = (ids: string[]): ProductType[] => {
  return getAllProducts().filter((prod) => ids.includes(prod.id));
};

export const getFavorites = () => {
  const favoriteIds = getLocalStorageItem(LocalStorageKeys.FAVORITES);

  return getByIds(favoriteIds);
};
