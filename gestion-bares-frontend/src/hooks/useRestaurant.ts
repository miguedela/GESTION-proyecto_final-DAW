import { useAtom } from "jotai";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadRestaurants } from "../api/restaurants.api";
import { restaurantAtom } from "../atoms/restaurants.atom";
import { IPaginationInfo } from "../types/Pagination";

const useRestaurant = () => {
    const [restaurants, setRestaurants] = useAtom(restaurantAtom);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoadRestaurants = useCallback(
        async (pagination: IPaginationInfo) => {
            setRestaurants((prev) => ({ ...prev, loading: true }));

            try {
                const { data } = await loadRestaurants(pagination.page, pagination.size, pagination.filters);

                setRestaurants((prev) => ({
                    ...prev,
                    content: data.content,
                    pagination: {
                        ...pagination,
                        totalElements: data.totalElements,
                        totalPages: data.totalPages,
                        filters: pagination.filters,
                    },
                    loading: false,
                }));
            } catch (error) {
                console.error(error)
                setRestaurants((prev) => ({ ...prev, loading: false }));
            }
        },
        [setRestaurants]
    );

    return { handleLoadRestaurants, restaurants }
};

export default useRestaurant;