import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { breadcrumbsAtom } from '../../../atoms/breadcrumbs.atom';
import useAuth from '../../../hooks/useAuth';
import { Roles } from '../../../types/User';


export const MyAccount = () => {
    const { user } = useAuth();

    const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);
    useEffect(() => {
        setBreadcrumbs([
            { label: "Inicio", path: "/main" },
            { label: "Mi cuenta", path: "/account" }
        ]);
    }, [setBreadcrumbs]);

    return (
        <main className="container mx-auto flex-1 flex flex-col gap-6 bg-white text-dark rounded-md p-8">
            <h1 className="mb-7">Mi Cuenta</h1>

            <div className='flex justify-center gap-14'>
                <div className="flex flex-col gap-5">
                    <div className="border-b border-neutral-400">
                        <span className="text-xs text-neutral-400">Nombre</span>
                        <p className="ml-2 mt-1">{user.name}</p>
                    </div>
                    <div className="border-b border-neutral-400">
                        <span className="text-xs text-neutral-400">Apellidos</span>
                        <p className="ml-2 mt-1">{user.surnames}</p>
                    </div>
                    <div className="border-b border-neutral-400">
                        <span className="text-xs text-neutral-400">Email</span>
                        <p className="ml-2 mt-1">{user.email}</p>
                    </div>
                    <div className="border-b border-neutral-400">
                        <span className="text-xs text-neutral-400">Teléfono</span>
                        <p className="ml-2 mt-1">{user.telephone}</p>
                    </div>
                    <Link to={localStorage.getItem("restaurantId") || user?.role !== Roles.CUSTOMER ? "/my-account/edit" : "/account/edit"} className='text-center text-neutral-800 px-4 py-2 bg-yellow-600 rounded'>Editar</Link>
                </div>

            </div>
        </main>
    );
}
