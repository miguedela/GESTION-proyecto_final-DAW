import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { breadcrumbsAtom } from "../../atoms/breadcrumbs.atom";
import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";
import { Loader } from "../../components/Loader";
import { Paginator } from "../../components/Paginator";
import { RestaurantCard } from "../../components/RestaurantCard";
import useRestaurant from "../../hooks/useRestaurant";
import { RestaurantsFilters } from "../../components/RestaurantsFilters";

export const RestaurantsList = () => {
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);

  useEffect(() => {
    setBreadcrumbs([
      { label: "Inicio", path: "/main" },
    ]);

    localStorage.removeItem("restaurantId");
  }, [setBreadcrumbs]);

  const { restaurants, handleGetRestaurants, handlePageChange } = useRestaurant();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        await handleGetRestaurants({ page: 0, size: 6 });
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [handleGetRestaurants]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto flex-1 flex flex-col gap-6 text-dark rounded-md p-8">
        <RestaurantsFilters />
        <Loader loading={loading}>
          <div className="flex flex-1 flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.content.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
            <div className="w-[40%] mx-auto">
              <Paginator
                totalElements={restaurants.pagination.totalElements || 0}
                pageCount={restaurants.pagination.totalPages || 1}
                page={restaurants.pagination.page}
                defaultSize={restaurants.pagination.size}
                availableSizes={[6, 12, 18]}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </Loader>
      </main>
      <Footer />
    </div>
  );
}