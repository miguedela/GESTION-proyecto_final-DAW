import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { NavMenu } from "../../layouts/NavMenu";

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        type="button"
        className="cursor-pointer inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <IoMenuOutline className="size-6" aria-hidden="true" />
      </button>

      <div className="min-h-screen flex bg-neutral-900 text-neutral-800">
        <NavMenu isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 p-4 sm:ml-64">
          <Breadcrumbs />
          <div className="min-h-[calc(100vh-76px)] bg-neutral-800 p-28 rounded-xl flex justify-center items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
