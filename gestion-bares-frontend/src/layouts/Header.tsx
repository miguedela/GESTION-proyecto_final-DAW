import { useAtom } from "jotai";
import { IoBookOutline, IoCallOutline, IoInformationCircleOutline, IoNotificationsOutline, IoPersonOutline, IoRestaurantOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { userAtom } from "../atoms/user.atom";
import { Roles } from "../types/User";

export const Header = () => {
    const [user] = useAtom(userAtom);

    return <>
        <header className="w-full sm:w-[95%] sm:top-4 left-1/2 -translate-x-1/2 fixed z-50 mx-auto sm:rounded-2xl bg-slate-50/80 border-b border-slate-200 shadow-sm text-slate-900 backdrop-blur-xs">
            <div className="mx-auto flex flex-wrap items-center justify-between gap-2 py-4 px-6 md:px-12">
                <Link to="/main">
                    <div className="flex items-end gap-2 transition-transform hover:scale-110 active:scale-95">
                        <img className="min-w-10 w-25" src="/img/logopng.png" alt="logo" />
                    </div>
                </Link>
                <nav className="flex flex-wrap gap-6 items-center">
                    <Link to="/help" className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                        <IoInformationCircleOutline size={30} className="transition-transform hover:scale-125 active:scale-95" />
                    </Link>
                    <Link to="/contact" className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                        <IoCallOutline size={26} className="transition-transform hover:scale-125 active:scale-95" />
                    </Link>
                    <div className="h-6 w-px bg-slate-900 hidden sm:block" />
                    {user?.role !== Roles.ADMIN || !user && (
                        <Link to={user?.role === Roles.CUSTOMER || user?.role === Roles.STAFF ? "/notifications" : "/my-notifications"} className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                            <IoNotificationsOutline size={26} className="transition-transform hover:scale-125 active:scale-95" />
                        </Link>
                    )}
                    <Link to="/restaurants" className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                        <IoRestaurantOutline size={25} className="transition-transform hover:scale-125 active:scale-95" />
                    </Link>
                    {user?.role === Roles.CUSTOMER && (
                        <Link to="/reservations" className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                            <IoBookOutline size={26} className="transition-transform hover:scale-125 active:scale-95" />
                        </Link>
                    )}
                    <Link to={user?.role === Roles.CUSTOMER || user?.role === Roles.STAFF ? "/account" : "/my-account"} className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                        <IoPersonOutline size={26} className="transition-transform hover:scale-125 active:scale-95" />
                    </Link>
                </nav>
            </div>
        </header>
        <div style={{ marginBottom: '9rem' }}></div>
    </>
};