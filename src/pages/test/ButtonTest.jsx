import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";
import {
  BadgeCheckIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  EllipsisVertical,
} from "lucide-react";
import { SparklesIcon } from "@/src/components/icons/sparkles-icon";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { InputX } from "@/components/ui/inputX";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ReaditLogo } from "@/src/assets/readit";
import { toast, Toaster } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  SelectStyled,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MultiSelectStyled } from "@/components/ui/multi-select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const components = [
  {
    title: "Alert Dialog",
    href: "",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

//http://localhost:5173/buttontest

function ButtonTest() {
  const [selectedGenres, setSelectedGenres] = React.useState([]);

  const genreOptions = [
    { value: "drama", label: "Drama" },
    { value: "horror", label: "Horror" },
    { value: "comedy", label: "Comedy" },
    { value: "sci-fi", label: "Sci-Fi" },
    { value: "romance", label: "Romance" },
    { value: "action", label: "Action" },
    { value: "thriller", label: "Thriller" },
    { value: "fantasy", label: "Fantasy" },
    { value: "animation", label: "Animation" },
    { value: "documentary", label: "Documentary" },
    { value: "mystery", label: "Mystery" },
    { value: "musical", label: "Musical" },
  ];

  return (
    <div className="dark w-full">
      <div className="bg-paper-elevation-6 flex min-h-screen flex-col items-center gap-10 p-8">
        <div className="text-text-primary flex w-fit items-center gap-4 text-center">
          <div className="display-3">DesignSystem Test</div>
          <Button variant="outlined" asChild color="tertiary">
            <a href="https://lucide.dev/icons/" target="_blank">
              Lucide Icons
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </Button>
          <Button variant="contained" asChild color="tertiary">
            <a href="https://fontawesome.com/search" target="_blank">
              Font Awesome Icons
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </Button>
        </div>

        <div className="h6 text-text-secondary">Buttons</div>
        <div className="flex flex-wrap gap-4">
          <Button variant="contained" className="rounded-md">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="contained">
            <i className="fa-solid fa-sparkles"></i> Test{" "}
          </Button>

          <Button variant="outlined" size="large">
            <i className="fa-solid fa-house"></i> Test FontAwesome{" "}
          </Button>
          <Button variant="outlined">
            <i className="fa-solid fa-house"></i> Test FontAwesome{" "}
          </Button>
          <Button variant="outlined" size="small">
            <i className="fa-solid fa-house"></i> Test FontAwesome{" "}
          </Button>
          <Button variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="contained">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="contained">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="contained">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button disabled variant="contained">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="outlined">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="text">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="ghost">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="mixed">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="link">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button color="neutral" variant="contained">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="outlined" color="tertiary">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="outlined" disabled>
            <LoaderCircle className="animate-spin" /> Test{" "}
          </Button>
        </div>

        <div className="h6 text-text-secondary">Input</div>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              id="pictureX"
              label="Test"
              type="email"
              placeholder="Find books..."
              className="rounded-md"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
              trailingComponent={<span>.com</span>}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="pictureX">Picture</Label>
            <InputX
              id="pictureX"
              type="file"
              trailingComponent={<i className="fa-solid fa-file-image"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              size="small"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              variant="filled"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              variant="filled"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="primary"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="primary"
              variant="filled"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="neutral"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="neutral"
              variant="filled"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="error"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="error"
              variant="filled"
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="primary"
              disabled
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              variant="filled"
              disabled
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="neutral"
              variant="filled"
              disabled
              leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
            />
          </div>
        </div>
        <div className="h6 text-text-secondary">Navigation Menu</div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/docs">Docs</Link>
              </NavigationMenuLink>
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
                <SparklesIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
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
              <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
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
            <NavigationMenuItem>
              <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#" className="flex-row items-center gap-2">
                        <CircleHelpIcon />
                        Backlog
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#" className="flex-row items-center gap-2">
                        <CircleIcon />
                        To Do
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#" className="flex-row items-center gap-2">
                        <CircleCheckIcon />
                        Done
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="h6 text-text-secondary">Toast</div>
        <div className="flex gap-4">
          <Button
            variant="outlined"
            onClick={() =>
              toast.success("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Okay",
                  onClick: () => console.log("Undo"),
                },
              })
            }
          >
            Show Toast
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() =>
              toast.error("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Okay",
                  onClick: () => console.log("Undo"),
                },
              })
            }
          >
            Show Toast
          </Button>
        </div>
        <div className="h6 text-text-secondary">Badge</div>
        <div className="flex gap-3">
          <Badge asChild>
            <Link href="/">Badge</Link>
          </Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="error">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <div className="flex w-full flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-info-main text-white dark:bg-blue-600"
            >
              <BadgeCheckIcon className="w-4" />
              Verified
            </Badge>
            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
              9
            </Badge>
            <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              variant="error"
            >
              99
            </Badge>
            <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              variant="outline"
            >
              20+
            </Badge>
          </div>
        </div>
        <div className="h6 text-text-secondary">Select</div>
        <div className="flex gap-4 space-y-6 bg-gray-100">
          {/* Variant: outlined, Color: primary, Size: medium */}
          <SelectStyled
            label="Primary Outlined"
            variant="outlined"
            color="primary"
            size="medium"
          >
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </SelectStyled>

          {/* Variant: filled, Color: secondary, Size: small */}
          <SelectStyled
            label="Secondary Filled (Small)"
            variant="filled"
            color="secondary"
            size="small"
          >
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </SelectStyled>

          {/* สถานะ Disabled */}
          <SelectStyled
            label="Disabled Filled"
            variant="filled"
            color="neutral"
            disabled
          >
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </SelectStyled>

          {/* สถานะ Disabled */}
          <SelectStyled
            label="Disabled Filled"
            variant="filled"
            color="primary"
            disabled
          >
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </SelectStyled>

          {/* สถานะ Error (Invalid) */}
          <SelectStyled
            label="Error State"
            variant="outlined"
            color="error"
            aria-invalid={true}
          >
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
            </SelectContent>
          </SelectStyled>
        </div>
        <div className="h6 text-text-secondary">Dialog</div>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outlined">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <InputX
                  label="Name"
                  id="name-1"
                  name="name"
                  defaultValue="Pedro Duarte"
                />
                <InputX
                  label="Username"
                  id="username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="text">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
        <div className="h6 text-text-secondary">Multi Select</div>
        <div className="w-full max-w-lg space-y-6 p-8">
          <MultiSelectStyled
            label="Genres"
            options={genreOptions}
            onValueChange={(values) => console.log(values)}
            defaultValue={["drama", "horror", "comedy", "sci-fi"]}
            maxDisplay={3}
          />
        </div>
        <div className="h6 text-text-secondary">DropdownMenu</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outlined" size="icon" className="size-10"><EllipsisVertical size={20}/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
export default ButtonTest;
