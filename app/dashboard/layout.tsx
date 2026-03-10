import ClientSidebar from "@/components/dashboard/client-sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { Suspense } from "react";
import {SidebarSkeleton, NavbarSkeleton} from "@/components/dashboard/dashboard-skeleton";
import { verifySession } from "@/lib/dal";



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
    const session = await verifySession();

  return (
    <div className="flex flex-1 w-full overflow-hidden">
      <Suspense fallback={<SidebarSkeleton />}>
        <ClientSidebar />
      </Suspense>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Suspense fallback={<NavbarSkeleton />}>  <Navbar session={session} />
        </Suspense>
      
        <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">
        
        {children}</main>
      </div>
    </div>
  );
}
