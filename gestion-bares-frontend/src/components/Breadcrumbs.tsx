// src/components/Breadcrumbs.tsx
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { breadcrumbsAtom } from "../atoms/breadcrumbs.atom";

export const Breadcrumbs = () => {
  const [breadcrumbs] = useAtom(breadcrumbsAtom);

  return (
    <nav aria-label="Breadcrumb" className="text-sm py-3">
      <ol className="flex space-x-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2 text-white">/</span>
              {isLast ? (
                <span className="text-gray-300">{breadcrumb.label}</span>
              ) : (
                <Link to={breadcrumb.path} className="text-blue-400 hover:text-blue-500">
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};