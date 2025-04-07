// components/PresidentEndPrayingSkeleton.tsx
"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const PresidentEndPrayingSkeleton = () => {
  return (
    <div className="w-full space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="flex justify-between">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  );
};

export const RemoverDesignacaoSkeleton = () => {
  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between space-x-2">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  );
};
