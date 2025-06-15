import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="flex items-center gap-8 py-4 border-b">
        {[1, 2, 3, 4, 5, 6]?.map((index) => (
          <div key={index}>
            <Skeleton className="w-[60px] h-4 rounded-lg" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((items, index) => (
          <div className="flex flex-col gap-2 rounded-md" key={index}>
            <div>
              <Skeleton className="w-full h-[200px] rounded-lg" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
