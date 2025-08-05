import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-secondary-outlinedBorder placeholder:text-text-disabled focus-visible:border-secondary-focus focus-visible:ring-secondary-main/50 aria-invalid:ring-tertiary-main/20 aria-invalid:border-error-main flex field-sizing-content min-h-16 w-full rounded-sm border bg-transparent px-2 py-1  transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Textarea }
