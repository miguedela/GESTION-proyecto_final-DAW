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

    return <>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-slate-900">Restaurantes</h1>
            <form className="flex items-center gap-3" onSubmit={handleSearchSubmit}>
                <Input id="buscarRestaurantes" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar restaurantes..." />
                <button className="p-3.5 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors" type="submit">
                    <IoSearch size={20} />
                </button>
            </form>
        </div>
    </>
}
