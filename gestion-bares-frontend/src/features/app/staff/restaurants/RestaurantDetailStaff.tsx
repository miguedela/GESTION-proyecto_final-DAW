import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { IoMenu, IoPencilOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadRestaurant } from "../../../../api/restaurants.api";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { userAtom } from "../../../../atoms/user.atom";
import { Loader } from "../../../../components/Loader";
import useRestaurantStaff from "../../../../hooks/useRestaurantStaff";
import { IRestaurant } from "../../../../types/Restaurants";
import { formatDate } from "../../../../utils/dateUtils";

export const RestaurantDetailStaff = () => {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Inicio", path: "/main" },
      { label: 'Restaurantes asignados', path: "/staff/restaurants" },
      { label: `${restaurant?.name}`, path: `/staff/restaurant/${id}` },
    ]);
  }, [id, restaurant, setBreadcrumbs])

  const { handleGetRestaurantsByStaff } = useRestaurantStaff();

  const checkPermissions = useCallback(async () => {
    if (user?.id != null && id != null) {
      try {
        const assignedRestaurants = await handleGetRestaurantsByStaff(user.id);
        const assigned = assignedRestaurants?.some((rest: IRestaurant) => String(rest.id) === String(id));
        if (!assigned)
          navigate("/restaurant");
      } catch (error) {
        console.error("Error checking permissions: ", error);
        navigate("/restaurant");
      }
    }
  }, [user?.id, id, navigate, handleGetRestaurantsByStaff]);

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
    checkPermissions();
    if (!id)
      navigate("/staff/restaurants");
    else
      handleLoadRestaurant();
  }, [id, navigate, handleLoadRestaurant, checkPermissions]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto flex flex-col bg-white text-slate-800 rounded-xl p-10 shadow-sm border border-slate-200 my-10">
        <Loader loading={loading}>
          <h1 className="text-3xl font-extrabold text-center text-amber-700 tracking-tight mb-8 border-b pb-4 border-slate-200">
            Detalles del restaurante
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-xs text-slate-400">Nombre</span>
              <div className="ml-2 mt-1 p-3 rounded-lg bg-slate-50 border border-slate-100">{restaurant?.name}</div>
            </div>
            <div>
              <span className="text-xs text-slate-400">Descripción</span>
              <div className="ml-2 mt-1 p-3 rounded-lg bg-slate-50 border border-slate-100">{restaurant?.description}</div>
            </div>
            <div>
              <span className="text-xs text-slate-400">Dirección</span>
              <div className="ml-2 mt-1 p-3 rounded-lg bg-slate-50 border border-slate-100">{restaurant?.address}</div>
            </div>
            <div>
              <span className="text-xs text-slate-400">Email</span>
              <div className="ml-2 mt-1 p-3 rounded-lg bg-slate-50 border border-slate-100">{restaurant?.email}</div>
            </div>
            <div>
              <span className="text-xs text-slate-400">Teléfono</span>
              <div className="ml-2 mt-1 p-3 rounded-lg bg-slate-50 border border-slate-100">{restaurant?.phone}</div>
            </div>
            <div>
              <span className="text-xs text-slate-400">Fecha de creación</span>
              <div className="ml-2 mt-1 p-3 rounded-lg bg-slate-50 border border-slate-100">{restaurant?.creationDate && formatDate(restaurant?.creationDate)}</div>
            </div>
            <div className="md:col-span-2">
              <span className="text-xs text-slate-400">Horario de apertura</span>
              <div className="ml-2 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {restaurant?.openingHours && restaurant.openingHours.split(';').map((schedule, index) => (
                  <div key={index} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                    <span className="font-semibold text-amber-700">{dias[index]}:</span>
                    <span className="text-slate-700">{schedule.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-400">Última modificación</span>
              <div className="ml-2 mt-1 p-3 rounded-lg bg-slate-50 border border-slate-100">{restaurant?.lastModifiedDate && formatDate(restaurant?.lastModifiedDate)}</div>
            </div>
          </div>
          <div className="flex gap-4 justify-end mt-8">
            <Link to={`/staff/restaurant/${restaurant?.id}/edit`} title="Editar restaurante">
              <IoPencilOutline className="text-2xl text-amber-500 hover:text-amber-600 transition" />
            </Link>
            <Link to={`/staff/restaurant/${restaurant?.id}/menu`} title="Ver menú">
              <IoMenu className="text-2xl text-amber-500 hover:text-amber-600 transition" />
            </Link>
          </div>
        </Loader>
      </div>
    </div>
  );
}
