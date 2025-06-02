import { useAtom } from "jotai";
import { IoCallOutline, IoInformationCircleOutline, IoPersonOutline, IoRestaurantOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { userAtom } from "../atoms/user.atom";
import { Roles } from "../types/User";

export const Header = () => {
    const [user] = useAtom(userAtom);

    return (
        <header className="w-full bg-white shadow-md">
            <div className="flex items-center justify-between py-4 px-6">
                <Link to="/main">
                    <div className="flex items-end transition-transform hover:scale-105 active:scale-95">
                        <div className="ml-3 w-5 h-full bg-amber-600"></div>
                        <h1 className="text-2xl font-semibold border-b-3 border-amber-600 pl-2">TapaTech</h1>
                    </div>
                </Link>
                <nav className="flex gap-6 items-center">
                    <Link to="/about" className="flex items-center gap-1 text-neutral-700 hover:text-amber-500 transition-colors">
                        <IoInformationCircleOutline size={22} className="text-amber-600" />
                    </Link>
                    <Link to="/contact" className="flex items-center gap-1 text-neutral-700 hover:text-amber-500 transition-colors">
                        <IoCallOutline size={22} className="text-amber-600" />
                    </Link>
                    {user?.role === Roles.CUSTOMER && (
                        <Link to="/reservations" className="flex items-center gap-1 text-neutral-700 hover:text-amber-500 transition-colors">
                            <IoRestaurantOutline size={22} className="text-amber-600" />
                        </Link>
                    )}
                    <Link to={user?.role === Roles.CUSTOMER ? "/account" : "/my-account"} className="flex items-center gap-1 text-neutral-700 hover:text-amber-500 transition-colors">
                        <IoPersonOutline size={24} className="text-amber-600" />
                    </Link>
                </nav>
            </div>
        </header>
    );
};