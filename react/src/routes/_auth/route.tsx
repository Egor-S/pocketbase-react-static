import { useEffect } from "react";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserQueryOptions } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { CurrentUser } from "@/components/CurrentUser";

export const Route = createFileRoute("/_auth")({
  component: AuthenticatedRoute,
});

function AuthenticatedRoute() {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useQuery(UserQueryOptions);

  useEffect(() => {
    if (!isLoading && (!user || isError)) {
      navigate({ to: "/login" });
    }
  }, [isLoading, isError, user, navigate]);

  return (
    <>
      <CurrentUser className="p-2" />
      <Outlet />
    </>
  );
}
