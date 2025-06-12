import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadRestaurant } from "../../../../api/restaurants.api";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { userAtom } from "../../../../atoms/user.atom";
import { Loader } from "../../../../components/Loader";
import { IRestaurant } from "../../../../types/Restaurants";
import { Roles } from "../../../../types/User";

export const RestaurantDetail = () => {
  const [restaurantId] = useState(localStorage.getItem("restaurantId"));

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [user] = useAtom(userAtom);

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Inicio", path: "/main" },
      { label: `${restaurant?.name}`, path: `/restaurant` },
    ]);
  }, [restaurantId, restaurant, setBreadcrumbs])

  const handleLoadRestaurant = useCallback(
    async () => {
      setLoading(true);

      try {
        const response = await loadRestaurant(restaurantId!);
        if (response.status !== 200)
          navigate('/staff/restaurants')

        setRestaurant(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading restaurant: ", error);
        setLoading(false);
      }
    }, [setRestaurant, restaurantId, navigate]
  );

  useEffect(() => {
    if (!restaurantId)
      navigate("/staff/restaurants")
    else
      handleLoadRestaurant()
  }, [restaurantId, navigate, handleLoadRestaurant]);

  // Improved styles and responsiveness for RestaurantDetail.tsx
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto flex flex-col bg-white text-slate-800 rounded-xl p-10 shadow-sm border border-slate-200 my-10">
        <Loader loading={loading}>
          <h1 className="text-3xl font-extrabold text-center text-amber-700 tracking-tight mb-8 border-b pb-4 border-slate-200">
            {restaurant?.name || "Detalles del restaurante"}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <div className="md:col-span-2">
              <span className="text-xs text-slate-400">Ubicación</span>
              <div className="ml-2 mt-2 rounded-lg overflow-hidden border border-slate-200 shadow">
                {restaurant?.address && (
                  <iframe
                    title="Mapa del restaurante"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}&output=embed`}
                  ></iframe>
                )}
              </div>
            </div>
            {user?.role === Roles.CUSTOMER && (
              <div className="flex justify-start">
                <Link
                  to={`/restaurant/${restaurantId}/reservation/new`}
                  className="mt-8 inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow"
                >
                  Realizar reserva
                </Link>
              </div>
            )}
          </div>
        </Loader>
      </div>
    </div>
  )
}
