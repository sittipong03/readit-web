import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { LoadingSpinner } from "./loading-spinner";

const buttonColors = {
  primary: {
    contained: {
      bg: "bg-primary-main",
      text: "text-primary-contrast",
      hover: "hover:bg-primary-light",
      pressed: "active:bg-primary-dark",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    outlined: {
      bg: "bg-transparent",
      text: "text-primary-main",
      hover: "hover:bg-primary-hover",
      pressed: "active:bg-primary-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
      border: "border-primary-outlinedBorder",
    },
    text: {
      bg: "bg-transparent",
      text: "text-primary-main",
      hover: "hover:bg-primary-hover",
      pressed: "active:bg-primary-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    ghost: {
      bg: "bg-primary-soft",
      text: "text-primary-main",
      hover: "hover:bg-primary-hover",
      pressed: "active:bg-primary-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    mixed: {
      bg: "bg-primary-soft",
      text: "text-primary-main",
      hover: "hover:bg-primary-hover",
      pressed: "active:bg-primary-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
      border: "border-primary-outlinedBorder",
    },
  },
  secondary: {
    contained: {
      bg: "bg-secondary-main",
      text: "text-secondary-contrast",
      hover: "hover:bg-secondary-light",
      pressed: "active:bg-secondary-dark",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    outlined: {
      bg: "bg-transparent",
      text: "text-secondary-main",
      hover: "hover:bg-secondary-hover",
      pressed: "active:bg-secondary-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-secondary-outlinedBorder",
    },
    text: {
      bg: "bg-transparent",
      text: "text-secondary-main",
      hover: "hover:bg-secondary-hover",
      pressed: "active:bg-secondary-focus",
      disabled: "disabled:text-text-disabled",
    },
    ghost: {
      bg: "bg-secondary-soft",
      text: "text-secondary-main",
      hover: "hover:bg-secondary-hover",
      pressed: "active:bg-secondary-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    mixed: {
      bg: "bg-secondary-soft",
      text: "text-secondary-main",
      hover: "hover:bg-secondary-hover",
      pressed: "active:bg-secondary-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-secondary-outlinedBorder",
    },
  },
  tertiary: {
    contained: {
      bg: "bg-tertiary-main",
      text: "text-tertiary-contrast",
      hover: "hover:bg-tertiary-light",
      pressed: "active:bg-tertiary-dark",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    outlined: {
      bg: "bg-transparent",
      text: "text-tertiary-main",
      hover: "hover:bg-tertiary-hover",
      pressed: "active:bg-tertiary-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-tertiary-outlinedBorder",
    },
    text: {
      bg: "bg-transparent",
      text: "text-tertiary-main",
      hover: "hover:bg-tertiary-hover",
      pressed: "active:bg-tertiary-focus",
      disabled: "disabled:text-text-disabled",
    },
    ghost: {
      bg: "bg-tertiary-soft",
      text: "text-tertiary-main",
      hover: "hover:bg-tertiary-hover",
      pressed: "active:bg-tertiary-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    mixed: {
      bg: "bg-tertiary-soft",
      text: "text-tertiary-main",
      hover: "hover:bg-tertiary-hover",
      pressed: "active:bg-tertiary-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-tertiary-outlinedBorder",
    },
  },
  error: {
    contained: {
      bg: "bg-error-main",
      text: "text-error-contrast",
      hover: "hover:bg-error-light",
      pressed: "active:bg-error-dark",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    outlined: {
      bg: "bg-transparent",
      text: "text-error-main",
      hover: "hover:bg-error-hover",
      pressed: "active:bg-error-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-error-outlinedBorder",
    },
    text: {
      bg: "bg-transparent",
      text: "text-error-main",
      hover: "hover:bg-error-hover",
      pressed: "active:bg-error-focus",
      disabled: "disabled:text-text-disabled",
    },
    ghost: {
      bg: "bg-error-soft",
      text: "text-error-main",
      hover: "hover:bg-error-hover",
      pressed: "active:bg-error-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    mixed: {
      bg: "bg-error-soft",
      text: "text-error-main",
      hover: "hover:bg-error-hover",
      pressed: "active:bg-error-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-error-outlinedBorder",
    },
  },
  warning: {
    contained: {
      bg: "bg-warning-main",
      text: "text-warning-contrast",
      hover: "hover:bg-warning-light",
      pressed: "active:bg-warning-dark",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    outlined: {
      bg: "bg-transparent",
      text: "text-warning-main",
      hover: "hover:bg-warning-hover",
      pressed: "active:bg-warning-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-warning-outlinedBorder",
    },
    text: {
      bg: "bg-transparent",
      text: "text-warning-main",
      hover: "hover:bg-warning-hover",
      pressed: "active:bg-warning-focus",
      disabled: "disabled:text-text-disabled",
    },
    ghost: {
      bg: "bg-warning-soft",
      text: "text-warning-main",
      hover: "hover:bg-warning-hover",
      pressed: "active:bg-warning-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    mixed: {
      bg: "bg-warning-soft",
      text: "text-warning-main",
      hover: "hover:bg-warning-hover",
      pressed: "active:bg-warning-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-warning-outlinedBorder",
    },
  },
  info: {
    contained: {
      bg: "bg-info-main",
      text: "text-info-contrast",
      hover: "hover:bg-info-light",
      pressed: "active:bg-info-dark",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    outlined: {
      bg: "bg-transparent",
      text: "text-info-main",
      hover: "hover:bg-info-hover",
      pressed: "active:bg-info-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-info-outlinedBorder",
    },
    text: {
      bg: "bg-transparent",
      text: "text-info-main",
      hover: "hover:bg-info-hover",
      pressed: "active:bg-info-focus",
      disabled: "disabled:text-text-disabled",
    },
    ghost: {
      bg: "bg-info-soft",
      text: "text-info-main",
      hover: "hover:bg-info-hover",
      pressed: "active:bg-info-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    mixed: {
      bg: "bg-info-soft",
      text: "text-info-main",
      hover: "hover:bg-info-hover",
      pressed: "active:bg-info-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-info-outlinedBorder",
    },
  },
  success: {
    contained: {
      bg: "bg-success-main",
      text: "text-success-contrast",
      hover: "hover:bg-success-light",
      pressed: "active:bg-success-dark",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    outlined: {
      bg: "bg-transparent",
      text: "text-success-main",
      hover: "hover:bg-success-hover",
      pressed: "active:bg-success-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-success-outlinedBorder",
    },
    text: {
      bg: "bg-transparent",
      text: "text-success-main",
      hover: "hover:bg-success-hover",
      pressed: "active:bg-success-focus",
      disabled: "disabled:text-text-disabled",
    },
    ghost: {
      bg: "bg-success-soft",
      text: "text-success-main",
      hover: "hover:bg-success-hover",
      pressed: "active:bg-success-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    mixed: {
      bg: "bg-success-soft",
      text: "text-success-main",
      hover: "hover:bg-success-hover",
      pressed: "active:bg-success-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-success-outlinedBorder",
    },
  },
  neutral: {
    contained: {
      bg: "bg-black-main", 
      text: "text-white-main", 
      hover: "hover:bg-black-secondary", 
      pressed: "active:bg-black-focusVisible", 
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    outlined: {
      bg: "bg-transparent",
      text: "text-text-primary", 
      hover: "hover:bg-text-hover",
      pressed: "active:bg-text-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-black-outlinedBorder",
    },
    text: {
      bg: "bg-transparent",
      text: "text-text-primary",
      hover: "hover:bg-action-hover",
      pressed: "active:bg-action-focus",
      disabled: "disabled:text-text-disabled",
    },
    ghost: {
      bg: "bg-action-disabledBackground",
      text: "text-text-primary",
      hover: "hover:bg-action-hover",
      pressed: "active:bg-action-focus",
      disabled: "disabled:bg-neutral-400 disabled:text-text-disabled",
    },
    mixed: {
      bg: "bg-action-disabledBackground",
      text: "text-text-primary",
      hover: "hover:bg-action-hover",
      pressed: "active:bg-action-focus",
      disabled: "disabled:text-text-disabled disabled:border-neutral-400",
      border: "border-action-active",
    },
  },
};

// Helper function to dynamically combine classes from buttonColors
function getButtonClasses(color, variant, isDisabled) {
  const colorConfig = buttonColors[color]?.[variant];
  if (!colorConfig) return "";

  const classes = [colorConfig.bg, colorConfig.text, colorConfig.border];

  // Add interactive states only when not disabled
  if (!isDisabled) {
    classes.push(colorConfig.hover, colorConfig.pressed);
  }

  // Add disabled styles when disabled
  if (isDisabled) {
    classes.push(colorConfig.disabled);
  }

  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "contained",
  color = "primary",
  size = "medium",
  loading = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  disabled,
  className,
  children,
  asChild = false,
  ...props
}) {
  const sizeClasses = {
    small: "h-7 px-[12px] button-small",
    medium: "h-9 px-[16px] button-medium",
    large: "h-11 px-[22px] button-large",
  };

  const iconSizes = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-5 h-5",
  };

  const getBorderClass = (variant) => {
    if (variant === "outlined" || variant === "mixed") {
      return "border";
    }
    return "border-0";
  };

  const isDisabled = disabled || loading;

  // Get focus ring color based on color scheme
  const getFocusRingColor = (color) => {
    const colorMap = {
      primary: "focus-visible:ring-primary-main",
      secondary: "focus-visible:ring-secondary-main",
      tertiary: "focus-visible:ring-tertiary-main",
      error: "focus-visible:ring-error-main",
      warning: "focus-visible:ring-warning-main",
      info: "focus-visible:ring-info-main",
      success: "focus-visible:ring-success-main",
      neutral: "focus-visible:ring-black-main",
    };
    return colorMap[color] || "focus-visible:ring-primary-main";
  };

  const buttonClasses = cn(
    // Base styles
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0",

    // Size
    sizeClasses[size],

    // Border
    getBorderClass(variant),

    // Dynamic color classes
    getButtonClasses(color, variant, isDisabled),

    // Disabled state
    isDisabled && "cursor-not-allowed opacity-60",

    // Focus ring
    getFocusRingColor(color),

    className,
  );

  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={buttonClasses} disabled={isDisabled} {...props}>
      {loading ? (
        <LoadingSpinner size={size} />
      ) : (
        <>
          {LeadingIcon && <LeadingIcon className={iconSizes[size]} />}
          {children}
          {TrailingIcon && <TrailingIcon className={iconSizes[size]} />}
        </>
      )}
    </Comp>
  );
}
