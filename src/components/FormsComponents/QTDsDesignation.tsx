import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

interface QTDsDesignationProps {
  isPermitted: boolean
  QTDSMembro: number
  lesson: string
  className?: string
}

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        warning: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20",
        success: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export function QTDsDesignation({ QTDSMembro, isPermitted, lesson, className }: QTDsDesignationProps) {
  if (!isPermitted) return null

  const isFirstTime = QTDSMembro === 0
  const hasMultipleAssignments = QTDSMembro > 1

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className={cn("transition-all duration-300 animate-in fade-in-50", className)}>
            <Badge
              variant="outline"
              className={cn(
                "rounded-full cursor-help transition-all",
                badgeVariants({
                  variant: isFirstTime ? "success" : hasMultipleAssignments ? "warning" : "default",
                }),
              )}
            >
              {isFirstTime ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Primeira designação nesta lição</span>
                </>
              ) : (
                <>
                  {hasMultipleAssignments ? (
                    <AlertCircle className="h-3.5 w-3.5" />
                  ) : (
                    <InfoIcon className="h-3.5 w-3.5" />
                  )}
                  <span>
                    {QTDSMembro} {QTDSMembro === 1 ? "designação" : "designações"} na lição {lesson}
                  </span>
                </>
              )}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          {isFirstTime ? (
            <p>Este irmão nunca foi designado para a lição {lesson}.</p>
          ) : (
            <p>
              Este irmão já foi designado {QTDSMembro} {QTDSMembro === 1 ? "vez" : "vezes"} para a lição {lesson}.
              {hasMultipleAssignments && " Considere dar oportunidade a outros irmãos."}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

