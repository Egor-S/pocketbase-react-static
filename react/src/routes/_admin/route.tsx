import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminQueryOptions } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const Route = createFileRoute("/_admin")({
  component: AdminRoute,
});

function AdminRoute() {
  const { data: admin, isLoading, isError } = useQuery(AdminQueryOptions);

  useEffect(() => {
    if (!isLoading && (!admin || isError)) {
      window.location.assign("/_/#/login");
    }
  }, [isLoading, isError, admin]);

  return <Outlet />;
}
