import { Basket } from "./Basket";
interface Item{
    id: string;
    name: string;
    amount: number;
    price: number;
    basket: Basket;
};

export type {Item}