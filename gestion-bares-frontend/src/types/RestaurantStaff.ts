import { IRestaurant } from "./Restaurants";
import { IUser } from "./User";

export interface IRestaurantStaff {
    id: string;
    restaurant: IRestaurant;
    staff: IUser;
    assignedAt: Date;
}