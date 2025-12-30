// User Details Tab - Compact Grid Layout
// Reduces vertical length by placing fields in two columns

import { FC, use } from "react";
import { MapPin, User, Phone, Mail, Info, UserCircle } from "lucide-react";
import { Field } from "@/components/custom-elements/DetailsField";

interface UserDetailsTabProps {
  userDetails?: any;
}

const UserDetailsTab: FC<UserDetailsTabProps> = ({ userDetails }) => {
  // Reusable Field Component

  return (
    <div className="space-y-10">
      {/* USER INFO */}
      <div className="space-y-4">
        <h3 className="border-b pb-2 text-lg font-semibold text-gray-800">
          User Information
        </h3>

        {/* 2 COLUMN GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field
            icon={UserCircle}
            label="Username"
            value={userDetails?.username}
          />
          <Field
            icon={Phone}
            label="Mobile Number"
            value={userDetails?.mobile_number ?? "N/A"}
          />
          <Field icon={Mail} label="Email" value={userDetails?.email} />
          <Field
            icon={Info}
            label="Gender"
            value={
              userDetails?.gender === "M"
                ? "Male"
                : userDetails?.gender === "F"
                  ? "Female"
                  : userDetails?.gender
                    ? userDetails?.gender
                    : "N/A"
            }
          />
          <Field icon={Info} label="Age" value={userDetails?.age ?? "N/A"} />
          <Field icon={MapPin} label="Full Address" value={userDetails?.location ?? "N/A"} />
        </div>
      </div>

      {/* REGION INFO */}
      {userDetails?.region && (
        <div className="space-y-4">
          <h3 className="border-b pb-2 text-lg font-semibold text-gray-800">
            Region Details
          </h3>

          {/* 2 COLUMN GRID */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field
              icon={MapPin}
              label="Region Name"
              value={userDetails?.region[0]?.name}
            />
            <Field
              icon={MapPin}
              label="Anchor City"
              value={userDetails?.region[0]?.anchor_city?.name}
            />
            <Field
              icon={MapPin}
              label="City Name"
              value={userDetails?.city?.name ?? "N/A"}
            />
            <Field
              icon={MapPin}
              label="ZIP Code"
              value={userDetails?.zipcode ?? "N/A"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsTab;
