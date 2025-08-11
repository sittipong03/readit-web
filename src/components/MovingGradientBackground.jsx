import React from 'react';
import { cn } from "@/lib/utils";

export const LavaLampBackground = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("lava-lamp-background", className)} // ใช้คลาสที่เราสร้างใน CSS
      {...props}
    >
      {children}
    </div>
  );
};
