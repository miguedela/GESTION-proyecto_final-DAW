import { IRestaurant } from "../types/Restaurants"

export const RestaurantCard = ({ restaurant }: { restaurant: IRestaurant }) => {
    return (
        <div className="rounded-lg shadow-md p-4 bg-white dark:bg-neutral-800 mb-4">
            <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
            <p className="mb-1"><span className="font-semibold">Dirección:</span> {restaurant.address}</p>
            <p className="mb-1"><span className="font-semibold">Teléfono:</span> {restaurant.phone}</p>
            <p className="mb-1"><span className="font-semibold">Email:</span> {restaurant.email}</p>
            <p className="mb-1"><span className="font-semibold">Horario:</span> {restaurant.openingHours}</p>
            {restaurant.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{restaurant.description}</p>
            )}
        </div>
    )
}
