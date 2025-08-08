import * as React from "react";
import { cva } from "class-variance-authority";
import { CheckIcon, XCircle, ChevronDown, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { inputVariants } from "./inputX";
import { Label } from "@/components/ui/label";

// Animation Variants สำหรับ Badge
const badgeAnimationVariants = cva("", {
  variants: {
    badgeAnimation: {
      bounce: "hover:-translate-y-1 hover:scale-110",
      pulse: "hover:animate-pulse",
      wiggle: "hover:animate-wiggle",
      fade: "hover:opacity-80",
      slide: "hover:translate-x-1",
      none: "",
    },
  },
  defaultVariants: {
    badgeAnimation: "bounce",
  },
});

const MultiSelectStyled = React.forwardRef(
  (
    {
      options,
      onValueChange,
      variant,
      color,
      size,
      label,
      id,
      disabled,
      defaultValue = [],
      placeholder = "Select options...",
      className,
      popoverClassName,
      maxCount = 3,
      badgeAnimation = "bounce",
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] = React.useState(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const triggerRef = React.useRef(null);

    const handleValueChange = React.useCallback(
      (newSelectedValues) => {
        setSelectedValues(newSelectedValues);
        if (onValueChange) {
          onValueChange(newSelectedValues);
        }
      },
      [onValueChange],
    );

    const toggleOption = React.useCallback(
      (optionValue) => {
        setSelectedValues((currentSelectedValues) => {
          const newValues = currentSelectedValues.includes(optionValue)
            ? currentSelectedValues.filter((v) => v !== optionValue)
            : [...currentSelectedValues, optionValue];

          if (onValueChange) {
            onValueChange(newValues);
          }
          return newValues;
        });
      },
      [onValueChange],
    );

    const generatedId = React.useId();
    const selectId = id || generatedId;

    const labelColorClass = cn({
      "text-error-lighter": ariaInvalid || color === "error",
      "text-text-disabled": disabled,
      "text-text-primary": !ariaInvalid && !disabled && color !== "error",
    });

    const selectedOptions = React.useMemo(
      () => options.filter((opt) => selectedValues.includes(opt.value)),
      [options, selectedValues],
    );

    const displayedOptions = selectedOptions.slice(0, maxCount);
    const remainingCount = selectedOptions.length - displayedOptions.length;

    return (
      <div className={cn("flex flex-col gap-2", className)} ref={ref}>
        {label && (
          <Label htmlFor={selectId} className={labelColorClass}>
            {label}
          </Label>
        )}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              ref={triggerRef}
              id={selectId}
              disabled={disabled}
              aria-invalid={ariaInvalid}
              className={cn(
                inputVariants({ variant, color, size, className, disabled }),
                "w-full justify-between rounded-lg",
                selectedValues.length > 0 ? "pr-1 pl-1" : "px-2",
              )}
              {...props}
            >
              {selectedValues.length > 0 ? (
                <div className="flex w-full items-center justify-between h-full">
                  <div className="flex flex-wrap items-center gap-1">
                    {displayedOptions.map((option) => (
                      <Badge
                        key={option.value}
                        variant="secondary"
                        className={cn(
                          "body-2 m-0.5 h-7 gap-0 rounded-sm transition-all duration-100 ease-in-out",
                          badgeAnimationVariants({ badgeAnimation }),
                        )}
                      >
                        {option.label}
                        <XCircle
                          className="ml-2 cursor-pointer w-4"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleOption(option.value);
                          }}
                        />
                      </Badge>
                    ))}
                    {remainingCount > 0 && (
                      <Badge variant="outlined" className="m-0.5 text-bodyMedium h-7">
                        +{remainingCount} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center h-7 ">
                    <XIcon
                      className="text-muted-foreground mx-2 h-4 cursor-pointer"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleValueChange([]);
                      }}
                    />
                    <Separator orientation="vertical" className="h-full w-[20px]" />
                    <ChevronDown className="text-action-active-icon mx-2 h-4" />
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground text-sm">
                  {placeholder}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className={cn("w-auto p-0", popoverClassName)}
            style={{ width: triggerRef.current?.offsetWidth }}
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className={cn(
                          "cursor-pointer",
                          option.disabled && "cursor-not-allowed opacity-50",
                        )}
                        disabled={option.disabled}
                      >
                        <div
                          className={cn(
                            "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);
MultiSelectStyled.displayName = "MultiSelectStyled";

export { MultiSelectStyled };
