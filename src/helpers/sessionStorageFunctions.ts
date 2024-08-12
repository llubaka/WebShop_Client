export enum SessionStorageKeys {
  SEEN_IMAGES = "seen",
}

export const getSessionStorageItem = (key: SessionStorageKeys) => {
  const data = sessionStorage.getItem(key);
  if (data) return JSON.parse(data);

  return null;
};

export const setSessionStorageItem = (
  key: SessionStorageKeys,
  value: {} | []
) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
