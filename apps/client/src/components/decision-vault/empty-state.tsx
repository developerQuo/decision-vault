import type * as React from "react"
import { cn } from "@/lib/utils"
import { FileQuestion } from "lucide-react"

export interface EmptyStateProps extends React.ComponentProps<"div"> {
  title: string
  description: string
  icon?: React.ReactNode
}

export function EmptyState({ title, description, icon, className, children, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-12 space-y-4", className)} {...props}>
      <div className="text-muted-foreground">{icon || <FileQuestion className="size-12" />}</div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
