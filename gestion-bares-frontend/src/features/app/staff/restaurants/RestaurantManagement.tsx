import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getRestaurantsByStaff } from "../../../../api/restaurantstaff.api";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { userAtom } from "../../../../atoms/user.atom";
import { Loader } from "../../../../components/Loader";
import { IRestaurant } from "../../../../types/Restaurants";
import { formatDateShort } from "../../../../utils/dateUtils";

export const RestaurantManagement = () => {
  const [user] = useAtom(userAtom);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Restaurantes asignados", path: "/staff/restaurants" }
    ])
  }, [setBreadcrumbs]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        if (user?.id) {
          const response = await getRestaurantsByStaff(user.id);
          setRestaurants(response.data);
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [user.id])


  return (
    <div className="w-full flex flex-col gap-3 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-20">
      <Loader loading={loading}>
        <h1>Restaurantes asignados</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-neutral-400">
          <thead className="text-xs dark:text-white text-gray-700 uppercase bg-gray-50 dark:bg-neutral-700 drak:text-neutral-400">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Teléfono</th>
              <th className="px-6 py-3">Fecha de creación</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">No tienes restaurantes asignados.</td>
              </tr>
            )}
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id} className="bg-white dark:bg-neutral-600 border-b border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700">
                <td className="px-6 py-4">{restaurant.email}</td>
                <td className="px-6 py-4">{restaurant.name}</td>
                <td className="px-6 py-4">{restaurant.description}</td>
                <td className="px-6 py-4">{restaurant.phone}</td>
                <td className="px-6 py-4">{formatDateShort(restaurant.creationDate)}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <Link to={`/staff/restaurants/${restaurant.id}`}><IoSettingsOutline className="text-xl text-amber-500 hover:text-amber-600" /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Loader>
    </div>
  );
}
