import {SetStateFunc, SingleItem} from "../types/Types.ts";

export const updateStorage = (
    storageKey: string,
    id: number,
    item: SingleItem,
    favorites: SingleItem[],
    setFavorites: SetStateFunc<SingleItem[] | []>,
): void => {
    localStorage.setItem(`${storageKey}-${id}`, 'true');
    const array: SingleItem[] = [...favorites, item];
    setFavorites(array);
    localStorage.setItem(storageKey, JSON.stringify(array));
};

export const removeFromStorage = (
    storageKey: string,
    id: number,
    favorites: SingleItem[],
    setFavorites: SetStateFunc<SingleItem[] | []>,
): void => {
    localStorage.removeItem(`${storageKey}-${id}`);
    const array: SingleItem[] = favorites.filter((item: SingleItem) => item.id !== id);
    setFavorites(array);
    localStorage.setItem(storageKey, JSON.stringify(array));
};