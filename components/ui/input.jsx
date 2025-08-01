import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-text-disabled text-text-primary selection:bg-primary-main selection:text-primary-main border-secondary-outlinedBorder rounded-pill value flex h-9 w-full min-w-0 gap-8 border bg-transparent px-3 py-1 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-secondary-main/50 focus-visible:ring-[1px]",
        "aria-invalid:ring-error-main/20 aria-invalid:border-error-main",
        "file:text-[14px] file:text-text-disabled file:mr-2 hover:bg-secondary-hover transition-all items-center",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
