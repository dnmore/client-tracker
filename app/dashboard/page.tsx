import type { Metadata } from "next";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import DashboardCards from "@/components/ui/dashboard-cards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  
  SidebarTrigger,
} from "@/components/ui/sidebar"


export const metadata: Metadata = {
  title: 'Dashboard',
}; 
export default async function Page() {

  
  return (
   <div>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
             <SidebarTrigger className="-ml-1" />
             
             <Breadcrumb>
               <BreadcrumbList>
                 <BreadcrumbItem className="hidden md:block">
                   <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                 </BreadcrumbItem>
                 <BreadcrumbSeparator className="hidden md:block" />
                 <BreadcrumbItem>
                   <BreadcrumbPage>Overview</BreadcrumbPage>
                 </BreadcrumbItem>
               </BreadcrumbList>
             </Breadcrumb>
           </header>
           <Suspense fallback={<DashboardSkeleton />} >
        <DashboardCards  />
      </Suspense>
       </div>
  );
}
