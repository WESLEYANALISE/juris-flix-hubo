
import { Skeleton } from '@/components/ui/skeleton';

export const FunctionCardSkeleton = () => {
  return (
    <div className="p-4 bg-card rounded-xl border border-border/50 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
};

export const FunctionCardSkeletonGrid = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }, (_, i) => (
        <FunctionCardSkeleton key={i} />
      ))}
    </div>
  );
};
