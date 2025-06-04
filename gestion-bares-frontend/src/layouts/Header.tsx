import { useAtom } from "jotai";
import { IoCallOutline, IoInformationCircleOutline, IoNotificationsOutline, IoPersonOutline, IoRestaurantOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { userAtom } from "../atoms/user.atom";
import { Roles } from "../types/User";

export const Header = () => {
    const [user] = useAtom(userAtom);

    return (
        <header className="w-full bg-white border-b border-slate-200 shadow-sm text-slate-900">
            <div className="mx-auto flex items-center justify-between py-4 px-6 md:px-12">
                <Link to="/main">
                    <div className="flex items-end gap-2 transition-transform hover:scale-105 active:scale-95">
                        <h1 className="text-3xl font-extrabold tracking-tight text-amber-600 border-b-4 border-amber-500 pb-1">
                            TapaTech
                        </h1>
                    </div>
                </Link>
                <nav className="flex gap-6 items-center">
                    <Link to="/about" className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                        <IoInformationCircleOutline size={26} className="transition-transform hover:scale-125 active:scale-95" />
                    </Link>
                    <Link to="/contact" className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                        <IoCallOutline size={26} className="transition-transform hover:scale-125 active:scale-95" />
                    </Link>
                    {user?.role === Roles.CUSTOMER && (
                        <Link to="/reservations" className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                            <IoRestaurantOutline size={26} className="transition-transform hover:scale-125 active:scale-95" />
                        </Link>
                    )}
                    <Link to={user.role === Roles.CUSTOMER ? "/notifications" : "/my-notifications"} className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                        <IoNotificationsOutline size={26} className="transition-transform hover:scale-125 active:scale-95" />
                    </Link>
                    <Link to={user?.role === Roles.CUSTOMER ? "/account" : "/my-account"} className="flex items-center gap-1 text-slate-700 hover:text-amber-500 transition-colors duration-200">
                        <IoPersonOutline size={26} className="transition-transform hover:scale-125 active:scale-95" />
                    </Link>
                </nav>
            </div>
        </header>
    );
};