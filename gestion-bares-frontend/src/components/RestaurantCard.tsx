import { useAtom } from "jotai";
import { userAtom } from "../atoms/user.atom";
import { IRestaurant } from "../types/Restaurants";

export const RestaurantCard = ({ restaurant }: { restaurant: IRestaurant }) => {
    const [user] = useAtom(userAtom);

    const handleClick = () => {
        localStorage.setItem("restaurantId", restaurant.id);
        if (user)
            window.location.href = "/restaurant/info";
        else
            window.location.href = "/restaurant";
    };

    return (
        <div
            onClick={handleClick}
            className="block group cursor-pointer"
        >
            <div className="rounded-xl shadow-lg p-6 bg-white mb-6 border border-neutral-200 transition-transform transform group-hover:scale-105 group-hover:shadow-xl duration-200">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-neutral-800 group-hover:text-primary-600 transition-colors">{restaurant.name}</h2>
                        <p className="text-sm text-neutral-500">{restaurant.address}</p>
                    </div>
                </div>
                <div className="space-y-1 text-neutral-700 text-sm">
                    <p><span className="font-semibold">Teléfono:</span> {restaurant.phone}</p>
                </div>
                {restaurant.description && (
                    <p className="mt-3 text-xs text-neutral-500">{restaurant.description}</p>
                )}
            </div>
        </div>
    );
};