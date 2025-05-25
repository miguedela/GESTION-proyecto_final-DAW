import { useCallback, useState } from "react"; // Asegúrate de importar useCallback
import { useNavigate } from "react-router-dom";
import { createDish, deleteDish, getDishById, updateDish } from "../api/dish.api";
import { IDish } from "../types/Dish";
import { setMessageError } from "../utils/utilsFunctions";

const useDish = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCreateDish = useCallback(async (menuId: string, dish: IDish) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createDish(menuId, dish);
            return response;
        } catch (err) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleUpdateDish = useCallback(async (dish: IDish) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateDish(dish);
            return response;
        } catch (err) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDeleteDish = useCallback(async (dishId: string, restaurantId: string) => {
        setLoading(true);
        setError(null);
        try {
            await deleteDish(dishId);
            navigate(`/staff/restaurant/${restaurantId}/menu`);
        } catch (err) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const handleGetDishById = useCallback(async (dishId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getDishById(dishId);
            return response.data;
        } catch (err) {
            setMessageError(err, setError);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        handleCreateDish,
        handleUpdateDish,
        handleDeleteDish,
        handleGetDishById
    };
};

export default useDish;