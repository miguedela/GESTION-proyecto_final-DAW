import { useAtom } from "jotai";
import { userAtom } from "../atoms/user.atom";
import { IRestaurant } from "../types/Restaurants";
import { Roles } from "../types/User";

export const RestaurantCard = ({ restaurant }: { restaurant: IRestaurant }) => {
    const [user] = useAtom(userAtom);

    const handleClick = () => {
        localStorage.setItem("restaurantId", restaurant.id);
        if (user && user.role !== Roles.ADMIN) {
            if (user.role === Roles.CUSTOMER)
                window.location.href = "/restaurant/info";
            else if (user.role === Roles.STAFF)
                window.location.href = `/staff/restaurant/info`;
        } else {
            window.location.href = "/restaurant";
        }
    };

    return (
        <div
            onClick={handleClick}
            className="block cursor-pointer"
        >
            <div className="rounded-xl shadow-sm p-6 bg-white mb-6 border border-slate-200 transition-transform transform hover:scale-105 hover:shadow-md duration-200 active:scale-95">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-amber-600 hover:text-amber-500 transition-colors">{restaurant.name}</h2>
                        <p className="text-sm text-slate-500">{restaurant.address}</p>
                    </div>
                </div>
                <div className="space-y-1 text-slate-700 text-sm">
                    <p><span className="font-semibold text-slate-900">Teléfono:</span> {restaurant.phone}</p>
                </div>
                {restaurant.description && (
                    <p className="mt-3 text-xs text-slate-400">{restaurant.description}</p>
                )}
            </div>
        </div>
    );
};