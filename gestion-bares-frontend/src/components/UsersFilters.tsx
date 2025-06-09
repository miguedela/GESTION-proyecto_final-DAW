import { useState } from "react"
import useUser from "../hooks/useUser";
import { Input } from "./Forms";
import { PillCheck } from "./Buttons";
import { IoSearch } from "react-icons/io5";

export const UsersFilters = () => {
  const [selectedStates, setSelectedStates] = useState<string>("");
  const [search, setSearch] = useState("");

  const states = ["Administradores", "Personal", "Clientes"];
  const roleMap: { [key: string]: string } = {
    "Administradores": "ADMIN",
    "Personal": "STAFF",
    "Clientes": "CUSTOMER"
  };

  const { handleSearch, handleStateFilter } = useUser();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(search);
  };

  const handleChangeState = (descriptiveState: string) => {
    let newSelectedDescriptiveState: string;
    let roleValueToFilter: string;

    if (selectedStates === descriptiveState) {
      newSelectedDescriptiveState = "";
      roleValueToFilter = "";
    } else {
      newSelectedDescriptiveState = descriptiveState;
      roleValueToFilter = roleMap[descriptiveState];
    }

    setSelectedStates(newSelectedDescriptiveState);
    handleStateFilter(roleValueToFilter);
  };

  return <>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold text-slate-900">Usuarios</h1>
      <div className="flex flex-col justify-center gap-3">
        <form className="flex items-center gap-3" onSubmit={handleSearchSubmit}>
          <Input id="buscarUsuario" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar usuario..." />
          <button className="p-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors" type="submit">
            <IoSearch size={20} />
          </button>
        </form>
        <div className="flex justify-around mt-4">
          {states.map((state) => (
            <PillCheck key={state} text={state} active={selectedStates === state} onClick={() => handleChangeState(state)} />
          ))}
        </div>
      </div>
    </div>
  </>
}
