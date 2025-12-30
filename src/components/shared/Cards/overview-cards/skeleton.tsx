import { Skeleton } from "@/components/ui/skeleton";

export function OverviewCardsSkeleton() {
  return (
    <div className="space-y-8">
      {/* TOP SECTION — 5 CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-5">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            {/* Icon */}
            <Skeleton className="h-12 w-12 rounded-md" />

            {/* Content */}
            <div className="mt-6 flex flex-col">
              <Skeleton className="mb-2 h-7 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        ))}
      </div>

      {/* POST CATEGORIES SECTION */}
      {/* <div>
        <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
          Post Categories
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-6">

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
            >
      
              <Skeleton className="h-12 w-12 rounded-md" />

            
              <div className="mt-6 flex flex-col">
                <Skeleton className="mb-2 h-7 w-20" />
                <Skeleton className="h-5 w-28" />
              </div>
            </div>
          ))}

        </div>
      </div> */}
    </div>
  );
}
