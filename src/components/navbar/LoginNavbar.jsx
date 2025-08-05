import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SparklesIcon } from "@/src/components/icons/sparkles-icon";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/src/stores/userStore";
import { useEffect, useState } from "react";
import cartManageStore from "@/src/stores/cartManageStore";
import { Badge } from "@/components/ui/badge";

function GuestNavbar() {
  const logout = useUserStore(state => state.logout)
  const token = useUserStore(state => state.token)
  const avatar = useUserStore(state => state.avatarUrl)
  const userName = useUserStore(state => state.userName)

  const getCart = cartManageStore(state => state.getAllCart)

  const [cartItem, setCartItem] = useState([])
  const mockCartitem = ["a" , "b ", "c"]

  useEffect(() => {
    const fetchCart = async () => { //วังวน async/await 
      setCartItem([])
      let allCartItem = await getCart(token)
      setCartItem(mockCartitem)
    }
    fetchCart()
    console.log(cartItem.length)

  }, [])

  function hdllogout() {
    logout()

  }

  return (

    <nav className="flex flex-row items-center justify-between gap-1">

      <Link to='/shelf'>
        <Button variant="text" color="secondary">
          {<i class="fa-solid fa-bookmark"></i>}Readlist
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
              <i class="fa-solid fa-bell"></i>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[260px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Components</div>
                      <div className="text-text-secondary body-2">
                        Browse all components in the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Documentation</div>
                      <div className="text-text-secondary body-2">
                        Learn how to use the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-text-secondary body-2">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              showIcon={false}
              className={cn(
                buttonVariants({ variant: "outlined", color: "secondary" }),
                "w-9 px-0",
                "group-data-[state=open]:bg-primary-focus hover:bg-primary-focusVisible relative",
              )}
            >

              <i className=" fa-solid fa-cart-shopping"></i>
              {(cartItem?.length ?? 0) > 0 && (
                <Badge
                  className="absolute h-5 px-1 font-mono rounded-full bg-primary-main min-w-5 tabular-nums -top-2 -right-2"
                >
                  {cartItem?.length}
                </Badge>
              )}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/cart"> Your Cart</Link>
                  </NavigationMenuLink>
                  {/* <NavigationMenuLink asChild>
                    <Link href="#">Documentation</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Blocks</Link>
                  </NavigationMenuLink> */}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="h-8">
            <NavigationMenuTrigger className="px-0">
              <Avatar>
                <AvatarImage
                  src={avatar}
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-action-disabled/50">
                  <i class="fa-solid fa-user"></i>
                </AvatarFallback>
              </Avatar>
              <div className="ml-2">{userName}</div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/userproflie" className="flex-row items-center gap-2">
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
                    <Link href="#" className="flex-row items-center gap-2">
                      <div className="flex-1">Theme : Light</div>
                      <i class="fa-solid fa-sun-bright"></i>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/setting/affiliate" className="flex-row items-center gap-2">
                      Affiliate Program
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/setting" className="flex-row items-center gap-2">
                      Setting
                    </Link>
                  </NavigationMenuLink>
                  <div className="w-full h-[1px] bg-divider my-2"></div>
                  <NavigationMenuLink asChild className="hover:bg-error-dark">
                    <Link href="#" className="flex-row items-center gap-2 text-error-main" onClick={hdllogout}>
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
export default GuestNavbar;
