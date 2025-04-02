import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LogIn } from "../components/LogIn";
import { SignUp } from "../components/SignUp";
import { Home } from "../features/home/Home";
import { NotFound } from "../features/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";



export const AppRouter = () => {

    const renderMultiRoutes = ({ element: Element, paths, ...rest }: { element: React.ReactElement; paths: string[];[key: string]: unknown }) => paths.map((path: string) => {
        return {
            ...rest,
            path, element: Element
        }
    });

    const router = createBrowserRouter([
        ...renderMultiRoutes({ paths: ['/home', '/'], element: <Home /> }),
        { path: '/login', element: <LogIn /> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '*', element: <NotFound /> },
        
        {
            element: <ProtectedRoute allowedRoles={['ADMIN', 'STAFF', 'CUSTOMER']} />,
            children: [{
                element: <AppRouter />,
                children: [
                    
                    // {path: '/account', element: <Account />}
                ]
            }]
        },
        {
            element: <ProtectedRoute allowedRoles={['ADMIN']} />,
            children: [{
                element: <AppRouter />,
                children: [
                    // {path: '/admin/users', element: <UsersManagement />},
                    // {path: '/admin/restaurants', element: <RestaurantsManagement />}
                ]
            }]
        },
        {
            element: <ProtectedRoute allowedRoles={['STAFF']} />,
            children: [{
                element: <AppRouter />,
                children: [
                    // {path: '/menu/management', element: <MenuManagement />},
                    // {path: '/reservation/management', element: <ReservationManagement />},
                    // {path: '/tables/management', element: <TableManagement />},
                    // {path: '/notification/management', element: <NotificationManagement />},
                    // {path: '/details/management', element: <DetailsManagement />}
                ]
            }]
        },
        {
            element: <ProtectedRoute allowedRoles={['CUSTOMER']} />,
            children: [{
                element: <AppRouter />,
                children: [
                    // {path: '/my/reservervations', element: <MyReservations />},
                    // {path: '/menus', element: <Menus />},
                    // {path: '/contact', element: <Contact />}
                ]
            }]
        }
    ]);

    return <RouterProvider router={router} />;

}