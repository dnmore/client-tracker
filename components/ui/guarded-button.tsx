import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./button";
type GuardedButtonProps = {
  role: "OWNER" | "VIEWER"
  requiredRole: "OWNER"
  children: React.ReactNode
} & React.ComponentProps<typeof Button>

export function GuardedButton({
  role,
  requiredRole,
  children,
  ...props
}: GuardedButtonProps) {
  const allowed = role === requiredRole

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button disabled={!allowed} {...props}>
              {children}
            </Button>
          </span>
        </TooltipTrigger>
        {!allowed && (
          <TooltipContent>
            Requires {requiredRole} role.
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}