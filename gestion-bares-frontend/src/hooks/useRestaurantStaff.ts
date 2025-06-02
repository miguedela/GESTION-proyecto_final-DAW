import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { addStaffToRestaurant, deleteRestaurantStaff, getRestaurantsByStaff } from "../api/restaurantstaff.api";
import { restaurantAtom } from "../atoms/restaurants.atom";
import { showErrorToast, showSuccessToast } from "../components/ToastUtils";
import { setMessageError } from "../utils/utilsFunctions";

const useRestaurantStaff = () => {
    const [restaurants, setRestaurants] = useAtom(restaurantAtom);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Asignar staff a restaurante
    const handleAddStaffToRestaurant = async (staffId: string, restaurantId: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await addStaffToRestaurant(staffId, restaurantId);
            showSuccessToast("Staff asignado al restaurante exitosamente.");
            return data;
        } catch (err: unknown) {
            setMessageError(err, setError);
            showErrorToast("Error al asignar el staff al restaurante. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    // Obtener restaurantes asignados a un staff
    const handleGetRestaurantsByStaff = useCallback(async (staffId: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await getRestaurantsByStaff(staffId);
            setRestaurants(prev => ({
                ...prev,
                content: data,
                loading: false,
            }));
            return data;
        } catch (err: unknown) {
            setMessageError(err, setError);
            showErrorToast("Error al obtener los restaurantes. Por favor, inténtalo de nuevo.");
            return [];
        } finally {
            setLoading(false);
        }
    }, [setRestaurants]);

    // Eliminar asignación staff-restaurante
    const handleDeleteRestaurantStaff = async (restaurantStaffId: string) => {
        setLoading(true);
        setError(null);
        try {
            await deleteRestaurantStaff(restaurantStaffId);
            setRestaurants(prev => ({
                ...prev,
                content: prev.content.filter(r => r.id !== restaurantStaffId),
            }));
            showSuccessToast("Staff eliminado del restaurante exitosamente.");
        } catch (err: unknown) {
            setMessageError(err, setError);
            showErrorToast("Error al eliminar el staff del restaurante. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return {
        restaurants,
        loading,
        error,
        handleGetRestaurantsByStaff,
        handleAddStaffToRestaurant,
        handleDeleteRestaurantStaff,
    };
};

export default useRestaurantStaff;