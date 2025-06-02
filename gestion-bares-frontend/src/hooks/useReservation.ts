import { useState } from "react";
import { deleteReservation, getReservationById, loadReservations, loadReservationsByRestaurant, registerReservation, updateReservation } from "../api/reservations.api";
import { showErrorToast, showSuccessToast } from "../components/ToastUtils";
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
            showSuccessToast("Reserva creada exitosamente.");
            return data;
        } catch (err: unknown) {
            setMessageError(err, setError);
            showErrorToast("No hay disponible para la fecha y hora seleccionadas. Por favor, elige otra.");
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
            showSuccessToast("Reserva eliminada exitosamente.");
        } catch (err: unknown) {
            setMessageError(err, setError);
            showErrorToast("Error al eliminar la reserva. Por favor, inténtalo de nuevo.");
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
            showSuccessToast("Reserva actualizada exitosamente.");
            return data;
        } catch (err: unknown) {
            setMessageError(err, setError);
            showErrorToast("Error al actualizar la reserva. Por favor, inténtalo de nuevo.");
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
            showSuccessToast("Reserva obtenida exitosamente.");
            return data;
        } catch (err: unknown) {
            setMessageError(err, setError);
            showErrorToast("Error al obtener la reserva. Por favor, inténtalo de nuevo.");
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
            showErrorToast("Error al cargar las reservas. Por favor, inténtalo de nuevo.");
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
            showSuccessToast("Reservas del restaurante cargadas exitosamente.");
        } catch (err: unknown) {
            setMessageError(err, setError);
            showErrorToast("Error al cargar las reservas del restaurante. Por favor, inténtalo de nuevo.");
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