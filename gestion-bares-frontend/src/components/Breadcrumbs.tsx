import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { breadcrumbsAtom } from "../atoms/breadcrumbs.atom";

export const Breadcrumbs = () => {
  const [breadcrumbs] = useAtom(breadcrumbsAtom);

  return (
    <nav aria-label="Breadcrumb" className="text-sm py-3 text-slate-50">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2 text-slate-50">/</span>
              {isLast ? (
                <span className="text-slate-50 font-semibold">{breadcrumb.label}</span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-amber-500 hover:text-amber-600 font-medium underline underline-offset-4 transition-colors duration-200"
                >
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