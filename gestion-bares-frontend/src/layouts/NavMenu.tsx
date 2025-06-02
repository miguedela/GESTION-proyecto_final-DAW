import { IoBookOutline, IoCloseOutline, IoHelpOutline, IoLogOutOutline, IoMenuOutline, IoNotificationsOutline, IoPeopleOutline, IoPersonOutline, IoRestaurantOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const NavMenu = ({ isOpen, setIsSidebarOpen }: { isOpen: boolean; setIsSidebarOpen: (open: boolean) => void }) => {
    const { user, logout } = useAuth();

    const links = [
        {
            access: "ADMIN",
            sections: [
                { name: "Usuarios", url: "/admin/users", icon: <IoPeopleOutline /> },
                { name: "Restaurantes", url: "/admin/restaurants", icon: <IoRestaurantOutline /> }
                // Secciones de administradores
            ],
        },
        {
            access: "STAFF",
            sections: [
                { name: "Restaurantes", url: "/staff/restaurants", icon: <IoRestaurantOutline /> },
                // Secciones de staff
            ],
        },
        {
            access: "CUSTOMER",
            sections: [
                { name: "Mis Reservas", url: "/my-reservations", icon: <IoBookOutline /> },
                { name: "Información", url: "/restaurant/info", icon: <IoRestaurantOutline /> },
                { name: "Menú", url: "/restaurant/menu", icon: <IoMenuOutline /> },
                { name: "Contacto", url: "/restaurant/contact", icon: <IoPeopleOutline /> },
                // Secciones de customer
            ],
        },
    ];

    const filteredLinks = links.filter(
        (link) => link.access === "all" || link.access === user.role
    );

    return <aside
        id="default-sidebar"
        className={`text-neutral-200 fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0 border-r border-neutral-600`}
        aria-label="Sidebar"
    >
        <button
            onClick={() => setIsSidebarOpen(false)}
            type="button"
            className="cursor-pointer absolute inline-flex items-center rounded-sm p-2 m-2 text-2xl hover:bg-neutral-100/20 transition-colors duration-200 sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
            <span className="sr-only">Close sidebar</span>
            <IoCloseOutline className="size-6" aria-hidden="true" />
        </button>

        <div className="h-full pt-8 px-3 overflow-y-auto flex flex-col bg-white">
            <Link to="/main">
                <div className="border-b pb-5 flex items-end">
                    <div className="ml-3 w-5 h-full bg-amber-600"></div>
                    <h1 className="text-2xl font-semibold border-b-3 border-amber-600 pl-2 transition-transform hover:scale-105 active:scale-95">
                        TapaTech
                    </h1>
                </div>
            </Link>
            <div className="font-medium flex flex-col flex-1">
                <div className="flex flex-col justify-between h-full">
                    {filteredLinks.map((linkGroup, index) => (
                        <>
                            <div key={index}>
                                {linkGroup.sections.map((section, idx) => (
                                    <NavLink
                                        to={section.url}
                                        key={idx}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-5 py-2 rounded-md my-3
                                transition-all duration-200 
                                ${isActive ? "bg-neutral-300 outline outline-neutral-400 text-black" : "hover:bg-neutral-700"}`
                                        }
                                    >
                                        <span className="text-2xl">{section.icon}</span> {section.name}
                                    </NavLink>
                                ))}
                            </div>
                        </>
                    ))}
                    <div>
                        <NavLink
                            to="/my-notifications"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-2 rounded-md my-3
                                        transition-all duration-200 
                                        ${isActive ? "bg-neutral-300 outline outline-neutral-400 text-black" : "hover:bg-neutral-700"}`
                            }
                        >
                            <span className="text-2xl"><IoNotificationsOutline /></span> Notificaciónes
                        </NavLink>
                        <hr className="last:hidden text-neutral-300 my-3" />
                        <NavLink
                            to="/my-account"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-2 rounded-md my-3
                                        transition-all duration-200 
                                        ${isActive ? " bg-neutral-300 outline outline-neutral-400 text-black" : "hover:bg-neutral-700"}`
                            }
                        >
                            <span className="text-2xl"><IoPersonOutline /></span> Mi cuenta
                        </NavLink>
                        <NavLink
                            to="/help"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-2 rounded-md my-3
                                        transition-all duration-200 
                                        ${isActive ? "bg-neutral-300 outline outline-neutral-400 text-black" : "hover:bg-neutral-700"}`
                            }
                        >
                            <span className="text-2xl"><IoHelpOutline /></span> Ayuda
                        </NavLink>
                        <NavLink
                            to="/"
                            onClick={logout}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-2 rounded-md my-3
                                        transition-all duration-200 
                                        ${isActive ? "g-neutral-300 outline outline-neutral-400 text-black" : "hover:bg-neutral-700"}`
                            }
                        >
                            <span className="text-2xl"><IoLogOutOutline /></span> Desconectar
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </aside>
};