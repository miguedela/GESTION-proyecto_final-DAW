import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "./Forms";
import useRestaurant from "../hooks/useRestaurant";

export const RestaurantsFilters = () => {
    const [search, setSearch] = useState("");

    const { handleSearch } = useRestaurant();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(search);
    };

    return (
        <div className="flex justify-end items-end gap-4 rounded-xl w-full">
            <form className="flex items-center gap-3" onSubmit={handleSearchSubmit}>
                <div className="w-64">
                    <Input id="buscarRestaurantes" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar restaurantes..." />
                </div>
                <button className="p-3.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition shadow font-bold hover:scale-105 active:scale-95" type="submit">
                    <IoSearch size={20} />
                </button>
            </form>
        </div>
    )
}
