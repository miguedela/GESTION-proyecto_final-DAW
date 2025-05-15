import { IDish } from "./Dish";

export interface IMenu {
    id: string;
    dishes: IDish[];
}