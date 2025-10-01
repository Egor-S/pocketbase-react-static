import { UserQueryOptions, LogoutMutationOptions } from "@/api/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { NavigationMenuItemProps } from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

export function CurrentUser({ className, ...props }: NavigationMenuItemProps) {
  const { data: user, isLoading, isError } = useQuery(UserQueryOptions);
  const { mutate: logout } = useMutation(LogoutMutationOptions);

  if (isLoading) {
    return (
      <NavigationMenuItem className={className} {...props}>
        Loading...
      </NavigationMenuItem>
    );
  }

  if (!user || isError) {
    return (
      <NavigationMenuItem
        asChild
        className={cn(navigationMenuTriggerStyle(), className)}
        {...props}
      >
        <Link to="/login">Sign in</Link>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem className={className} {...props}>
      <NavigationMenuTrigger>{user.record.email}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink
          onClick={() => logout()}
          className="text-red-600 hover:text-red-800 cursor-pointer"
        >
          Logout
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
