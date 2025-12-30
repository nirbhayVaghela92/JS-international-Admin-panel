import { TrophyCard } from "@/components/custom-elements/TrophyCard";
import { Trophy } from "lucide-react";

export function UserTrophies({ trophies }: { trophies: any[] }) {
  return (
    <div className="space-y-4 pb-6">
      <div className="space-y-3">
        <div className="flex justify-center">
          {trophies.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <Trophy className="mx-auto mb-2 h-12 w-12 text-gray-400" />
              <p>No trophies available for this user.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {trophies.map((badge, index) => (
                <TrophyCard
                  key={index}
                  badge={badge}
                  isCurrentBadge={true}
                  isRemoveIcon={false}
                  //   onRemove={removeTrophy}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
