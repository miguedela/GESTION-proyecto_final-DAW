export enum Status {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
}

export interface IReservation {
    id: string;
    date: Date;
    time: string;
    numberOfPeople: number;
    specialRequests?: string;
    status: string;
    customerId: string;
    restaurantId: string;
}