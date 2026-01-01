// OverviewCardsGroup.tsx
import { compactFormat } from "@/utils/helpers/commonHelpers";
import { OverviewCard } from "./card";
import * as icons from "@/assets/icon";

export function OverviewCardsGroup({ data }: { data: any }) {
  // const {
  //   views,
  //   profit,
  //   products,
  //   users,
  //   userPosts,
  //   userGroups,
  //   myGoodListPosts,
  //   adventurePosts,
  //   challengesPosts,
  //   contestsPosts
  // } = await getOverviewData();

  return (
    <div className="space-y-8">
      {/* User & Community Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:gap-6">
        <OverviewCard
          label="Total Users"
          data={{
            value: compactFormat(data?.total_users),
          }}
          Icon={icons.Users}
        />
        <OverviewCard
          label="Products"
          data={{
            value: compactFormat(data?.total_products),
          }}
          Icon={icons.Products}
        />
      </div>
    </div>
  );
}
