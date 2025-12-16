import type * as React from "react"
import { StatusBadge, type DecisionStatus } from "./status-badge"
import { cn } from "@/lib/utils"

export interface TimelineNodeProps extends React.ComponentProps<"div"> {
  title: string
  status: DecisionStatus
  importance?: "low" | "medium" | "high"
  hasDependency?: boolean
  isLast?: boolean
}

const importanceSize = {
  low: "size-8",
  medium: "size-10",
  high: "size-12",
}

const statusColors: Record<DecisionStatus, string> = {
  proposed: "bg-[#CBD5E1] border-[#CBD5E1]",
  approved: "bg-[#F2B705] border-[#F2B705]",
  implemented: "bg-[#3FA796] border-[#3FA796]",
  deprecated: "bg-[#C85C5C] border-[#C85C5C]",
}

export function TimelineNode({
  title,
  status,
  importance = "medium",
  hasDependency = false,
  isLast = false,
  className,
  ...props
}: TimelineNodeProps) {
  return (
    <div className={cn("relative flex items-start gap-4", className)} {...props}>
      {/* Node Circle */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "rounded-full border-2 transition-all duration-[120ms] flex items-center justify-center",
            importanceSize[importance],
            statusColors[status],
          )}
        >
          <span className={cn("size-1.5 rounded-full bg-white")} />
        </div>

        {/* Connecting Line */}
        {!isLast && <div className="w-px h-16 bg-border mt-2" />}
      </div>

      {/* Content */}
      <div className="flex-1 pt-1.5 space-y-2">
        <h3 className="font-semibold text-sm text-foreground leading-tight">{title}</h3>
        <StatusBadge status={status} />

        {hasDependency && <p className="text-xs text-muted-foreground">Has dependencies</p>}
      </div>
    </div>
  )
}
