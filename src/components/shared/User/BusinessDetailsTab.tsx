import { Field } from "@/components/custom-elements/DetailsField";
import TooltipWrapper from "@/components/custom-elements/TooltipWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { routes } from "@/constants/routes";
import { capitalizeWords, formatDate } from "@/utils/helpers/commonHelpers";
import {
  MapPin,
  Users,
  Briefcase,
  Building2,
  CalendarDays,
  ShoppingCart,
  Banknote,
  Mail,
  UserCircle,
  UsersRound,
  BriefcaseBusiness,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface BusinessDetailsProps {
  businessDetails: any;
}

const BusinessDetailsTab: FC<BusinessDetailsProps> = ({ businessDetails }) => {
  const router = useRouter();

  return (
    <div className="min-h-fit bg-gray-50">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="space-y-4 border-t pt-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-gray-800">
              Owner Information
            </h3>

            <div className="flex cursor-pointer items-start gap-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
              <TooltipWrapper content="View Owner Profile">
                <Avatar
                  className="h-16 w-16 border-2 border-indigo-200 shadow-md"
                  onClick={() =>
                    router.push(routes.users.view(businessDetails?.user_id))
                  }
                >
                  <AvatarImage
                    src={businessDetails?.user_profile_pic}
                    className="aspect-square h-full w-full rounded-full object-cover"
                  />
                  <AvatarFallback className="bg-indigo-200 text-indigo-700">
                    {capitalizeWords(businessDetails?.user_name)}
                  </AvatarFallback>
                </Avatar>
              </TooltipWrapper>

              <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Owner Name
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    {capitalizeWords(businessDetails?.user_name)}
                  </p>
                </div>

                {businessDetails?.user_email && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-indigo-600 hover:text-indigo-700">
                      {businessDetails?.user_email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Business Information Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-gray-800">
              Business Information
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field
                icon={Building2}
                label="Business Name"
                value={businessDetails?.business_name || "N/A"}
              />

              <Field
                icon={UserCircle}
                label="Business Username"
                value={businessDetails?.business_username || "N/A"}
              />

              <Field
                icon={Mail}
                label="Business Email"
                value={businessDetails?.business_email || "N/A"}
              />

              <Field
                icon={UsersRound}
                label="Business Size"
                value={businessDetails?.business_size?.name || "N/A"}
              />

              <Field
                icon={MapPin}
                label="Full Address"
                value={businessDetails?.business_full_address || "N/A"}
              />

              <Field
                icon={CalendarDays}
                label="Registered At"
                value={formatDate(businessDetails?.created_at) || "N/A"}
              />

              <Field
                icon={ShoppingCart}
                label="Monthly Online Orders"
                value={
                  businessDetails?.monthly_online_orders?.range_label || "N/A"
                }
              />

              <Field
                icon={MapPin}
                label="Physical Locations Range"
                value={
                  businessDetails?.physical_locations_range?.range_label ||
                  "N/A"
                }
              />

              <Field
                icon={Banknote}
                label="Estimated Annual Revenue"
                value={
                  businessDetails?.estimated_annual_revenue?.range_label ||
                  "N/A"
                }
              />
              <Field
                icon={BriefcaseBusiness}
                label="Business Industry"
                value={
                  businessDetails?.business_industry?.name ||
                  "N/A"
                }
              />
            </div>
          </div>

          {/* REGION INFO */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-gray-800">
              Region Details
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field
                icon={MapPin}
                label="Region Name"
                value={businessDetails?.region?.name ?? "N/A"}
              />
              <Field
                icon={MapPin}
                label="Anchor City"
                value={businessDetails?.region?.anchor_city?.name ?? "N/A"}
              />
              <Field
                icon={MapPin}
                label="City Name"
                value={businessDetails?.city_name ?? "N/A"}
              />
              <Field
                icon={MapPin}
                label="ZIP Code"
                value={businessDetails?.region?.zipcode ?? "N/A"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsTab;
