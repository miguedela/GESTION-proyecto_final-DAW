import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { IoAddOutline, IoEyeOffOutline, IoEyeOutline, IoPencilOutline, IoRemoveOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadMenu } from "../../../../../api/menu.api";
import { breadcrumbsAtom } from "../../../../../atoms/breadcrumbs.atom";
import ConfirmModal from "../../../../../components/ConfirmModal";
import { Loader } from "../../../../../components/Loader";
import useDish from "../../../../../hooks/useDish";
import { IMenu } from "../../../../../types/Menu";
import { loadRestaurant } from "../../../../../api/restaurants.api";
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
    <div className="w-full flex flex-col gap-3 bg-white text-dark rounded-md p-20">
      <Loader loading={loading}>
        <h1>Menú del restaurante</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Disponible</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {menu?.dishes.map((dish) => (
              <tr key={dish.id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4">{dish.name}</td>
                <td className="px-6 py-4">{dish.description}</td>
                <td className="px-6 py-4">{dish.price}</td>
                <td className="px-6 py-4">{dish.available ? <IoEyeOutline /> : <IoEyeOffOutline />}</td>
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
        <Link to={`/staff/restaurant/menu/${menu?.id}/create`}>
          <IoAddOutline className="text-xl text-amber-500 hover:text-amber-600" />
        </Link>

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