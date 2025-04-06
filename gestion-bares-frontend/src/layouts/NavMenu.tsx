import { IoCloseOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const NavMenu = ({ isOpen, setIsSidebarOpen }: { isOpen: boolean; setIsSidebarOpen: (open: boolean) => void }) => {
    const { user, logout } = useAuth();

    const links = [
        {
            access: "ADMIN",
            sections: [
                { name: "Usuarios", url: "/admin/users", icon: <IoPeopleOutline /> }
                // Secciones de administradores
            ],
        },
        {
            access: "STAFF",
            sections: [
                // Secciones de staff
            ],
        },
        {
            access: "CUSTOMER",
            sections: [
                // Secciones de customer
            ],
        },
        {
            access: "all",
            sections: [
                { name: "Mi cuenta", url: "/account", icon: <IoPersonOutline /> },
                {
                    name: "Desconectar",
                    url: "/",
                    icon: <IoLogOutOutline />,
                    onClick: logout,
                },
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

        <div className="h-full py-14 px-3 overflow-y-auto flex flex-col dark:bg-neutral-800 bg-white">
            <div className="border-b pb-5 flex items-end">
                <div className="ml-3 w-5 h-full bg-amber-600"></div>
                <h1 className="text-2xl font-semibold border-b-3 border-amber-600 pl-2">TapaTech</h1>
            </div>
            <div className="font-medium flex flex-col flex-1">
                {filteredLinks.map((linkGroup, index) => (
                    <>
                        <div key={index}>
                            {linkGroup.sections.map((section, idx) => (
                                <NavLink
                                    to={section.url}
                                    key={idx}
                                    onClick={section.onClick}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-5 py-2 rounded-md my-3
                                        transition-all duration-200 
                                        ${isActive ? "dark:bg-neutral-600 bg-neutral-300 outline outline-neutral-400 dark:text-neutral-100 text-black" : "hover:bg-neutral-700"}`
                                    }
                                >
                                    <span className="text-2xl">{section.icon}</span> {section.name}
                                </NavLink>
                            ))}
                        </div>
                        <hr className="last:hidden text-neutral-300 my-3" />
                    </>
                ))}
            </div>
        </div>
    </aside>
};