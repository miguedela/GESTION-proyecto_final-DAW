import { useAtom } from "jotai";
import { useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { userAtom } from "../../../../atoms/user.atom";
import { Loader } from "../../../../components/Loader";
import useRestaurantStaff from "../../../../hooks/useRestaurantStaff";
import { formatDateShort } from "../../../../utils/dateUtils";

export const RestaurantManagement = () => {
  const [user] = useAtom(userAtom);
  const { restaurants, loading, handleGetRestaurantsByStaff } = useRestaurantStaff();

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Restaurantes asignados", path: "/staff/restaurants" }
    ])
  }, [setBreadcrumbs]);

  useEffect(() => {
    if (user?.id) {
      handleGetRestaurantsByStaff(user.id);
    }
  }, [user?.id, handleGetRestaurantsByStaff]);

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
            {restaurants.content.length === 0 && (
              <tr className="bg-white dark:bg-neutral-600 border-b border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700">
                <td colSpan={6} className="px-6 py-4 text-center">No tienes restaurantes asignados.</td>
              </tr>
            )}
            {restaurants.content.map((restaurant) => (
              <tr key={restaurant.id} className="bg-white dark:bg-neutral-600 border-b border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700">
                <td className="px-6 py-4">{restaurant.email}</td>
                <td className="px-6 py-4">{restaurant.name}</td>
                <td className="px-6 py-4">{restaurant.description}</td>
                <td className="px-6 py-4">{restaurant.phone}</td>
                <td className="px-6 py-4">{formatDateShort(restaurant.creationDate)}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <Link to={`/staff/restaurant/${restaurant.id}`}>
                    <IoSettingsOutline className="text-xl text-amber-500 hover:text-amber-600" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Loader>
    </div>
  );
}