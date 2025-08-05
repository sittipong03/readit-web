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

function GuestNavbar() {
  return (
    <nav className="flex flex-row items-center justify-between gap-1">
      <Button variant="text" color="secondary">
        {<i class="fa-solid fa-bookmark"></i>}Readlist
      </Button>
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
                "group-data-[state=open]:bg-primary-focus hover:bg-primary-focusVisible",
              )}
            >
              <i class="fa-solid fa-cart-shopping"></i>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">Components</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Documentation</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Blocks</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="h-8"> 
            <NavigationMenuTrigger className="px-0">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-action-disabled/50">
                  <i class="fa-solid fa-user"></i>
                </AvatarFallback>
              </Avatar>
              <div className="ml-2">User</div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#" className="flex-row items-center gap-2">
                      Your Feed
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#" className="flex-row items-center gap-2">
                      Your Shelves
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#" className="flex-row items-center gap-2">
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
                    <Link href="#" className="flex-row items-center gap-2">
                      Affiliate Program
                    </Link>
                  </NavigationMenuLink>
                  <div className="w-full h-[1px] bg-divider my-2"></div>
                  <NavigationMenuLink asChild className="hover:bg-error-dark">
                    <Link href="#" className="flex-row items-center gap-2 text-error-main">
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
