import { Skeleton } from "@/components/ui/skeleton"

interface RemoverDesignacaoSkeletonProps {
  inDialog?: boolean
}

export function RemoverDesignacaoSkeleton({ inDialog = false }: RemoverDesignacaoSkeletonProps) {
  return (
    <div className={inDialog ? "" : "border rounded-lg shadow-sm"}>
      {!inDialog && (
        <div className="p-4 bg-muted/40 border-b">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
      )}

      <div className={`grid gap-3 ${inDialog ? "" : "p-4"}`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-lg border p-3">
            <div className="flex items-start gap-3">
              {inDialog && (
                <div className="pt-1">
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
              )}

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-7 w-7 rounded-full" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>

                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>

                <Skeleton className="h-3 w-40 mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

