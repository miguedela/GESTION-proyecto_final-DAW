import { useEffect, useState } from "react";
import { loadMenu } from "../../../api/menu.api";
import { IDish } from "../../../types/Dish";
import { IMenu } from "../../../types/Menu";

export const RestaurantMenu = () => {
    const [menu, setMenu] = useState<IMenu>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            const restaurantId = localStorage.getItem("restaurantId");
            if (!restaurantId) {
                console.error("No restaurantId found in localStorage");
                return;
            }

            setLoading(true);
            try {
                const menuData = await loadMenu(restaurantId);
                setMenu(menuData.data);
            } catch (error) {
                console.error("Error loading menu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!menu) {
        return <div>No menu available</div>;
    }

    return (
        <div>
            <h1>Menu</h1>
            <ul>
                {menu.dishes.map((dish: IDish) => (
                    <li key={dish.id}>{dish.name} - {dish.price}€</li>
                ))}
            </ul>
        </div>
    );
};
