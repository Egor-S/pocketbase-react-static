import { useEffect } from "react";
import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { UserQueryOptions } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_auth")({
  component: AuthenticatedRoute,
});

function AuthenticatedRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useQuery(UserQueryOptions);

  useEffect(() => {
    if (!isLoading && (!user || isError)) {
      navigate({ to: "/login", search: { next: location.pathname } });
    }
    // don't include location.pathname in the dependency array, it will always end up with ?next=/login
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, user, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}
