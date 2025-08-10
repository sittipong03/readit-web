import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "text-primary-dark  inline-flex h-9 w-fit items-center justify-center rounded-md p-[3px]",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "focus-visible:border-primary-outlinedBorder focus-visible:ring-ring/50 focus-visible:outline-ring data-[state=active]:text-primary-main  hover:bg-primary-hover inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md data-[state=active]:outline-2 data-[state=active]:bg-primary-soft data-[state=active]:outline-primary-outlinedBorder px-2 py-2 text-bodyLarge font-regular data-[state=active]:font-header whitespace-nowrap transition-all focus-visible:ring-[2px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 ",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none data-[state=inactive]:hidden ",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
