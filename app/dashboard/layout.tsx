import ClientSidebar from "@/components/dashboard/client-sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { Suspense } from "react";
import SidebarSkeleton from "@/components/dashboard/dashboard-skeleton";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex min-h-screen bg-muted/40">
      <Suspense fallback={<SidebarSkeleton />}>
        <ClientSidebar />
      </Suspense>
      
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
