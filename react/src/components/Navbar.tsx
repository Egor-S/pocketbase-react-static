import { CurrentUser } from "@/components/CurrentUser";
import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <NavigationMenu
      viewport={false}
      className="w-full max-w-none justify-between p-2 border-b border-gray-200"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/" className="font-semibold">
              PocketBase SPA
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <CurrentUser />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
