import { CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const getQueryStatusBadge = (status: "pending" | "resolved") => {
  switch (status) {
    case "pending":
      return (
        <Badge className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );

    case "resolved":
      return (
        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Resolved
        </Badge>
      );
  }
};

export default getQueryStatusBadge;
