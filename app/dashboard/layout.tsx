import { Navbar } from "@/components/dashboard/navbar";
import { verifySession } from "@/lib/dal";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return (
    <main>
      <Navbar session={session} />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </main>
  );
}
