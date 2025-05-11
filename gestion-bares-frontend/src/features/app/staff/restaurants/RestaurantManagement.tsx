import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { getRestaurantsByStaff } from "../../../../api/restaurantstaff.api";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import { userAtom } from "../../../../atoms/user.atom";
import { Loader } from "../../../../components/Loader";
import { IRestaurant } from "../../../../types/Restaurants";
import { RestaurantCard } from "../../../../components/RestaurantCard";

export const RestaurantManagement = () => {
  const [user] = useAtom(userAtom);
  const [restaurants, setRestaurants] = useState<IRestaurant[] | null>(null);
  const [loading, setLoading] = useState(false);

  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
  useEffect(() => {
    setBreadcrumbs([
      { label: "Restaurantes asignados", path: "/staff/restaurants" }
    ])
  }, [setBreadcrumbs]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        if (user?.id) {
          const response = await getRestaurantsByStaff(user.id);
          setRestaurants(response.data);
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [user.id])


  return <div className="w-full flex flex-col gap-3 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-20">
    <Loader loading={loading}>
      <h1>Restaurantes asignados</h1>
      {restaurants?.length === null && <li>No tienes restaurantes asignados.</li>}
      {restaurants?.map((restaurant) => (
        RestaurantCard({ restaurant })
      ))}
    </Loader>
  </div >;
}
