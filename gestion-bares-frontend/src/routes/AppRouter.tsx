import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Account } from '../features/account/Account';
import { EditAccount } from '../features/account/EditAccount';
import { About } from '../features/app/About';
import { CreateRestaurant } from '../features/app/admin/restaurants/CreateRestaurant';
import { RestaurantsManagement } from '../features/app/admin/restaurants/RestaurantsManagement';
import { EditUser } from '../features/app/admin/users/EditUser';
import { UserDetails } from '../features/app/admin/users/UserDetails';
import { UsersManagement } from '../features/app/admin/users/UsersManagement';
import { App } from '../features/app/App';
import { Contact } from '../features/app/Contact';
import { MyNotifications } from '../features/app/customer/MyNotifications';
import { MyReservations } from '../features/app/customer/reservation/MyReservations';
import { NewReservation } from '../features/app/customer/reservation/NewReservation';
import { Reservations } from '../features/app/customer/reservation/Reservations';
import { UpdateReservation } from '../features/app/customer/reservation/UpdateReservation';
import { RestaurantContact } from '../features/app/customer/restaurant/RestaurantContact';
import { RestaurantDetail } from '../features/app/customer/restaurant/RestaurantDetail';
import { RestaurantMenu } from '../features/app/customer/restaurant/RestaurantMenu';
import { Help } from '../features/app/Help';
import { EditMyAccount } from '../features/app/my-account/EditMyAccount';
import { MyAccount } from '../features/app/my-account/MyAccount';
import { CreateDishToMenu } from '../features/app/staff/restaurants/menu/CreateDishToMenu';
import { EditDish } from '../features/app/staff/restaurants/menu/EditDish';
import { StaffRestaurantMenu } from '../features/app/staff/restaurants/menu/RestaurantMenu';
import { RestaurantDetailStaff } from '../features/app/staff/restaurants/RestaurantDetailStaff';
import { RestaurantEdit } from '../features/app/staff/restaurants/RestaurantEdit';
import { RestaurantManagement } from '../features/app/staff/restaurants/RestaurantManagement';
import { ChangePassword } from '../features/auth/ChangePassword';
import { LogIn } from '../features/auth/LogIn';
import { ResetPassword } from '../features/auth/ResetPassword';
import { SignUp } from '../features/auth/SignUp';
import { Home } from '../features/home/Home';
import { NotFound } from '../features/not-found/NotFound';
import { Menu } from '../features/restaurants/Menu';
import { Restaurant } from '../features/restaurants/Resaturant';
import { RestaurantsList } from '../features/restaurants/RestaurantsList';
import { ProtectedRoute } from './ProtectedRoute';
import { Notifications } from '../features/Notifications';

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
        { path: "/account/reset-password", element: <ResetPassword /> },
        { path: "/account/change-password", element: <ChangePassword /> },
        { path: '/main', element: <RestaurantsList /> },
        { path: '/about', element: <About /> },
        { path: '/contact', element: <Contact /> },
        { path: '/restaurant', element: <Restaurant /> },
        { path: '/menu', element: <Menu /> },
        { path: "/help", element: <Help /> },
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
                        { path: "/staff/restaurant/:id/menu", element: <StaffRestaurantMenu /> },
                        { path: "/staff/restaurant/:restaurantId/menu/:menuId/create", element: <CreateDishToMenu /> },
                        { path: "/staff/restaurant/menu/:restaurantId/dish/:id/edit", element: <EditDish /> },
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
                        { path: "/reservation/:reservationId/update", element: <UpdateReservation /> },
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
