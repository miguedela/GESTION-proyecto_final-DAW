import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { userAtom } from "../atoms/user.atom";
import { IRestaurant } from "../types/Restaurants";
import { Roles } from "../types/User";

export const RestaurantCard = ({ restaurant }: { restaurant: IRestaurant }) => {
    const [user] = useAtom(userAtom);

    const linkTo = user.role === Roles.STAFF
        ? `/restaurant/${restaurant.id}`
        : `/staff/restaurant/${restaurant.id}`;

    return (
        <Link
            to={linkTo}
            className="block group"
        >
            <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-neutral-800 mb-6 border border-neutral-200 dark:border-neutral-700 transition-transform transform group-hover:scale-105 group-hover:shadow-xl duration-200 cursor-pointer">
                <div className="flex items-center gap-4 mb-3">
                    {/* Puedes añadir aquí una imagen si tienes */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white group-hover:text-primary-600 transition-colors">{restaurant.name}</h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{restaurant.address}</p>
                    </div>
                </div>
                <div className="space-y-1 text-neutral-700 dark:text-neutral-200 text-sm">
                    <p><span className="font-semibold">Teléfono:</span> {restaurant.phone}</p>
                    <p><span className="font-semibold">Email:</span> {restaurant.email}</p>
                    <p><span className="font-semibold">Horario:</span> {restaurant.openingHours}</p>
                </div>
                {restaurant.description && (
                    <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{restaurant.description}</p>
                )}
            </div>
        </Link>
    )
}