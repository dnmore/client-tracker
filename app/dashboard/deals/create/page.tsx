import type { Metadata } from "next";
import { verifySession } from "@/lib/dal";
import CreateDealForm from "@/components/deals/create-deal";
import { getLeadsSelectOptions } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";



export const metadata: Metadata = {
  title: 'Create Deal',
};
export default async function Page() {
  const session = await verifySession();
  const leadsData = await getLeadsSelectOptions();
  

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
                  <BreadcrumbPage>Create Deal</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
           
    
            <div className="container mx-auto py-10">
             <CreateDealForm leadsOptions={leadsData} role={session.user.role} />
            </div>
          </div>
        </div>
  );
}
