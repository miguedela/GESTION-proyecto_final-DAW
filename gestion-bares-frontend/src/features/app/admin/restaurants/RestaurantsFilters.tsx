import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "../../../../components/Forms";
import useRestaurant from "../../../../hooks/useRestaurant";

export const RestaurantsFilters = () => {
    const [search, setSearch] = useState("");

    const { handleSearch } = useRestaurant();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(search);
    };

    return <>
        <div className="flex justify-between">
            <h1 className="text-5xl">Restaurantes</h1>
            <div className="flex flex-col justify-center gap-3">
                <form className="flex items-center gap-3" onSubmit={handleSearchSubmit}>
                    <Input id="buscarRestaurantes" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar restaurantes..." />
                    <button className="text-2xl" type="submit"><IoSearch /></button>
                </form>
            </div>
        </div>
    </>
}
