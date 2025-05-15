import { useState } from "react";
import { loadRestaurants as loadMenus } from "../api/menu.api";
import { IMenu } from "../types/Menu";
import { setMessageError } from "../utils/utilsFunctions";

const useMenu = () => {
    const [menus, setMenus] = useState<IMenu[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetMenus = async (restaurantId: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await loadMenus(restaurantId);
            setMenus(data);
        } catch (err) {
            setMessageError(err, setError);
            setMenus([]);
        } finally {
            setLoading(false);
        }
    };

    return { menus, loading, error, handleGetMenus };
};

export default useMenu;