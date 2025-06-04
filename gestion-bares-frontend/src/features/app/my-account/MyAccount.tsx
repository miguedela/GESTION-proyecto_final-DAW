import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { breadcrumbsAtom } from '../../../atoms/breadcrumbs.atom';
import useAuth from '../../../hooks/useAuth';
import { Roles } from '../../../types/User';

export const MyAccount = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
    useEffect(() => {
        setBreadcrumbs([
            { label: "Inicio", path: "/main" },
            { label: "Mi cuenta", path: "/account" }
        ]);
    }, [setBreadcrumbs]);

    return (
        <main className="container mx-auto flex-1 flex flex-col gap-8 text-slate-800 rounded-xl p-8 bg-white shadow-sm border border-slate-200 max-w-2xl mt-8 mb-8">
            <h1 className="mb-7 text-3xl font-extrabold text-center text-amber-700 tracking-tight border-b pb-2 border-slate-200">Mi Cuenta</h1>
            <div className='flex justify-center'>
                <div className="flex flex-col gap-6 w-full max-w-md">
                    <div className="border-b border-slate-200 pb-2">
                        <span className="text-xs text-slate-400">Nombre</span>
                        <p className="ml-2 mt-1 font-medium">{user.name}</p>
                    </div>
                    <div className="border-b border-slate-200 pb-2">
                        <span className="text-xs text-slate-400">Apellidos</span>
                        <p className="ml-2 mt-1 font-medium">{user.surnames}</p>
                    </div>
                    <div className="border-b border-slate-200 pb-2">
                        <span className="text-xs text-slate-400">Email</span>
                        <p className="ml-2 mt-1 font-medium">{user.email}</p>
                    </div>
                    <div className="border-b border-slate-200 pb-2">
                        <span className="text-xs text-slate-400">Teléfono</span>
                        <p className="ml-2 mt-1 font-medium">{user.telephone}</p>
                    </div>
                    <Link
                        to={localStorage.getItem("restaurantId") || user?.role == Roles.ADMIN ? "/my-account/edit" : "/account/edit"}
                        className='text-center text-white px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded transition font-semibold shadow'
                    >
                        Editar
                    </Link>
                    <button
                        onClick={() => { logout(); navigate("/"); }}
                        className="text-center text-amber-600 border border-amber-200 hover:bg-amber-50 px-4 py-2 rounded transition font-semibold shadow"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </main>
    );
}