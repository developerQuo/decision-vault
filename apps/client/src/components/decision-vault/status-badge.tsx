import type * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type DecisionStatus = "proposed" | "approved" | "implemented" | "deprecated"

export interface StatusBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "variant"> {
  status: DecisionStatus
}

const statusConfig: Record<
  DecisionStatus,
  {
    label: string
    className: string
    dotColor: string
  }
> = {
  proposed: {
    label: "Proposed",
    className: "bg-[#CBD5E1]/20 text-[#475569] border-[#CBD5E1]",
    dotColor: "bg-[#CBD5E1]",
  },
  approved: {
    label: "Approved",
    className: "bg-[#F2B705]/20 text-[#92600A] border-[#F2B705]",
    dotColor: "bg-[#F2B705]",
  },
  implemented: {
    label: "Implemented",
    className: "bg-[#3FA796]/20 text-[#1F5249] border-[#3FA796]",
    dotColor: "bg-[#3FA796]",
  },
  deprecated: {
    label: "Deprecated",
    className: "bg-[#C85C5C]/20 text-[#7F1D1D] border-[#C85C5C]",
    dotColor: "bg-[#C85C5C]",
  },
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium flex items-center gap-1.5",
        config.className,
        className,
      )}
      {...props}
    >
      <span className={cn("size-1.5 rounded-full", config.dotColor)} />
      {config.label}
    </Badge>
  )
}
