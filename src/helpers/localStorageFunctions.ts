import { decrypt, encrypt } from "./encryption";

export enum LocalStorageKeys {
  CART = "b15cd43e-af19-4138-b79c-ea73263c76a3",
  FAVORITES = "f49f5927-9185-4875-a4de-151f13d165ed",
  SEND_EMAILS = "8895b839-4750-483d-a650-cde1b70a4761",
  LAST_ORDER = "44f62f43-4166-4829-a31a-0a1ffc1b2109",
  AGREED_TO_POLICY = "d2c15bac-e025-47ce-a9e4-025677357138",
}

export const getLocalStorageItem = (key: LocalStorageKeys) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(decrypt(data, 3));

  return null;
};

export const setLocalStorageItem = (key: LocalStorageKeys, value: {} | []) => {
  localStorage.setItem(key, encrypt(JSON.stringify(value), 3));
};

export const clearLocalStorageItem = (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
};
