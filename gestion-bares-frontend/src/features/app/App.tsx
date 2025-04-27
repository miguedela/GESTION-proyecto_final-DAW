import { useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { NavMenu } from "../../layouts/NavMenu";

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme") || "system";
    setTheme(selectedTheme);

    if (selectedTheme === "dark" || (selectedTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        type="button"
        className="cursor-pointer inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <IoMenuOutline className="size-6" aria-hidden="true" />
      </button>

      <div className="min-h-screen flex bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
        <NavMenu isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 md:p-4 lg:ml-64">
          <Breadcrumbs />
          <div className="min-h-[calc(100vh-76px)] bg-neutral-200 dark:bg-neutral-800 p-4 lg:p-16 rounded-xl flex justify-center items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
