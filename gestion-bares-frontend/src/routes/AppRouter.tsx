import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../features/home/Home";
import { Login } from "../features/auth/Login";
import { Register } from "../features/auth/Register";
import { NotFound } from "../features/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);

export const AppRouter = () => {
    return (
        <Suspense>
            <RouterProvider router={router} />
        </Suspense>
    )
}