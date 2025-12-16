"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export interface DependencyArrowProps extends React.ComponentProps<"div"> {
  from: string
  to: string
  type?: "normal" | "causal"
}

export function DependencyArrow({ from, to, type = "normal", className, ...props }: DependencyArrowProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      className={cn(
        "flex items-center gap-3 py-2 px-3 rounded-sm transition-all duration-[120ms]",
        "hover:bg-muted/50 cursor-pointer",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="text-sm text-muted-foreground flex-shrink-0">{from}</span>

      <div className="flex-1 flex items-center">
        <div
          className={cn(
            "flex-1 h-px transition-all duration-[120ms]",
            type === "causal" ? "bg-[#3FA796]" : "bg-border",
            isHovered && "bg-primary",
          )}
        />
        <ArrowRight
          className={cn(
            "size-4 transition-all duration-[120ms]",
            type === "causal" ? "text-[#3FA796]" : "text-border",
            isHovered && "text-primary",
          )}
        />
      </div>

      <span className="text-sm text-muted-foreground flex-shrink-0">{to}</span>
    </div>
  )
}
