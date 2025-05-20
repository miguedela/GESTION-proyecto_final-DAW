import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { addStaffToRestaurant, deleteRestaurantStaff, getRestaurantsByStaff } from "../api/restaurantstaff.api";
import { restaurantAtom } from "../atoms/restaurants.atom";
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
            return data;
        } catch (err: unknown) {
            setMessageError(err, setError);
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
        } catch (err: unknown) {
            setMessageError(err, setError);
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