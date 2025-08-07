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
<<<<<<< HEAD
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

=======
import { useEffect, useState } from "react";
import cartManageStore from "@/src/stores/cartManageStore";
import { Badge } from "@/components/ui/badge";
import useThemeStore from "@/src/stores/themeStore";

function GuestNavbar() {
  const logout = useUserStore(state => state.logout)
  const token = useUserStore(state => state.token)
  const avatar = useUserStore(state => state.avatarUrl)
  const userName = useUserStore(state => state.userName)

  const getCart = cartManageStore(state => state.getAllCart)

  const { theme, toggleTheme } = useThemeStore();

  const [cartItem, setCartItem] = useState([])
  const mockCartitem = ["a", "b ", "c"]

  useEffect(() => {
    const fetchCart = async () => { //วังวน async/await 
      setCartItem([])
      let allCartItem = await getCart(token)
      setCartItem(allCartItem)
    }
    fetchCart()
    console.log(cartItem.length)

  }, [])

  function hdllogout() {
    logout()

  }

  function hdltheme() {
    toggleTheme()
  }

>>>>>>> origin/feature/registerbooktag
  return (

    <nav className="flex flex-row items-center justify-between gap-1">
<<<<<<< HEAD
      <Link to="/shelf">
        <Button variant="text" color="secondary">
          <i className="fa-solid fa-bookmark mr-2"></i>Readlist
=======

      <Link to='/shelf'>
        <Button variant="text" color="secondary">
          {<i class="fa-solid fa-bookmark"></i>}Readlist
>>>>>>> origin/feature/registerbooktag
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
<<<<<<< HEAD

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
=======
          {/* <div>
                <i className=" fa-solid fa-cart-shopping"></i>
              {(cartItem?.length ?? 0) > 0 && (
                <Badge
                  className="absolute h-5 px-1 font-mono rounded-full bg-primary-main min-w-5 tabular-nums -top-2 -right-2"
                >
                  {cartItem?.length}
                </Badge>)}
          </div> */}
          <Link to="/cart">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              showIcon={false}
              className={cn(
                buttonVariants({ variant: "outlined", color: "secondary" }),
                "w-9 px-0",
                "group-data-[state=open]:bg-primary-focus hover:bg-primary-focusVisible hover:text-action-active group-data-[state=open]:text-action-active relative",
              )}
            >

              <i className=" fa-solid fa-cart-shopping"></i>
              {(cartItem?.length ?? 0) > 0 && (
                <Badge
                  className="absolute h-5 px-1 font-mono rounded-full bg-primary-main min-w-5 tabular-nums text-action-active -top-2 -right-2"
                >
                  {cartItem?.length}
                </Badge>
              )}
            </NavigationMenuTrigger>
            {/* <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/cart"> Your Cart</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Documentation</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Blocks</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent> */}
          </NavigationMenuItem>
          </Link>
          <NavigationMenuItem className="h-8">
            <NavigationMenuTrigger className="px-0">
              <Avatar>
                <AvatarImage
                  src={avatar || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-action-disabled/50">
                  <i class="fa-solid fa-user"></i>
>>>>>>> origin/feature/registerbooktag
                </AvatarFallback>
              </Avatar>
              <div className="ml-2">{userName}</div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
<<<<<<< HEAD
                    <Link
                      to="/userproflie"
                      className="flex-row items-center gap-2"
                    >
=======
                    <Link to="/userproflie" className="flex-row items-center gap-2">
>>>>>>> origin/feature/registerbooktag
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
<<<<<<< HEAD
                    <div
                      className="flex-row items-center gap-2"
                      onClick={hdltheme}
                    >
                      <div className="flex-1">
                        Theme : {theme === "light" ? "Light" : "Dark"}
                      </div>
                      {theme === "light" ? (
=======
                    <div className="flex-row items-center gap-2" onClick={hdltheme}>
                      <div className="flex-1">Theme : {theme === 'light' ? 'Light' : 'Dark'}</div>
                      {theme === 'light' ? (
>>>>>>> origin/feature/registerbooktag
                        <i className="fa-solid fa-sun-bright"></i>
                      ) : (
                        <i className="fa-solid fa-moon"></i>
                      )}
                    </div>
<<<<<<< HEAD
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/setting/affiliate"
                      className="flex-row items-center gap-2"
                    >
                      Affiliate Program
=======
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/setting/affiliate" className="flex-row items-center gap-2">
                      Affiliate Program
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/setting" className="flex-row items-center gap-2">
                      Setting
>>>>>>> origin/feature/registerbooktag
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/setting" className="flex-row items-center gap-2">
                      Setting
                    </Link>
                  </NavigationMenuLink>
                  <div className="bg-divider my-2 h-[1px] w-full"></div>
                  <NavigationMenuLink asChild className="hover:bg-error-dark">
<<<<<<< HEAD
                    <Link
                      href="#"
                      className="text-error-main flex-row items-center gap-2"
                      onClick={handleLogout}
                    >
=======
                    <Link href="#" className="flex-row items-center gap-2 text-error-main" onClick={hdllogout}>
>>>>>>> origin/feature/registerbooktag
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
