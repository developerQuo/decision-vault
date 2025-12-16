import type * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ButtonSecondaryProps extends React.ComponentProps<typeof Button> {}

export function ButtonSecondary({ className, ...props }: ButtonSecondaryProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "border border-border bg-transparent hover:bg-muted/50 rounded-sm shadow-none",
        "transition-colors duration-[120ms]",
        className,
      )}
      {...props}
    />
  )
}
