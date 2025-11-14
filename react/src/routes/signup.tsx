import { UserQueryOptions } from "@/api/auth";
import { SignupForm } from "@/components/SignupForm";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";

type SignupSearch = {
  next?: string;
};

export const Route = createFileRoute("/signup")({
  component: Signup,
  validateSearch: (search: Record<string, unknown>): SignupSearch => {
    return {
      next: (search.next as string) || "/",
    };
  },
});

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useQuery(UserQueryOptions);

  // if the user is authenticated, redirect to the next page
  useEffect(() => {
    if (user && !isLoading && !isError) {
      navigate({ to: location.search.next });
    }
  }, [user, isLoading, isError, navigate, location.search.next]);

  return (
    <div className="bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm next={location.search.next} />
      </div>
    </div>
  );
}
