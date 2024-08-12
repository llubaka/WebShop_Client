import { createContext, useContext } from "react";

export type SeenType = Set<string>;

export type SetSeenType = (imgSrc: string) => void;

export type SeenContextType = {
  seen: SeenType;
  setSeen: SetSeenType;
};

export const SeenContext = createContext<SeenContextType | null>(null);

export const useSeenContext = (): SeenContextType => {
  if (!SeenContext) throw new Error("Seen Context was not provided!");

  return useContext(SeenContext) as SeenContextType;
};
