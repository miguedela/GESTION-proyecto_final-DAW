import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { PillCheck } from "../../../../components/Buttons";
import { Input } from "../../../../components/Forms";
import useRestaurant from "../../../../hooks/useRestaurant";

export const RestaurantsFilters = () => {
    const [selectedStates, setSelectedStates] = useState<string>("");
    const [search, setSearch] = useState("");

    const states = ["ADMIN", "STAFF", "CUSTOMER"];

    const { handleSearch, handleStateFilter } = useRestaurant();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(search);
    };

    const handleChangeState = (state: string) => {
        let newSelection: string;

        if (selectedStates.includes(state))
            newSelection = "";
        else
            newSelection = state;

        setSelectedStates(newSelection);
        handleStateFilter(newSelection);
    };

    return <>
        <div className="flex justify-between">
            <h1 className="text-5xl">Usuarios</h1>
            <div className="flex flex-col justify-center gap-3">
                <form className="flex items-center gap-3" onSubmit={handleSearchSubmit}>
                    <Input id="buscarUsuario" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar restaurantes..." />
                    <button className="text-2xl" type="submit"><IoSearch /></button>
                </form>
                <div className="flex justify-around">
                    {states.map((state) => (
                        <PillCheck key={state} text={state} active={selectedStates === state ? true : false} onClick={() => handleChangeState(state)} />
                    ))}
                </div>
            </div>
        </div>
    </>
}
