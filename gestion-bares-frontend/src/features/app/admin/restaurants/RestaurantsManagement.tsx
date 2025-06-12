import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IoArrowDownOutline, IoArrowUpOutline, IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import ConfirmModal from "../../../../components/ConfirmModal";
import { Loader } from "../../../../components/Loader";
import { Paginator } from "../../../../components/Paginator";
import { RestaurantsFilters } from "../../../../components/RestaurantsFilters";
import useRestaurant from "../../../../hooks/useRestaurant";
import { formatDateShort } from "../../../../utils/dateUtils";

export const RestaurantsManagement = () => {
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Inicio", path: "/main" },
      { label: "Restaurantes", path: "/admin/restaurants" }
    ])
  }, [setBreadcrumbs]);

  const [restaurantToDelete, setRestaurantToDelete] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("creationDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { restaurants, handleGetRestaurants, handlePageChange, handleDeleteRestaurant } = useRestaurant();

  const handleSort = (field: string) => {
    const newOrder = sortBy === field ? (sortOrder === "asc" ? "desc" : "asc") : "asc";

    setSortBy(field);
    setSortOrder(newOrder);

    const sortParam = `${field},${newOrder}`;

    handleGetRestaurants({ page: 0, size: restaurants.pagination.size, filters: { ...restaurants.pagination.filters, sort: sortParam } });
  };

  useEffect(() => {
    handleGetRestaurants({ page: 0, size: 5 });
  }, [handleGetRestaurants]);

  return <div className="w-full flex flex-col gap-3 bg-white text-dark rounded-md p-20">
    <RestaurantsFilters />
    <Loader loading={restaurants.loading}>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              {[
                { label: "Email", key: "email" },
                { label: "Nombre", key: "name" },
                { label: "Descripción", key: "surnames" },
                { label: "Teléfono", key: "telephone" },
                { label: "Fecha de creación", key: "creationDate" },
              ].map(({ label, key }) => (
                <th key={key} className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort(key)}>
                  <span className="flex items-center gap-1">{label}
                    {sortBy === key &&
                      (sortOrder === "asc" ? <IoArrowUpOutline /> : <IoArrowDownOutline />)}
                  </span>
                </th>
              ))}
              <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
            {restaurants.content.map((restaurant, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateShort(restaurant.creationDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link to={`/admin/restaurants/${restaurant.id}`}><IoEyeOutline className="text-xl text-amber-500 hover:text-amber-600" /></Link>
                  <button onClick={() => setRestaurantToDelete(restaurant.id)} className="cursor-pointer">
                    <IoTrashOutline className="text-xl text-red-500 hover:text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Paginator totalElements={restaurants.pagination.totalElements || 0} pageCount={restaurants.pagination.totalPages || 1} page={restaurants.pagination.page} defaultSize={restaurants.pagination.size} availableSizes={[5, 10, 15]} onPageChange={handlePageChange} />
      </div>

      <ConfirmModal
        isOpen={!!restaurantToDelete}
        text={"Estás seguro de que quieres eliminar el usuario?"}
        onConfirm={() => {
          if (restaurantToDelete) handleDeleteRestaurant(restaurantToDelete)
          setRestaurantToDelete(null);
        }}
        onCancel={() => setRestaurantToDelete(null)}
      />
    </Loader>

    <Link to="/admin/restaurants/create" className="text-amber-500 underline text-sm">Crear un nuevo Restaurante</Link>
  </div>
}
