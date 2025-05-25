import { Link } from "react-router-dom";
import { IRestaurant } from "../types/Restaurants";

export const RestaurantCard = ({ restaurant }: { restaurant: IRestaurant }) => {

    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    return (
        <Link
            to={`/restaurant/${restaurant.id}`} className="block group"
        >
            <div className="rounded-xl shadow-lg p-6 bg-white dark:bg-neutral-800 mb-6 border border-neutral-200 dark:border-neutral-700 transition-transform transform group-hover:scale-105 group-hover:shadow-xl duration-200 cursor-pointer">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white group-hover:text-primary-600 transition-colors">{restaurant.name}</h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{restaurant.address}</p>
                    </div>
                </div>
                <div className="space-y-1 text-neutral-700 dark:text-neutral-200 text-sm">
                    <p><span className="font-semibold">Teléfono:</span> {restaurant.phone}</p>
                    <p><span className="font-semibold">Email:</span> {restaurant.email}</p>
                    {restaurant.openingHours && (
                        <>
                            <p className="font-semibold">Horario:</p>
                            {restaurant.openingHours.split(';').map((schedule, index) => (
                                <p key={index} className="ml-2">{dias[index]}: {schedule.trim()}</p>
                            ))}
                        </>
                    )}
                </div>
                {restaurant.description && (
                    <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{restaurant.description}</p>
                )}
            </div>
        </Link>
    )
}