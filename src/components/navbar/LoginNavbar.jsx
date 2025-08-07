import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Use react-router-dom for navigation
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/src/stores/userStore";
import { useEffect } from "react";
import useCartStore from "@/src/stores/cartManageStore"; // FIX: Correct store import
import { Badge } from "@/components/ui/badge";
import useThemeStore from "@/src/stores/themeStore";
import { getAvatarFallback } from "@/src/utils/avatarFallback";

// Note: The component was named GuestNavbar but used for logged-in users.
// Renaming to LoginNavbar for clarity.
function LoginNavbar() {
  const { logout, token, avatarUrl, userName } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();

  // FIX: Get state and actions from the cart store correctly
  const { cart, fetchCart } = useCartStore();

  // FIX: Use useEffect to fetch cart data when the user logs in (token becomes available)
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token, fetchCart]); // Dependency array ensures this runs only when needed

  // FIX: Derive cart item count directly from the cart state
  const cartItemCount = cart?.items?.length || 0;

  function handleLogout() {
    logout();
    // Optionally clear the cart state on logout
    useCartStore.getState().clearCart();
  }

  function hdltheme() {
    toggleTheme();
  }

  return (
    <nav className="flex flex-row items-center justify-between gap-1">
      <Link to="/shelf">
        <Button variant="text" color="secondary">
          <i className="fa-solid fa-bookmark mr-2"></i>Readlist
        </Button>
      </Link>

      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              showIcon={false}
              className={cn(
                buttonVariants({ variant: "outlined", color: "secondary" }),
                "w-9 px-0",
                "group-data-[state=open]:bg-primary-focus hover:bg-primary-focusVisible",
              )}
            >
              <i className="fa-solid fa-bell"></i>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[260px] gap-4 p-4">
                {/* Notification items go here */}
                <li>No new notifications.</li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <Link to="/cart">
            <NavigationMenuItem>
              <div
                className={cn(
                  buttonVariants({ variant: "outlined", color: "secondary" }),
                  "relative w-9 px-0",
                  "hover:bg-primary-focusVisible hover:text-action-active",
                )}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                {cartItemCount > 0 && (
                  <Badge className="bg-primary-main absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono text-white tabular-nums">
                    {cartItemCount}
                  </Badge>
                )}
              </div>
            </NavigationMenuItem>
          </Link>

          <NavigationMenuItem className="h-8">
            <NavigationMenuTrigger className="px-0">
              <Avatar>
                <AvatarImage src={avatarUrl} alt="@shadcn" />
                <AvatarFallback className="text-text-primary font-regular bg-action-focus text-[14px]">
                  {getAvatarFallback(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2">{userName}</div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/userproflie"
                      className="flex-row items-center gap-2"
                    >
                      Your Feed
                    </Link>
                  </NavigationMenuLink>
                  {/* <NavigationMenuLink asChild>
                    <Link to="/shelf" className="flex-row items-center gap-2">
                      Your Shelves
                    </Link>
                  </NavigationMenuLink> */}
                  <NavigationMenuLink asChild>
                    <Link to="/shelf" className="flex-row items-center gap-2">
                      Your Readlist
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <div
                      className="flex-row items-center gap-2"
                      onClick={hdltheme}
                    >
                      <div className="flex-1">
                        Theme : {theme === "light" ? "Light" : "Dark"}
                      </div>
                      {theme === "light" ? (
                        <i className="fa-solid fa-sun-bright"></i>
                      ) : (
                        <i className="fa-solid fa-moon"></i>
                      )}
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/setting/affiliate"
                      className="flex-row items-center gap-2"
                    >
                      Affiliate Program
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/setting" className="flex-row items-center gap-2">
                      Setting
                    </Link>
                  </NavigationMenuLink>
                  <div className="bg-divider my-2 h-[1px] w-full"></div>
                  <NavigationMenuLink asChild className="hover:bg-error-dark">
                    <Link
                      href="#"
                      className="text-error-main flex-row items-center gap-2"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
export default LoginNavbar;
