import { atom } from "jotai";
import { IPaginationInfo, PaginationInfo } from "../types/Pagination";
import { IRestaurant } from "../types/Restaurants";

interface IRestaurantAtom {
    loading: boolean,
    content: IRestaurant[],
    pagination: IPaginationInfo,
    totalPages: number,
}

const restaurantAtom = atom<IRestaurantAtom>({
    loading: false,
    content: [],
    pagination: new PaginationInfo(),
    totalPages: 1
});

export { restaurantAtom };
