import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { IoAddOutline, IoPencilOutline, IoRemoveOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadMenu } from "../../../../../api/menu.api";
import { breadcrumbsAtom } from "../../../../../atoms/breadcrumbs.atom";
import { Loader } from "../../../../../components/Loader";
import { IMenu } from "../../../../../types/Menu";
import ConfirmModal from "../../../../../components/ConfirmModal";
import useDish from "../../../../../hooks/useDish";

export const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<IMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const [dishToDelete, setDishToDelete] = useState<string | null>(null);
  const { handleDeleteDish } = useDish();

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Restaurantes', path: "/staff/restaurants" },
      { label: `Restaurante ${id}`, path: `/staff/restaurant/${id}` },
      { label: 'Menú', path: `/staff/restaurant/${id}/menu` },
    ]);
  }, [id, setBreadcrumbs]);

  const handleLoadMenu = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await loadMenu(id);
      setMenu(response.data);
    } catch (error) {
      console.error("Error loading menu:", error);
      navigate("/staff/restaurants");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      handleLoadMenu(id);
    } else {
      navigate("/staff/restaurants");
    }
  }, [id, navigate, handleLoadMenu]);

  return (
    <div className="w-full flex flex-col gap-3 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-20">
      <Loader loading={loading}>
        <h1>Menú del restaurante</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-neutral-400">
          <thead className="text-xs dark:text-white text-gray-700 uppercase bg-gray-50 dark:bg-neutral-700 drak:text-neutral-400">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Categoría</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {menu?.dishes.map((dish) => (
              <tr key={dish.id} className="bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700">
                <td className="px-6 py-4">{dish.name}</td>
                <td className="px-6 py-4">{dish.description}</td>
                <td className="px-6 py-4">{dish.price}</td>
                <td className="px-6 py-4">{dish.available}</td>
                <td>
                  <Link to={`/staff/restaurant/menu/dish/${dish.id}/edit`}>
                    <IoPencilOutline className="text-xl text-amber-500 hover:text-amber-600" />
                  </Link>
                  <button onClick={() => setDishToDelete(dish.id)} className="cursor-pointer">
                    <IoRemoveOutline className="text-xl text-red-500 hover:text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/staff/restaurant/${id}/menu/${menu?.id}/create`}>
          <IoAddOutline className="text-xl text-amber-500 hover:text-amber-600" />
        </Link>

        <ConfirmModal
          isOpen={!!dishToDelete}
          text={"Estás seguro de que quieres eliminar el plato?"}
          type="negative"
          onConfirm={() => {
            if (dishToDelete) handleDeleteDish(dishToDelete)
            setDishToDelete(null);
          }}
          onCancel={() => setDishToDelete(null)}
        />
      </Loader>
    </div>
  );
};