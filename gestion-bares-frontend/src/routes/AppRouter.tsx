import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../features/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    }
]);

export const AppRouter = () => {
    return (
        <Suspense>
            <RouterProvider router={router} />
        </Suspense>
    )
}