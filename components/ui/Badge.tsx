import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "subtle";
  children: React.ReactNode;
}

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
  
  const variantStyles = {
    default: "bg-signal text-paper",
    outline: "border border-signal/50 text-signal",
    subtle: "bg-signal/10 text-signal",
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
