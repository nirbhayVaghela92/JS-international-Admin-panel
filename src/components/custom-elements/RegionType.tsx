import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { FC } from "react";

interface ContentScopeProps {
    scope?: "national" | "local";
    isShowLabel?: boolean;
}

const RegionType: FC<ContentScopeProps> = ({ scope, isShowLabel = true }) => {
  return (
    <div className="space-y-3">
      {isShowLabel && (
        <h2 className="mb-2 text-lg font-semibold text-gray-800">Region Type</h2>
      )}
      <Badge
        variant="secondary"
        className="flex w-fit items-center gap-2 bg-purple-50 px-4 py-2 text-purple-700 hover:bg-purple-100"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium">
          {scope === "national" ? "National" : "Local"}
        </span>
      </Badge>
    </div>
  );
};

export default RegionType;
