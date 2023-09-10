// -------------- local storage --------------
export const STORAGE_INFO = "__INFO__"
export const STORAGE_REMOVE_USERS = "__REMOVE_USERS__"

export const saveToLocal = (key: string, value: any = {}) => {
  value = JSON.stringify(value)
  sessionStorage.setItem(key, value);
}

export const getFromLocal = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) || "{}");
}

export const deleteLocal = (key: string) => {
  sessionStorage.removeItem(key);
}


export const deleteLocalALL = () => {
  sessionStorage.removeItem(STORAGE_INFO);
  sessionStorage.removeItem(STORAGE_REMOVE_USERS);
}
