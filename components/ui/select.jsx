import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { inputVariants } from "./inputX"; // 1. Import inputVariants จากไฟล์ inputX.jsx
import { Label } from "@/components/ui/label"; // Import Label เพื่อใช้งานร่วมกัน

// --- คงคอมโพเนนต์เดิมที่ไม่ต้องแก้ไขสไตล์ ---
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectContent = React.forwardRef(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "bg-paper-elevation-1 text-text-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-divider relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "button-large focus:bg-primary-hover focus:text-text-primary relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

// 2. สร้าง SelectTrigger ใหม่ที่ใช้ inputVariants
const SelectTriggerStyled = React.forwardRef(
  ({ className, children, variant, color, size, disabled, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        inputVariants({ variant, color, size, className, disabled }),
        "w-full justify-between px-3",
        "data-[state=open]:[&_svg]:rotate-180",
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <i className="fa-solid fa-caret-down ml-2 h-3 w-3 transition-transform duration-200"></i>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  ),
);
SelectTriggerStyled.displayName = "SelectTriggerStyled";

// 3. สร้าง Select Component หลักที่รวม Label เข้าไว้ด้วยกัน
const SelectStyled = React.forwardRef(
  (
    {
      className,
      label,
      id,
      variant,
      color,
      size,
      disabled,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    const labelColorClass = cn({
      "text-error-lighter": ariaInvalid || color === "error",
      "text-text-disabled": disabled,
      "text-text-primary": !ariaInvalid && !disabled && color !== "error",
    });

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {label && (
          <Label htmlFor={selectId} className={labelColorClass}>
            {label}
          </Label>
        )}
        <SelectPrimitive.Root
          disabled={disabled}
          aria-invalid={ariaInvalid}
          {...props}
        >
          <SelectTriggerStyled
            id={selectId}
            ref={ref}
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            aria-invalid={ariaInvalid}
          >
            <SelectValue placeholder="Select an option" />
          </SelectTriggerStyled>
          {props.children}
        </SelectPrimitive.Root>
      </div>
    );
  },
);
SelectStyled.displayName = "SelectStyled";

export {
  SelectStyled,
  SelectValue,
  SelectTriggerStyled,
  SelectContent,
  SelectItem,
  SelectGroup,
};
