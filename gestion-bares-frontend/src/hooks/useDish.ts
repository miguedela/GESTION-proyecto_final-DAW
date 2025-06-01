import { useCallback, useState } from "react"; // Asegúrate de importar useCallback
import { useNavigate } from "react-router-dom";
import { createDish, deleteDish, getDishById, updateDish } from "../api/dish.api";
import { IDish } from "../types/Dish";
import { setMessageError } from "../utils/utilsFunctions";
import { showErrorToast, showSuccessToast } from "../components/ToastUtils";

const useDish = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCreateDish = useCallback(async (menuId: string, dish: IDish) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createDish(menuId, dish);
            showSuccessToast("Plato creado exitosamente.");
            return response;
        } catch (err) {
            setMessageError(err, setError);
            showErrorToast("Error al crear el plato. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleUpdateDish = useCallback(async (dish: IDish) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateDish(dish);
            showSuccessToast("Plato actualizado exitosamente.");
            return response;
        } catch (err) {
            setMessageError(err, setError);
            showErrorToast("Error al actualizar el plato. Por favor, inténtalo de nuevo.");
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
            showSuccessToast("Plato eliminado exitosamente.");
        } catch (err) {
            setMessageError(err, setError);
            showErrorToast("Error al eliminar el plato. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const handleGetDishById = useCallback(async (dishId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getDishById(dishId);
            showSuccessToast("Plato obtenido exitosamente.");
            return response.data;
        } catch (err) {
            setMessageError(err, setError);
            showErrorToast("Error al obtener el plato. Por favor, inténtalo de nuevo.");
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