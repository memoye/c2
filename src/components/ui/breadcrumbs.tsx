import { Link, useMatches } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { RouteMetadata } from "@/routes";

export function Breadcrumbs() {
  const matches = useMatches();
  // const location = useLocation();

  const breadcrumbs = matches
    .filter(
      (match) => match.handle && (match.handle as RouteMetadata).breadcrumb,
    )
    .map((match) => {
      const breadcrumb = (match.handle as RouteMetadata).breadcrumb;
      const title =
        typeof breadcrumb === "function"
          ? breadcrumb(match.params)
          : breadcrumb;
      return {
        title: title || "Home", // Provide a default title
        path: match.pathname,
      };
    });

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs if there's only one item (usually the root)
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <BreadcrumbItem key={crumb.path}>
              {!isLast ? (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path}>{crumb.title}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
