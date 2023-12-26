import {Dispatch, SetStateAction} from "react";

export type Category = {
    id: number;
    name: string;
    image: string;
}

export type SingleItem = {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
}

export type Filter = {
    search?: string;
    sort: string;
}

export type SetStateFunc<T> =  Dispatch<SetStateAction<T>>;
