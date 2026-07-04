import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function BookCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <AspectRatio ratio={3 / 4}>
        <Skeleton className="h-full w-full rounded-none" />
      </AspectRatio>
      <CardContent className="space-y-2 p-5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  );
}
