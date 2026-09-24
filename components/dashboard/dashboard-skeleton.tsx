import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 " />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-24 w-full" />
      </CardContent>
    </Card>
  );
}

export function SidebarSkeleton() {
  return <aside className="h-screen w-16 md:w-64 border-r bg-muted" />;
}

export function NavbarSkeleton() {
  return <nav className="h-16 w-full border-b bg-muted" />;
}
