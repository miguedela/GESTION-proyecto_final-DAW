import { IReservation } from "../types/Reservation";
import httpClient from "../utils/httpClient";

const urlBase = "/reservations";

// Crear una nueva reserva
export const registerReservation = async (reservation: IReservation) => {
    return await httpClient({
        url: `${urlBase}`,
        method: "POST",
        data: reservation,
    });
};

// Eliminar una reserva
export const deleteReservation = async (reservationId: string) => {
    return await httpClient({
        url: `${urlBase}/${reservationId}`,
        method: "DELETE",
    });
};

// Editar una reserva
export const updateReservation = async (reservation: IReservation) => {
    return await httpClient({
        url: `${urlBase}`,
        method: "PUT",
        data: reservation
    });
};

// Obtener una reserva por ID
export const getReservationById = async (reservationId: string) => {
    return await httpClient({
        url: `${urlBase}/${reservationId}`,
        method: "GET",
    });
};

// Cargar reservas de un usuario específico
export const loadReservations = async (customerId: string) => {
    return await httpClient({
        url: `${urlBase}/customer/${customerId}`,
        method: "GET",
    });
}

// Cargar reservas de un restaurante específico
export const loadReservationsByRestaurant = async (restaurantId: string) => {
    return await httpClient({
        url: `${urlBase}/restaurant/${restaurantId}`,
        method: "GET",
    });
}