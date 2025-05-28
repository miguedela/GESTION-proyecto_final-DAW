import { IRestaurant } from "./Restaurants";
import { IUser } from "./User";

export enum Status {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
}

export interface IReservation {
    id?: string | null;
    customer: IUser;
    restaurant: IRestaurant;
    reservationNumber: number;
    status: Status;
    reservationTime: Date;
}