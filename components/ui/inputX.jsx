import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputVariants = cva(
  // Base styles for the outer container (div) that wraps the input and adornments
  "inline-flex items-center rounded-full font-medium transition-[color] " +
    "focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-0 " + // Styles when the input inside is focused
    "aria-[invalid=true]:ring-error-main/20 aria-[invalid=true]:border-error-main ", // Styles for invalid state

  {
    variants: {
      variant: {
        outlined: "border bg-transparent", // Outlined inputs have a border and transparent background
        filled: "", // Filled inputs will get their background from compoundVariants
      },
      color: {
        primary: "",
        secondary: "",
        neutral: "",
        error: "",
      },
      size: {
        small: "h-9 text-sm gap-2", // Height, text size, and gap for small inputs
        medium: "h-11 text-base gap-2", // Height, text size, and gap for medium inputs
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-50", // General disabled styles
      },
    },
    compoundVariants: [
      // --- Primary Color Variants ---
      {
        variant: "outlined",
        color: "primary",
        className:
          "border-primary-outlinedBorder text-text-primary focus-within:ring-[var(--color-primary-focusVisible)]",
      },
      {
        variant: "filled",
        color: "primary",
        className:
          "bg-primary-lighter text-text-primary focus-within:ring-[var(--color-primary-focusVisible)]",
      },
      // --- Secondary Color Variants ---
      {
        variant: "outlined",
        color: "secondary",
        className:
          "border-secondary-outlinedBorder text-text-primary focus-within:ring-[var(--color-secondary-focusVisible)]",
      },
      {
        variant: "filled",
        color: "secondary",
        className:
          "bg-secondary-lighter text-text-primary focus-within:ring-[var(--color-secondary-focusVisible)]",
      },
      // --- Neutral Color Variants ---
      {
        variant: "outlined",
        color: "neutral",
        className:
          "border-neutral-950 text-text-primary focus-within:ring-[var(--color-text-focusVisible)]",
      },
      {
        variant: "filled",
        color: "neutral",
        className:
          "bg-white-focusVisible text-text-primary focus-within:ring-[var(--color-text-focusVisible)]",
      },
      // --- Error Color Variants ---
      {
        variant: "outlined",
        color: "error",
        className:
          "border-error-dark text-text-primary focus-within:ring-[var(--color-error-focusVisible)]",
      },
      {
        variant: "filled",
        color: "error",
        className:
          "bg-error-dark text-text-primary focus-within:ring-[var(--color-error-focusVisible)]",
      },
      {
        variant: "outlined",
        disabled: true,
        className: "border-divider text-text-disabled",
      },
      {
        variant: "filled",
        disabled: true,
        className: "bg-action-disabledBackground text-text-disabled",
      },
    ],
    defaultVariants: {
      variant: "outlined",
      color: "secondary",
      size: "medium",
      disabled: false,
    },
  },
);

const InputX = React.forwardRef(
  (
    {
      className,
      type,
      variant,
      color,
      size,
      leadingComponent,
      trailingComponent,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isFile = type === "file";

    // Determine horizontal padding for the wrapper based on adornments
    const horizontalPaddingClass = cn({
      "px-3": !leadingComponent && !trailingComponent, // Default padding if no adornments
      "pl-0 pr-3": leadingComponent && !trailingComponent, // Padding if only leading component
      "pl-3 pr-0": !leadingComponent && trailingComponent, // Padding if only trailing component
      "px-0": leadingComponent && trailingComponent, // No direct padding if both (gap handles spacing)
    });

    // Combine all classes for the outer wrapper div
    const wrapperClasses = cn(
      inputVariants({ variant, color, size, disabled, className }),
      horizontalPaddingClass,
      className,
    );

    // Classes for the actual <input> element
    const inputElementClasses = cn(
      "flex-1 min-w-0 bg-transparent outline-none ", // InputX takes available space, transparent background
      "placeholder:text-text-disabled selection:bg-text-disabled selection:text-text-primary", // Placeholder and selection styles
      "py-1", // Vertical padding for the input content

      // Specific styles for file input's button (::file-selector-button)
      // These classes apply directly to the <input type="file"> element
      isFile &&
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-[14px] file:text-text-disabled file:mr-2",
    );

    // Determine icon size class for leading/trailing components (assuming they are SVG-based icons)
    const iconSizeClass =
      size === "small" ? "[&_svg]:size-3" : "[&_svg]:size-4";

    return (
      <div className={wrapperClasses}>
        {leadingComponent && (
          <div
            className={cn(
              "text-text-disabled/50 flex items-center justify-center pl-3",
              iconSizeClass,
            )}
          >
            {leadingComponent}
          </div>
        )}
        <input
          type={type}
          className={inputElementClasses}
          ref={ref}
          disabled={disabled} // Ensure HTML disabled attribute is set
          {...props}
        />
        {trailingComponent && (
          <div
            className={cn(
              "text-text-disabled/50 flex items-center justify-center pr-3",
              iconSizeClass,
            )}
          >
            {trailingComponent}
          </div>
        )}
      </div>
    );
  },
);

InputX.displayName = "InputX";

export { InputX, inputVariants };
