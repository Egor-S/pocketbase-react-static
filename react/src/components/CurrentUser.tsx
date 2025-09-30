import { UserQueryOptions, LogoutMutationOptions } from "@/api/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function CurrentUser(props: React.ComponentProps<"div">) {
  const { data: user, isLoading, isError } = useQuery(UserQueryOptions);
  const { mutate: logout } = useMutation(LogoutMutationOptions);
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <div {...props}>Loading...</div>;
  }

  if (!user || isError) {
    return (
      <div {...props}>
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          {user.record.email}
        </DropdownMenuTrigger>
        {isOpen && (
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
