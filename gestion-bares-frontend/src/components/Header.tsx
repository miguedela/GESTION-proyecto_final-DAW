import { Link } from "react-router-dom";

export const Header = () => (
    <header className=" w-full bg-white dark:bg-neutral-900 shadow-md dark:shadow-none border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between py-4 px-6">
            <Link to="/main">
                <div className="flex items-end transition-transform hover:scale-105 active:scale-95">
                    <div className="ml-3 w-5 h-full bg-amber-600"></div>
                    <h1 className="text-2xl font-semibold border-b-3 border-amber-600 pl-2">TapaTech</h1>
                </div>
            </Link>
            <nav className="flex gap-6">
                <Link to="/about" className="text-neutral-700 dark:text-neutral-200 hover:text-amber-500 transition-colors">Sobre Nosotros</Link>
                <Link to="/contact" className="text-neutral-700 dark:text-neutral-200 hover:text-amber-500 transition-colors">Contacto</Link>
                <Link to="/account" className="text-neutral-700 dark:text-neutral-200 hover:text-amber-500 transition-colors">Cuenta</Link>
            </nav>
        </div>
    </header>
);