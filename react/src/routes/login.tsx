import {
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { LoginForm } from "@/components/LoginForm";
import { UserQueryOptions } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type LoginSearch = {
  next?: string;
};

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      next: (search.next as string) || "/",
    };
  },
});

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useQuery(UserQueryOptions);

  useEffect(() => {
    if (user && !isLoading && !isError) {
      navigate({ to: location.search.next });
    }
  }, [user, isLoading, isError, navigate, location.search.next]);

  return (
    <div className="bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
