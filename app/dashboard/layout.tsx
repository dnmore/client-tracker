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
    <div className="flex min-h-screen bg-muted/40">
      <Suspense fallback={<SidebarSkeleton />}>
        <ClientSidebar />
      </Suspense>
      
      <div className="flex flex-1 flex-col">
        <Suspense fallback={<NavbarSkeleton />}>  <Navbar session={session} />
        </Suspense>
      
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
