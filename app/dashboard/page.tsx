import { Suspense } from "react";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import DashboardCards from "@/components/ui/dashboard-cards";


export default async function Page() {

  
  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <p className="mt-2 text-muted-foreground">Welcome to your dashboard.</p>
      <Suspense fallback={<DashboardSkeleton />} >
        <DashboardCards  />
      </Suspense>
      
    </div>
  );
}
