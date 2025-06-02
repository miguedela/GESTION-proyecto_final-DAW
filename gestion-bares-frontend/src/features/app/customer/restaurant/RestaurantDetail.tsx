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

  return (
    <div className="w-full max-h-full flex flex-col gap-3">
      <div className="container mx-auto flex flex-1 flex-col bg-white text-dark rounded-md p-10 shadow">
        <h1 className="text-4xl font-bold mb-6">Detalles del restaurante</h1>
        <Loader loading={loading}>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xs text-neutral-400">Nombre</span>
              <p className="ml-2 mt-1 text-lg font-semibold">{restaurant?.name}</p>
            </div>
            <div>
              <span className="text-xs text-neutral-400">Descripción</span>
              <p className="ml-2 mt-1">{restaurant?.description}</p>
            </div>
            <div>
              <span className="text-xs text-neutral-400">Dirección</span>
              <p className="ml-2 mt-1">{restaurant?.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-neutral-400">Email</span>
                <p className="ml-2 mt-1">{restaurant?.email}</p>
              </div>
              <div>
                <span className="text-xs text-neutral-400">Teléfono</span>
                <p className="ml-2 mt-1">{restaurant?.phone}</p>
              </div>
            </div>
            <div>
              <span className="text-xs text-neutral-400">Horario de apertura</span>
              {restaurant?.openingHours && restaurant.openingHours.split(';').map((schedule, index) => (
                <p key={index} className="ml-2">{dias[index]}: {schedule.trim()}</p>
              ))}
            </div>
            <div>
              <span className="text-xs text-neutral-400">Ubicación</span>
              <div className="ml-2 mt-2 rounded overflow-hidden border">
                {restaurant?.address && (
                  <iframe
                    title="Mapa del restaurante"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}&output=embed`}
                  ></iframe>
                )}
              </div>
            </div>
          </div>
          {user?.role === Roles.CUSTOMER &&
            <Link to={`/restaurant/${restaurantId}/reservation/new`} className="mt-6 inline-block bg-amber-500 text-neutral-800 px-4 py-2 rounded hover:bg-amber-600 transition text-center">
              Realizar reserva
            </Link>
          }
        </Loader>
      </div>
    </div>
  )
}
