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
                ]
            }]
        },
        {
            element: <ProtectedRoute allowedRoles={['ADMIN']} />,
            children: [{
                element: <AppRouter />,
                children: [
                    // {path: '/admin/users', element: <UsersManagement />},
                    // {path: '/admin/restaurants', element: <RestaurantsManagement />},
                ]
            }]
        },
        {
            element: <ProtectedRoute allowedRoles={['STAFF']} />,
            children: [{
                element: <AppRouter />,
                children: [
                ]
            }]
        },
        {
            element: <ProtectedRoute allowedRoles={['CUSTOMER']} />,
            children: [{
                element: <AppRouter />,
                children: [
                ]
            }]
        }
    ]);

    return <RouterProvider router={router} />;

}