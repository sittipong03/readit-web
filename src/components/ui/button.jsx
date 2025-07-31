import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-90",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "border bg-transparent",
        text: "bg-transparent",
        ghost: "", 
        mixed: "border",
        link: "bg-transparent underline-offset-4 hover:underline",
      },
      size: {
        small: "h-[28px] px-3 button-small [&_svg]:size-3 ",
        medium: "h-[36px] px-4 button-medium [&_svg]:size-4 ",
        large: "h-[44px] px-6 button-large [&_svg]:size-5 ",
        icon: "h-9 w-9",
      },
      color: {
        primary: "",
        secondary: "",
        tertiary: "",
        error: "",
        warning: "",
        info: "",
        success: "",
        neutral: "",
      },
    },
    compoundVariants: [
      // --- Primary Color ---
      {
        variant: "contained",
        color: "primary",
        className:
          "bg-primary-main text-primary-contrast hover:bg-primary-light active:bg-primary-dark disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "outlined",
        color: "primary",
        className:
          "border-primary-outlinedBorder disabled:border-0 text-primary-main hover:bg-primary-hover active:bg-primary-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      {
        variant: "text",
        color: "primary",
        className:
          "text-primary-main hover:bg-primary-hover active:bg-primary-focus disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "ghost",
        color: "primary",
        className:
          "bg-primary-soft text-primary-main hover:bg-primary-hover active:bg-primary-focus  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "mixed",
        color: "primary",
        className:
          "border-primary-outlinedBorder disabled:border-0 bg-primary-soft text-primary-main hover:bg-primary-hover active:bg-primary-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      { variant: "link", color: "primary", className: "text-primary-main disabled:text-text-disabled" },

      // --- Secondary Color ---
      {
        variant: "contained",
        color: "secondary",
        className:
          "bg-secondary-main text-secondary-contrast hover:bg-secondary-light active:bg-secondary-dark  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "outlined",
        color: "secondary",
        className:
          "border-secondary-outlinedBorder disabled:border-0 text-secondary-main hover:bg-secondary-hover active:bg-secondary-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      {
        variant: "text",
        color: "secondary",
        className:
          "text-secondary-main hover:bg-secondary-hover active:bg-secondary-focus disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "ghost",
        color: "secondary",
        className:
          "bg-secondary-soft text-secondary-main hover:bg-secondary-hover active:bg-secondary-focus  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "mixed",
        color: "secondary",
        className:
          "border-secondary-outlinedBorder disabled:border-0 bg-secondary-soft text-secondary-main hover:bg-secondary-hover active:bg-secondary-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      { variant: "link", color: "secondary", className: "text-secondary-main disabled:text-text-disabled" },

      // --- Tertiary Color ---
      {
        variant: "contained",
        color: "tertiary",
        className:
          "bg-tertiary-main text-tertiary-contrast hover:bg-tertiary-light active:bg-tertiary-dark  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "outlined",
        color: "tertiary",
        className:
          "border-tertiary-outlinedBorder disabled:border-0 text-tertiary-main hover:bg-tertiary-hover active:bg-tertiary-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      {
        variant: "text",
        color: "tertiary",
        className:
          "text-tertiary-main hover:bg-tertiary-hover active:bg-tertiary-focus disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "ghost",
        color: "tertiary",
        className:
          "bg-tertiary-soft text-tertiary-main hover:bg-tertiary-hover active:bg-tertiary-focus  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "mixed",
        color: "tertiary",
        className:
          "border-tertiary-outlinedBorder disabled:border-0 bg-tertiary-soft text-tertiary-main hover:bg-tertiary-hover active:bg-tertiary-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      { variant: "link", color: "tertiary", className: "text-tertiary-main disabled:text-text-disabled" },

      // --- Error Color ---
      {
        variant: "contained",
        color: "error",
        className:
          "bg-error-main text-error-contrast hover:bg-error-light active:bg-error-dark  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "outlined",
        color: "error",
        className:
          "border-error-outlinedBorder disabled:border-0 text-error-main hover:bg-error-hover active:bg-error-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      {
        variant: "text",
        color: "error",
        className:
          "text-error-main hover:bg-error-hover active:bg-error-focus disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "ghost",
        color: "error",
        className:
          "bg-error-soft text-error-main hover:bg-error-hover active:bg-error-focus  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "mixed",
        color: "error",
        className:
          "border-error-outlinedBorder disabled:border-0 bg-error-soft text-error-main hover:bg-error-hover active:bg-error-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      { variant: "link", color: "error", className: "text-error-main disabled:text-text-disabled" },

      // --- Warning Color ---
      {
        variant: "contained",
        color: "warning",
        className:
          "bg-warning-main text-warning-contrast hover:bg-warning-light active:bg-warning-dark  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "outlined",
        color: "warning",
        className:
          "border-warning-outlinedBorder disabled:border-0 text-warning-main hover:bg-warning-hover active:bg-warning-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      {
        variant: "text",
        color: "warning",
        className:
          "text-warning-main hover:bg-warning-hover active:bg-warning-focus disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "ghost",
        color: "warning",
        className:
          "bg-warning-soft text-warning-main hover:bg-warning-hover active:bg-warning-focus  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "mixed",
        color: "warning",
        className:
          "border-warning-outlinedBorder disabled:border-0 bg-warning-soft text-warning-main hover:bg-warning-hover active:bg-warning-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      { variant: "link", color: "warning", className: "text-warning-main disabled:text-text-disabled" },

      // --- Info Color ---
      {
        variant: "contained",
        color: "info",
        className:
          "bg-info-main text-info-contrast hover:bg-info-light active:bg-info-dark  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "outlined",
        color: "info",
        className:
          "border-info-outlinedBorder disabled:border-0 text-info-main hover:bg-info-hover active:bg-info-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      {
        variant: "text",
        color: "info",
        className:
          "text-info-main hover:bg-info-hover active:bg-info-focus disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "ghost",
        color: "info",
        className:
          "bg-info-soft text-info-main hover:bg-info-hover active:bg-info-focus  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "mixed",
        color: "info",
        className:
          "border-info-outlinedBorder disabled:border-0 bg-info-soft text-info-main hover:bg-info-hover active:bg-info-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      { variant: "link", color: "info", className: "text-info-main disabled:text-text-disabled" },

      // --- Success Color ---
      {
        variant: "contained",
        color: "success",
        className:
          "bg-success-main text-success-contrast hover:bg-success-light active:bg-success-dark  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "outlined",
        color: "success",
        className:
          "border-success-outlinedBorder disabled:border-0 text-success-main hover:bg-success-hover active:bg-success-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      {
        variant: "text",
        color: "success",
        className:
          "text-success-main hover:bg-success-hover active:bg-success-focus disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "ghost",
        color: "success",
        className:
          "bg-success-soft text-success-main hover:bg-success-hover active:bg-success-focus  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "mixed",
        color: "success",
        className:
          "border-success-outlinedBorder disabled:border-0 bg-success-soft text-success-main hover:bg-success-hover active:bg-success-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      { variant: "link", color: "success", className: "text-success-main disabled:text-text-disabled" },

      // --- Neutral Color ---
      {
        variant: "contained",
        color: "neutral",
        className:
          "bg-black-main text-white-main hover:bg-black-secondary active:bg-black-focusVisible  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "outlined",
        color: "neutral",
        className:
          "border-black-outlinedBorder disabled:border-0 text-text-primary hover:bg-text-hover active:bg-text-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      {
        variant: "text",
        color: "neutral",
        className:
          "text-text-primary hover:bg-action-hover active:bg-action-focus disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "ghost",
        color: "neutral",
        className:
          "bg-action-disabledBackground text-text-primary hover:bg-action-hover active:bg-action-focus  disabled:bg-action-disabledBackground disabled:text-text-disabled",
      },
      {
        variant: "mixed",
        color: "neutral",
        className:
          "border-action-active bg-action-disabledBackground text-text-primary hover:bg-action-hover active:bg-action-focus disabled:bg-action-disabledBackground disabled:text-text-disabled disabled:border-neutral-400",
      },
      { variant: "link", color: "neutral", className: "text-text-primary disabled:text-text-disabled" },
    ],
    defaultVariants: {
      variant: "contained",
      size: "medium",
      color: "primary",
    },
  },
);

export const Button = React.forwardRef(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
