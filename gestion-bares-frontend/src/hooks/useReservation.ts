import { useState } from "react";
import { registerReservation, deleteReservation, updateReservation, getReservationById, loadReservations, loadReservationsByRestaurant } from "../api/reservations.api";
import { IReservation } from "../types/Reservation";
import { setMessageError } from "../utils/utilsFunctions";

const useReservation = () => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [reservation, setReservation] = useState<IReservation | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Crear reserva
    const handleCreateReservation = async (reservation: IReservation) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await registerReservation(reservation);
            setReservation(data);
            return data;
        } catch (err: unknown) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar reserva
    const handleDeleteReservation = async (reservationId: string) => {
        setLoading(true);
        setError(null);
        try {
            await deleteReservation(reservationId);
            setReservations(prev => prev.filter(r => r.id !== reservationId));
        } catch (err: unknown) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    // Actualizar reserva
    const handleUpdateReservation = async (reservation: IReservation) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await updateReservation(reservation);
            setReservation(data);
            setReservations(prev => prev.map(r => r.id === data.id ? data : r));
            return data;
        } catch (err: unknown) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    // Obtener reserva por ID
    const handleGetReservationById = async (reservationId: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await getReservationById(reservationId);
            setReservation(data);
            return data;
        } catch (err: unknown) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    // Cargar reservas por usuario
    const handleLoadReservationsByCustomer = async (customerId: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await loadReservations(customerId);
            setReservations(data);
        } catch (err: unknown) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    // Cargar reservas por restaurante
    const handleLoadReservationsByRestaurant = async (restaurantId: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await loadReservationsByRestaurant(restaurantId);
            setReservations(data);
        } catch (err: unknown) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    return {
        reservations,
        reservation,
        loading,
        error,
        handleCreateReservation,
        handleDeleteReservation,
        handleUpdateReservation,
        handleGetReservationById,
        handleLoadReservationsByCustomer,
        handleLoadReservationsByRestaurant,
    };
};

export default useReservation;