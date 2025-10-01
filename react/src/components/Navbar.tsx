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
    <NavigationMenu viewport={false}>
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
