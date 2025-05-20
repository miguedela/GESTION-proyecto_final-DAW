import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About } from '../features/app/About';
import { CreateRestaurant } from '../features/app/admin/restaurants/CreateRestaurant';
import { RestaurantsManagement } from '../features/app/admin/restaurants/RestaurantsManagement';
import { EditUser } from '../features/app/admin/users/EditUser';
import { UserDetails } from '../features/app/admin/users/UserDetails';
import { UsersManagement } from '../features/app/admin/users/UsersManagement';
import { App } from '../features/app/App';
import { Contact } from '../features/app/Contact';
import { Reservations } from '../features/app/customer/Reservations';
import { EditMyAccount } from '../features/app/my-account/EditMyAccount';
import { MyAccount } from '../features/app/my-account/MyAccount';
import { RestaurantDetail } from '../features/app/restaurants/RestaurantDetail';
import { RestaurantsList } from '../features/app/restaurants/RestaurantsList';
import { CreateDishToMenu } from '../features/app/staff/restaurants/menu/CreateDishToMenu';
import { EditDish } from '../features/app/staff/restaurants/menu/EditDish';
import { RestaurantMenu } from '../features/app/staff/restaurants/menu/RestaurantMenu';
import { RestaurantDetailStaff } from '../features/app/staff/restaurants/RestaurantDetailStaff';
import { RestaurantEdit } from '../features/app/staff/restaurants/RestaurantEdit';
import { RestaurantManagement } from '../features/app/staff/restaurants/RestaurantManagement';
import { LogIn } from '../features/auth/LogIn';
import { SignUp } from '../features/auth/SignUp';
import { Home } from '../features/home/Home';
import { NotFound } from '../features/not-found/NotFound';
import { ProtectedRoute } from './ProtectedRoute';

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
        { path: '/signup', element: <SignUp /> },
        { path: '/main', element: <RestaurantsList /> },
        { path: '/about', element: <About /> },
        { path: '/contact', element: <Contact /> },
        { path: '/restaurant/:id', element: <RestaurantDetail /> },
        { path: '*', element: <NotFound /> },

        {
            element: <ProtectedRoute allowedRoles={["ADMIN", "STAFF", "CUSTOMER"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        { path: "/account", element: <MyAccount /> },
                        { path: "/account/edit", element: <EditMyAccount /> },
                        // Rutas para todos los usuarios
                    ]
                }
            ]
        }, {
            element: <ProtectedRoute allowedRoles={["STAFF", "CUSTOMER"]} />,
            children: [
                { path: "/main", element: <RestaurantsList /> },
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        { path: "/admin/users", element: <UsersManagement /> },
                        { path: "/admin/users/:id", element: <UserDetails /> },
                        { path: "/admin/users/edit/:id", element: <EditUser /> },

                        { path: "/admin/restaurants", element: <RestaurantsManagement /> },
                        { path: "/admin/restaurants/create", element: <CreateRestaurant /> },
                        { path: "/admin/restaurants/:id", element: <RestaurantDetail /> },
                        // Rutas para administradores
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["STAFF"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        { path: "/staff/restaurants", element: <RestaurantManagement /> },
                        { path: "/staff/restaurant/:id", element: <RestaurantDetailStaff /> },
                        { path: "/staff/restaurant/:id/edit", element: <RestaurantEdit /> },
                        { path: "/staff/restaurant/:id/menu", element: <RestaurantMenu /> },
                        { path: "/staff/restaurant/:restaurantId/menu/:menuId/create", element: <CreateDishToMenu /> },
                        { path: "/staff/restaurant/menu/dish/:id/edit", element: <EditDish /> },
                        // Rutas para staffs
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["CUSTOMER"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        { path: "/reservations", element: <Reservations /> },
                        // Rutas para customers
                    ]
                }
            ]
        },
    ]);

    return <RouterProvider router={router} />;
};
