import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRestaurant, loadRestaurants, registerRestaurant } from "../api/restaurants.api";
import { restaurantAtom } from "../atoms/restaurants.atom";
import { IPaginationInfo, PaginationInfo } from "../types/Pagination";
import { IRestaurant } from "../types/Restaurants";
import { setMessageError } from "../utils/utilsFunctions";

const useRestaurant = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [restaurants, setRestaurants] = useAtom(restaurantAtom);

    const getRestaurants = useCallback(
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

    const createRestaurant = async (restaurant: IRestaurant) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerRestaurant(restaurant);
            setLoading(false);
            return response;
        } catch (err: unknown) {
            setMessageError(err, setError);
        } finally {
            setLoading(false);
        }
    }

    const handleStateFilter = async (state: string) => {
        const currentFilters = { ...restaurants.pagination.filters };

        if (!state) delete currentFilters.role;
        else currentFilters.role = state;

        await getRestaurants({
            page: 0,
            size: restaurants.pagination.size,
            filters: currentFilters
        })
    };

    const handlePageChange = async (newPage: number, size: number) => {
        const updatePagination: PaginationInfo = {
            page: newPage,
            size: size,
            filters: restaurants.pagination.filters,
            sort: restaurants.pagination.sort
        }

        getRestaurants(updatePagination);
    }

    const handleSearch = async (search: string) => {
        const filters = {
            ...restaurants.pagination.filters,
            general: search
        }

        getRestaurants({
            page: 0,
            size: restaurants.pagination.size,
            filters
        });
    };


    const handleDeleteUser = async (id: string) => {
        try {
            await deleteRestaurant(id);
            navigate("/admin/users")
            if (location.pathname === "/admin/users") getRestaurants({ page: 0, size: restaurants.pagination.size });
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    }

    return { getRestaurants, createRestaurant, loadRestaurants, handlePageChange, handleSearch, handleDeleteUser, handleStateFilter, restaurants, loading, error }
};

export default useRestaurant;