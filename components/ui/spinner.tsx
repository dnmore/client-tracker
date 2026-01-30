
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

function Spinner() {
  return (
    <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} role="status" aria-label="Loading" className="size-4 animate-spin"/>
  )
}

export { Spinner }
