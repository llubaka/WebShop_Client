import { ProductType } from "../../globals/ProductType";
import { LocalStorageKeys, getLocalStorageItem } from "../../helpers/localStorageFunctions";
import { getAllProducts } from "./getAllProducts";

export const getByCategory = (category: string): ProductType[] => {
  return getAllProducts().filter((product) => product.category === category);
};

export const getByTags = (tags: string[]): ProductType[] => {
  return getAllProducts().filter((product) => product.tags.some((tag) => tags.includes(tag)));
};

export const getById = (id: string): ProductType => {
  return getAllProducts().filter((product) => product.id === id)[0];
};

export const getByIds = (ids: string[]): ProductType[] => {
  return getAllProducts().filter((prod) => ids.includes(prod.id));
};

export const getFavorites = () => {
  const favoriteIds = getLocalStorageItem(LocalStorageKeys.FAVORITES);

  return getByIds(favoriteIds);
};
