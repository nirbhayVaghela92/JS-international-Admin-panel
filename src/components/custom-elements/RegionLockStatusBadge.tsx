import { Badge } from "@/components/ui/badge"
import { RegionLockStatus } from "@/utils/types"
import { Lock, Unlock } from "lucide-react"

export function RegionLockStatusBadge({ regionLockStatus }: { regionLockStatus: RegionLockStatus }) {
  return (
    <Badge
      variant={regionLockStatus}
      className="flex items-center gap-1 rounded-md px-2 py-1 w-fit"
    >
      {regionLockStatus === "unlocked" ? (
        <>
          <Unlock className="h-3 w-3" />
          <span>Unlocked</span>
        </>
      ) : (
        <>
          <Lock className="h-3 w-3" />
          <span>Locked</span>
        </>
      )}
    </Badge>
  )
}
