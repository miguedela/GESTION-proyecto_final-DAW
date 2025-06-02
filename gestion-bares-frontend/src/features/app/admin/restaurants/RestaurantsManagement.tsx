import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IoArrowDownOutline, IoArrowUpOutline, IoEyeOutline, IoRemoveOutline } from "react-icons/io5";
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 drak:text-neutral-400">
          <tr>
            {[
              { label: "Email", key: "email" },
              { label: "Nombre", key: "name" },
              { label: "Descripción", key: "surnames" },
              { label: "Teléfono", key: "telephone" },
              { label: "Fecha de creación", key: "creationDate" },
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
            <tr key={index} className="bg-white border-b border-neutral-800 hover:bg-gray-50">
              <td className="px-6 py-4">{restaurant.email}</td>
              <td className="px-6 py-4">{restaurant.name}</td>
              <td className="px-6 py-4">{restaurant.description}</td>
              <td className="px-6 py-4">{restaurant.phone}</td>
              <td className="px-6 py-4">{formatDateShort(restaurant.creationDate)}</td>
              <td className="py-4 flex items-center gap-3">
                <Link to={`/admin/restaurants/${restaurant.id}`}><IoEyeOutline className="text-xl text-amber-500 hover:text-amber-600" /></Link>
                <button onClick={() => setRestaurantToDelete(restaurant.id)} className="cursor-pointer">
                  <IoRemoveOutline className="text-xl text-red-500 hover:text-red-600" />
                </button>
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
          if (restaurantToDelete) handleDeleteRestaurant(restaurantToDelete)
          setRestaurantToDelete(null);
        }}
        onCancel={() => setRestaurantToDelete(null)}
      />
    </Loader>

    <Link to="/admin/restaurants/create" className="text-amber-500 underline text-sm">Crear un nuevo Restaurante</Link>
  </div>
}
