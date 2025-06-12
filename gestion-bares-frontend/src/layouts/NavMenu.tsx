import { IoBookOutline, IoCloseOutline, IoHelpOutline, IoLogOutOutline, IoMenuOutline, IoNotificationsOutline, IoPeopleOutline, IoPersonOutline, IoRestaurantOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef } from "react"; // Importar useRef y useEffect

export const NavMenu = ({ isOpen, setIsSidebarOpen }: { isOpen: boolean; setIsSidebarOpen: (open: boolean) => void }) => {
    const { user, logout } = useAuth();
    const sidebarRef = useRef<HTMLElement>(null); // Crear una referencia para el sidebar

    const links = [
        {
            access: "ADMIN",
            sections: [
                { name: "Usuarios", url: "/admin/users", icon: <IoPeopleOutline /> },
                { name: "Restaurantes", url: "/admin/restaurants", icon: <IoRestaurantOutline /> },
                { name: "Asignaciones", url: "/admin/asignations", icon: <IoPeopleOutline /> },
                // Secciones de administradores
            ],
        },
        {
            access: "STAFF",
            sections: [
                { name: "Reservas", url: "/staff/restaurant/reservations", icon: <IoBookOutline /> },
                { name: "Información", url: "/staff/restaurant/info", icon: <IoRestaurantOutline /> },
                { name: "Menú", url: "/staff/restaurant/menu", icon: <IoMenuOutline /> },
                // Secciones de staff
            ],
        },
        {
            access: "CUSTOMER",
            sections: [
                { name: "Mis Reservas", url: "/my-reservations", icon: <IoBookOutline /> },
                { name: "Información", url: "/restaurant/info", icon: <IoRestaurantOutline /> },
                { name: "Menú", url: "/restaurant/menu", icon: <IoMenuOutline /> },
                // Secciones de customer
            ],
        },
    ];

    const filteredLinks = links.filter(
        (link) => link.access === "all" || link.access === user.role
    );

    // Efecto para manejar clics fuera del menú
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Si el menú está abierto y el clic no es dentro del menú
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                // Y si el clic no es en el botón que abre el menú (para evitar que se cierre inmediatamente después de abrirlo en móvil)
                // Asumimos que el botón que abre el menú tiene un identificador o una clase específica.
                // Por ahora, esta comprobación es básica. Si tienes un botón específico para abrir,
                // podrías necesitar una lógica más robusta aquí, por ejemplo, pasando una referencia a ese botón.
                const targetElement = event.target as HTMLElement;
                if (!targetElement.closest('button[aria-label="Open sidebar"]')) { // Ajusta este selector si es necesario
                    setIsSidebarOpen(false);
                }
            }
        };

        // Añadir el event listener cuando el menú está abierto
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Limpiar el event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsSidebarOpen]);

    return <aside
        id="default-sidebar"
        ref={sidebarRef} // Asignar la referencia al elemento aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 bg-white border-r border-slate-200 shadow-sm text-slate-700`}
        aria-label="Sidebar"
    >
        <button
            onClick={() => setIsSidebarOpen(false)}
            type="button"
            className="cursor-pointer absolute inline-flex items-center rounded-full p-2 m-2 text-2xl text-slate-700 transition hover:bg-amber-500 duration-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
            <span className="sr-only">Close sidebar</span>
            <IoCloseOutline className="size-6" aria-hidden="true" />
        </button>

        <div className="h-full pt-8 px-3 overflow-y-auto flex flex-col">
            <Link to="/main">
                <div className="border-b pb-5 flex items-center justify-center">
                    <img className="h-20 transition hover:scale-110 active:scale-95" src="/img/logopng.png" alt="logo" />
                </div>
            </Link>
            <div className="font-medium flex flex-col flex-1">
                <div className="flex flex-col justify-between h-full">
                    {filteredLinks.map((linkGroup, index) => (
                        <div key={index}>
                            {linkGroup.sections.map((section, idx) => (
                                <NavLink
                                    to={section.url}
                                    key={idx}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-5 py-2 rounded-md my-3 text-lg font-semibold transition-all duration-200 ${isActive ? "bg-amber-400 text-amber-900 shadow-md ring-2 ring-amber-500" : "text-slate-700 hover:bg-amber-200 hover:text-neutral-600"}`
                                    }
                                >
                                    <span className="text-2xl">{section.icon}</span> {section.name}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                    <div>
                        {user && user.role !== "ADMIN" && (
                            <NavLink
                                to="/my-notifications"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-5 py-2 rounded-md my-3 text-lg font-semibold transition-all duration-200 ${isActive ? "bg-amber-400 text-amber-900 shadow-md ring-2 ring-amber-500" : "text-slate-700 hover:bg-amber-200 hover:text-neutral-600"}`
                                }
                            >
                                <span className="text-2xl"><IoNotificationsOutline /></span> Notificaciónes
                            </NavLink>
                        )}
                        <hr className="last:hidden text-neutral-900 my-3" />
                        <NavLink
                            to="/help"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-2 rounded-md my-3 text-lg font-semibold transition-all duration-200 ${isActive ? "bg-amber-400 text-amber-900 shadow-md ring-2 ring-amber-500" : "text-slate-700 hover:bg-amber-200 hover:text-neutral-600"}`
                            }
                        >
                            <span className="text-2xl"><IoHelpOutline /></span> Ayuda
                        </NavLink>
                        <NavLink
                            to="/my-account"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-2 rounded-md my-3 text-lg font-semibold transition-all duration-200 ${isActive ? "bg-amber-400 text-amber-900 shadow-md ring-2 ring-amber-500" : "text-slate-700 hover:bg-amber-200 hover:text-neutral-600"}`
                            }
                        >
                            <span className="text-2xl"><IoPersonOutline /></span> Cuenta - {user?.role || "Invitado"}
                        </NavLink>
                        <NavLink
                            to="/"
                            onClick={logout}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-2 rounded-md my-3 text-lg font-semibold transition-all duration-200 ${isActive ? "bg-amber-400 text-amber-900 shadow-md ring-2 ring-amber-500" : "text-slate-700 hover:bg-amber-200 hover:text-neutral-600"}`
                            }
                        >
                            <span className="text-2xl"><IoLogOutOutline /></span> Desconectar
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </aside >
};