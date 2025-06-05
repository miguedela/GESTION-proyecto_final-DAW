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
        className="cursor-pointer inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-600 rounded-lg lg:hidden hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        <span className="sr-only">Open sidebar</span>
        <IoMenuOutline className="size-6" aria-hidden="true" />
      </button>

      <div className="min-h-screen flex bg-linear-to-br from-neutral-800  to-amber-600 text-neutral-900">
        <NavMenu isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 md:p-4 lg:ml-64">
          <Breadcrumbs />
          <div className="min-h-[calc(100vh-76px)] bg-white/95 border border-amber-100 p-4 lg:p-12 rounded-xl flex justify-center items-center shadow-xl transition-all">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};