import { useAtom } from "jotai";
import { useEffect } from "react";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import useRestaurant from "../../../../hooks/useRestaurant";

export const RestaurantsManagement = () => {
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);

  const { restaurants, handleLoadRestaurants } = useRestaurant();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Restaurantes", path: "/admin/restaurants" }
    ])
  }, [setBreadcrumbs]);

  useEffect(() => {
    handleLoadRestaurants({ page: 0, size: 5 });
  }, [handleLoadRestaurants]);

  return <div>
    <h1>Restaurants Management</h1>

    {
      restaurants.content.map((restaurant) => (
        <div key={restaurant.id} className="border p-4 mb-4">
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          <p>{restaurant.address}</p>
          <p>{restaurant.phone}</p>
          <p>{restaurant.email}</p>
        </div>
      ))
    }
  </div>
}
