import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IoArrowDownOutline, IoArrowUpOutline, IoEyeOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import ConfirmModal from "../../../../components/ConfirmModal";
import { Loader } from "../../../../components/Loader";
import { Paginator } from "../../../../components/Paginator";
import useRestaurant from "../../../../hooks/useRestaurant";
import { formatDateShort } from "../../../../utils/dateUtils";
import { RestaurantsFilters } from "./RestaurantsFilters";

export const RestaurantsManagement = () => {
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Restaurantes", path: "/admin/restaurants" }
    ])
  }, [setBreadcrumbs]);

  const [restaurantToDelete, setRestaurantToDelete] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<string>("creationDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { restaurants, getRestaurants, handlePageChange, handleDeleteUser } = useRestaurant();

  const handleSort = (field: string) => {
    const newOrder = sortBy === field ? (sortOrder === "asc" ? "desc" : "asc") : "asc";

    setSortBy(field);
    setSortOrder(newOrder);

    const sortParam = `${field},${newOrder}`;

    getRestaurants({ page: 0, size: restaurants.pagination.size, filters: { ...restaurants.pagination.filters, sort: sortParam } });
  };

  useEffect(() => {
    getRestaurants({ page: 0, size: 5 });
  }, [getRestaurants]);

  return <div className="w-full flex flex-col gap-3 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-20">
    <RestaurantsFilters />
    <Loader loading={restaurants.loading}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-neutral-400">
        <thead className="text-xs dark:text-white text-gray-700 uppercase bg-gray-50 dark:bg-neutral-700 drak:text-neutral-400">
          <tr>
            {[
              { label: "Email", key: "email" },
              { label: "Nombre", key: "name" },
              { label: "Apellidos", key: "surnames" },
              { label: "Teléfono", key: "telephone" },
              { label: "Fecha de creación", key: "creationDate" },
              { label: "Role", key: "role" },
            ].map(({ label, key }) => (
              <th key={key} className="px-6 py-3 cursor-pointer select-none" onClick={() => handleSort(key)}>
                <span className="flex items-center gap-1">{label}
                  {sortBy === key &&
                    (sortOrder === "asc" ? <IoArrowUpOutline /> : <IoArrowDownOutline />)}
                </span>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {restaurants.content.map((restaurant, index) => (
            <tr key={index} className="bg-white dark:bg-neutral-600 border-b border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <td className="px-6 py-4">{restaurant.email}</td>
              <td className="px-6 py-4">{restaurant.name}</td>
              <td className="px-6 py-4">{restaurant.description}</td>
              <td className="px-6 py-4">{restaurant.phone}</td>
              <td className="px-6 py-4">{formatDateShort(restaurant.creationDate)}</td>
              <td className="py-4 flex items-center gap-3">
                <Link to={`/admin/restaurants/${restaurant.id}`}><IoEyeOutline className="text-xl text-amber-500 hover:text-amber-600" /></Link>
                <Link to={`/admin/restaurants/edit/${restaurant.id}`}><IoPencilOutline className="text-xl text-amber-500 hover:text-amber-600" /></Link>
                <button onClick={() => setRestaurantToDelete(restaurant.id)} className="cursor-pointer"><IoTrashOutline className="text-xl text-red-500 hover:text-red-600" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <Paginator totalElements={restaurants.pagination.totalElements || 0} pageCount={restaurants.pagination.totalPages || 1} page={restaurants.pagination.page} defaultSize={restaurants.pagination.size} availableSizes={[5, 10, 15]} onPageChange={handlePageChange} />
      </div>

      <ConfirmModal
        isOpen={!!restaurantToDelete}
        text={"Estás seguro de que quieres eliminar el usuario?"}
        type="negative"
        onConfirm={() => {
          if (restaurantToDelete) handleDeleteUser(restaurantToDelete)
          setRestaurantToDelete(null);
        }}
        onCancel={() => setRestaurantToDelete(null)}
      />
    </Loader>



    <Link to="/admin/restaurants/create" className="text-amber-500 underline text-sm">Crear un nuevo Restaurante</Link>
  </div>
}
