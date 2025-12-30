import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, CheckCircle, Clock, XCircle } from "lucide-react";
import { formatDate } from "@/utils/helpers/commonHelpers";

// Dummy data for plan history
const planHistoryData = [
  {
    id: 1,
    planName: "Base Plan",
    price: 49.0,
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    status: "Active",
  },
  {
    id: 2,
    planName: "Regional Reach Add-On",
    price: 10.0,
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    status: "Active",
  },
  {
    id: 3,
    planName: "Additional Locations Add-On",
    price: 29.0,
    startDate: "2024-06-01",
    endDate: "2024-12-01",
    status: "Expired",
  },
  {
    id: 4,
    planName: "Base Plan",
    price: 49.0,
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    status: "Expired",
  },
  {
    id: 5,
    planName: "Online Add-On",
    price: 10.0,
    startDate: "2024-09-01",
    endDate: "2024-12-01",
    status: "Cancelled",    
  },
];

const BusinessPlanHistory = () => {
  const getStatusBadge = (status: any) => {
    const statusConfig = {
      Active: {
        className: "bg-green-600 hover:bg-green-700 text-white",
        icon: CheckCircle,
      },
      Expired: {
        className: "bg-slate-600 hover:bg-slate-700 text-white",
        icon: Clock,
      },
      Cancelled: {
        className: "bg-red-600 hover:bg-red-700 text-white",
        icon: XCircle,
      },
    };

    const config = statusConfig[status as "Active" | "Expired" | "Cancelled"] || statusConfig["Expired"];
    const Icon = config.icon;

    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="w-full">
      {/* Plan List */}
      <div className="space-y-3">
        {planHistoryData.map((plan) => (
          <Card
            key={plan.id}
            className="border border-gray-200 bg-white transition-all hover:border-purple-300 hover:shadow-sm"
          >
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Plan Name */}
                <div className="min-w-[150px] flex-1">
                  <h4 className="text-base font-semibold text-gray-900">
                    {plan.planName}
                  </h4>
                </div>

                {/* Amount */}
                <div className="flex items-baseline gap-0.5 rounded border border-purple-200 bg-purple-50 px-3 py-2">
                  <span className="text-lg font-bold text-purple-600">$</span>
                  <span className="text-lg font-bold text-purple-600">
                    {plan.price.toFixed(2)}
                  </span>
                  <span className="ml-0.5 text-xs text-gray-600">/mo</span>
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-2 rounded border border-gray-200 bg-gray-50 px-3 py-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <span>{formatDate(plan.startDate)}</span>
                    <span className="text-gray-400">-</span>
                    <span>{formatDate(plan.endDate)}</span>
                  </div>
                </div>

                {/* Status */}
                <div>{getStatusBadge(plan.status)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessPlanHistory;
