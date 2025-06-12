import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Account } from '../features/account/Account';
import { EditAccount } from '../features/account/EditAccount';
import { CreateRestaurant } from '../features/app/admin/restaurants/CreateRestaurant';
import { RestaurantsManagement } from '../features/app/admin/restaurants/RestaurantsManagement';
import { EditUser } from '../features/app/admin/users/EditUser';
import { UserDetails } from '../features/app/admin/users/UserDetails';
import { UsersManagement } from '../features/app/admin/users/UsersManagement';
import { App } from '../features/app/App';
import { MyNotifications } from '../features/app/customer/MyNotifications';
import { MyReservations } from '../features/app/customer/reservation/MyReservations';
import { NewReservation } from '../features/app/customer/reservation/NewReservation';
import { Reservations } from '../features/restaurants/reservations/Reservations';
import { RestaurantContact } from '../features/app/customer/restaurant/RestaurantContact';
import { RestaurantDetail } from '../features/app/customer/restaurant/RestaurantDetail';
import { RestaurantMenu } from '../features/app/customer/restaurant/RestaurantMenu';
import { EditMyAccount } from '../features/app/my-account/EditMyAccount';
import { MyAccount } from '../features/app/my-account/MyAccount';
import { CreateDishToMenu } from '../features/app/staff/restaurants/menu/CreateDishToMenu';
import { EditDish } from '../features/app/staff/restaurants/menu/EditDish';
import { StaffRestaurantMenu } from '../features/app/staff/restaurants/menu/RestaurantMenu';
import { RestaurantDetailStaff } from '../features/app/staff/restaurants/RestaurantDetailStaff';
import { RestaurantEdit } from '../features/app/staff/restaurants/RestaurantEdit';
import { RestaurantReservations } from '../features/app/staff/restaurants/RestaurantReservations';
import { ChangePassword } from '../features/auth/ChangePassword';
import { LogIn } from '../features/auth/LogIn';
import { ResetPassword } from '../features/auth/ResetPassword';
import { SignUp } from '../features/auth/SignUp';
import { Contact } from '../features/Contact';
import { Help } from '../features/Help';
import { Home } from '../features/home/Home';
import { NotFound } from '../features/not-found/NotFound';
import { Notifications } from '../features/Notifications';
import { Privacy } from '../features/Privacy';
import { Menu } from '../features/restaurants/Menu';
import { Restaurant } from '../features/restaurants/Resaturant';
import { RestaurantsList } from '../features/restaurants/RestaurantsList';
import { Terms } from '../features/Terms';
import { ProtectedRoute } from './ProtectedRoute';
import { UpdateMyReservation } from '../features/app/customer/reservation/UpdateMyReservation';
import { UpdateReservation } from '../features/restaurants/reservations/UpdateReservation';
import { Asignations } from '../features/app/admin/Asignations';

export const AppRouter = () => {

    const renderMultiRoutes = ({ element: Element, paths, ...rest }: { element: React.ReactElement; paths: string[];[key: string]: unknown }) => paths.map((path: string) => {
        return {
            ...rest,
            path, element: Element
        }
    });

    const router = createBrowserRouter([
        ...renderMultiRoutes({ paths: ['/main', '/'], element: <Home /> }),
        { path: '/login', element: <LogIn /> },
        { path: '/signup', element: <SignUp /> },
        { path: "/account/reset-password", element: <ResetPassword /> },
        { path: "/account/change-password", element: <ChangePassword /> },
        { path: '/restaurants', element: <RestaurantsList /> },
        { path: '/restaurant', element: <Restaurant /> },
        { path: '/menu', element: <Menu /> },
        { path: '/contact', element: <Contact /> },
        { path: "/help", element: <Help /> },
        { path: "/privacy", element: <Privacy /> },
        { path: "/terms", element: <Terms /> },
        { path: '*', element: <NotFound /> },

        {
            element: <ProtectedRoute allowedRoles={["ADMIN", "STAFF", "CUSTOMER"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        { path: "/my-account", element: <MyAccount /> },
                        { path: "/my-account/edit", element: <EditMyAccount /> },
                        { path: '/my-notifications', element: <MyNotifications /> },
                        // Rutas para todos los usuarios
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["ADMIN", "STAFF", "CUSTOMER"]} />,
            children: [
                { path: "/notifications", element: <Notifications /> },
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["CUSTOMER"]} />,
            children: [
                { path: "/reservation/:reservationId/update", element: <UpdateReservation /> },
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["STAFF", "CUSTOMER"]} />,
            children: [
                { path: "/account", element: <Account /> },
                { path: "/account/edit", element: <EditAccount /> },
                { path: "/reservations", element: <Reservations /> },
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

                        { path: "/admin/asignations", element: <Asignations /> },
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
                        { path: "/staff/restaurant/reservations", element: <RestaurantReservations /> },
                        { path: "/staff/restaurant/info", element: <RestaurantDetailStaff /> },
                        { path: "/staff/restaurant/edit", element: <RestaurantEdit /> },
                        { path: "/staff/restaurant/menu", element: <StaffRestaurantMenu /> },
                        { path: "/staff/restaurant/menu/:menuId/create", element: <CreateDishToMenu /> },
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
                        { path: "/my-reservation/:reservationId/update", element: <UpdateMyReservation /> },
                        {
                            path: "/restaurant/:restaurantId/reservation/new", element:
                                <NewReservation />
                        },
                        { path: "/my-reservations", element: <MyReservations /> },
                        { path: '/restaurant/info', element: <RestaurantDetail /> },
                        { path: "/restaurant/menu", element: <RestaurantMenu /> },
                        { path: '/restaurant/contact', element: <RestaurantContact /> },
                        // Rutas para customers
                    ]
                }
            ]
        },
    ]);

    return <RouterProvider router={router} />;
};
