export enum LocalStorageKeys {
  CART = "cart",
}

export const getLocalStorageItem = (key: LocalStorageKeys) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);

  return null;
};

export const setLocalStorageItem = (key: LocalStorageKeys, value: {} | []) => {
  localStorage.setItem(key, JSON.stringify(value));
};
