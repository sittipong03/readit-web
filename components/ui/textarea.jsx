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
        "border-tertiary-main placeholder:text-text-disabled focus-visible:border-tertiary-focus focus-visible:ring-ring/50 aria-invalid:ring-tertiary-main/20 aria-invalid:border-error-main flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2  transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Textarea }
