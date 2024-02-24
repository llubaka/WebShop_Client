import { createContext, useContext } from "react";

export type FavoriteType = Array<string>;

export type AddFavoriteFuncType = (productId: string) => void;

export type FavoriteContextType = {
  favorites: FavoriteType;
  addFavorite: AddFavoriteFuncType;
};

export const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const useFavoriteContext = (): FavoriteContextType => {
  if (!FavoriteContext) throw new Error("Favorite Context was not provided!");

  return useContext(FavoriteContext) as FavoriteContextType;
};
