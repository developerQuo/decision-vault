import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { StatusBadge } from "./status-badge"
import { cn } from "@/lib/utils"
import { MessageSquare, Users } from "lucide-react"

export type DecisionStatus = "proposed" | "approved" | "implemented" | "deprecated"

export interface DecisionCardProps extends React.ComponentProps<typeof Card> {
  title: string
  status: DecisionStatus
  context: string
  alternatives?: string[]
  rationale?: string
  timestamp: string
  source?: "slack" | "meeting"
  author?: string
  showAlternatives?: boolean
}

const statusColors: Record<DecisionStatus, string> = {
  proposed: "border-l-[#CBD5E1]",
  approved: "border-l-[#F2B705]",
  implemented: "border-l-[#3FA796]",
  deprecated: "border-l-[#C85C5C]",
}

export function DecisionCard({
  title,
  status,
  context,
  alternatives = [],
  rationale,
  timestamp,
  source,
  author,
  showAlternatives = false,
  className,
  ...props
}: DecisionCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(showAlternatives)

  return (
    <Card
      className={cn(
        "border-l-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] rounded-md transition-all duration-[120ms] ease-out",
        statusColors[status],
        className,
      )}
      {...props}
    >
      <CardHeader className="gap-3 pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg font-semibold leading-tight text-foreground">{title}</CardTitle>
          <StatusBadge status={status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        {/* Context - Priority #1 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Why</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{context}</p>
        </div>

        {/* Alternatives - Collapsible */}
        {alternatives.length > 0 && (
          <div className="space-y-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors duration-[120ms]"
            >
              <span>Alternatives</span>
              <span className="text-xs text-muted-foreground">({alternatives.length})</span>
            </button>
            {isExpanded && (
              <ul className="space-y-1.5 ml-4 animate-in fade-in-50 duration-[180ms]">
                {alternatives.map((alt, index) => (
                  <li key={index} className="text-sm text-muted-foreground leading-relaxed list-disc">
                    {alt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Rationale */}
        {rationale && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Rationale</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{rationale}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
        <time dateTime={timestamp}>{timestamp}</time>
        <div className="flex items-center gap-3">
          {source === "slack" && (
            <span className="flex items-center gap-1">
              <MessageSquare className="size-3" />
              Slack
            </span>
          )}
          {source === "meeting" && (
            <span className="flex items-center gap-1">
              <Users className="size-3" />
              Meeting
            </span>
          )}
          {author && <span className="text-muted-foreground/70">{author}</span>}
        </div>
      </CardFooter>
    </Card>
  )
}
