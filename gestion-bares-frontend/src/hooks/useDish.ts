import { useState } from "react";
import { createDish, deleteDish, updateDish } from "../api/dish.api";
import { IDish } from "../types/Dish";
import { setMessageError } from "../utils/utilsFunctions";

const useDish = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateDish = async (menuId: string, dish: IDish) => {
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
    };

    const handleUpdateDish = async (dish: IDish) => {
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
    };

    const handleDeleteDish = async (dishId: string) => {
        setLoading(true);
        setError(null);
        try {
            await deleteDish(dishId);
        } catch (err) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleCreateDish, handleUpdateDish, handleDeleteDish };
};

export default useDish;