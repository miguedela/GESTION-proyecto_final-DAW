import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { IoAddOutline, IoEyeOffOutline, IoEyeOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { loadMenu } from "../../../../../api/menu.api";
import { loadRestaurant } from "../../../../../api/restaurants.api";
import { breadcrumbsAtom } from "../../../../../atoms/breadcrumbs.atom";
import ConfirmModal from "../../../../../components/ConfirmModal";
import { Loader } from "../../../../../components/Loader";
import useDish from "../../../../../hooks/useDish";
import { IMenu } from "../../../../../types/Menu";
import { IRestaurant } from "../../../../../types/Restaurants";

export const StaffRestaurantMenu = () => {
  const id = localStorage.getItem("restaurantId");
  const navigate = useNavigate();
  const [menu, setMenu] = useState<IMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const [dishToDelete, setDishToDelete] = useState<string | null>(null);
  const { handleDeleteDish } = useDish();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);

  const handleLoadRestaurant = useCallback(
    async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await loadRestaurant(id!);
        if (response.status !== 200)
          navigate('/staff/restaurants')

        setRestaurant(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading restaurant: ", error);
        setLoading(false);
      }
    }, [setRestaurant, id, navigate]
  );

  useEffect(() => {
    if (!id)
      navigate("/staff/restaurants");
    else
      handleLoadRestaurant();
  }, [id, navigate, handleLoadRestaurant]);

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Inicio", path: "/main" },
      { label: `${restaurant?.name}`, path: `/staff/restaurant/info` },
      { label: 'Menú', path: `/staff/restaurant/menu` },
    ]);
  }, [id, setBreadcrumbs, restaurant]);

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
    <div className="w-full flex flex-col gap-3 bg-white text-dark rounded-md p-4 md:p-8 lg:p-10">
      <Loader loading={loading}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Menú del Restaurante</h1>
          <Link 
            to={`/staff/restaurant/menu/${menu?.id}/create`}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out flex items-center gap-2 text-sm md:text-base"
          >
            <IoAddOutline className="text-xl" />
            Añadir Plato
          </Link>
        </div>
        <div className="overflow-x-auto shadow-lg rounded-lg overscroll-x-contain">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider">Descripción</th>
                <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider">Precio</th>
                <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider">Disponible</th>
                <th className="py-3 px-5 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
              {menu?.dishes.map((dish) => (
                <tr key={dish.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dish.name}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs truncate">{dish.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dish.price}€</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dish.available ? <IoEyeOutline className="text-xl text-green-500" title="Sí"/> : <IoEyeOffOutline className="text-xl text-red-500" title="No"/>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-x-3">
                    <Link to={`/staff/restaurant/menu/dish/${dish.id}/edit`} title="Editar plato">
                      <IoPencilOutline className="text-xl text-amber-500 hover:text-amber-600" />
                    </Link>
                    <button onClick={() => setDishToDelete(dish.id)} className="cursor-pointer" title="Eliminar plato">
                      <IoTrashOutline className="text-xl text-red-500 hover:text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!menu?.dishes || menu.dishes.length === 0) && !loading && (
          <p className="text-center text-gray-500 mt-6">No hay platos en el menú todavía. ¡Añade algunos!</p>
        )}
        <ConfirmModal
          isOpen={!!dishToDelete}
          text={"Estás seguro de que quieres eliminar el plato?"}
          onConfirm={async () => {
            if (dishToDelete && id) {
              try {
                await handleDeleteDish(dishToDelete);
                handleLoadMenu(id);
              } catch (error) {
                console.error("Error durante el proceso de eliminación o recarga del menú:", error);
              } finally {
                setDishToDelete(null);
              }
            } else {
              setDishToDelete(null);
            }
          }}
          onCancel={() => setDishToDelete(null)}
        />
      </Loader>
    </div>
  );
};