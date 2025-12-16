import type * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ButtonPrimaryProps extends React.ComponentProps<typeof Button> {}

export function ButtonPrimary({ className, ...props }: ButtonPrimaryProps) {
  return (
    <Button
      className={cn(
        "bg-[#F2B705] text-[#1A1A1A] hover:bg-[#D9A304] rounded-sm shadow-none",
        "transition-colors duration-[120ms] font-medium",
        className,
      )}
      {...props}
    />
  )
}
