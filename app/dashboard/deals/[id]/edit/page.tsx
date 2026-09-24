import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import EditDealForm from "@/components/deals/edit-deal";
import { notFound } from "next/navigation";
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
  title: 'Edit Deal',
};
export default async function Page(props: { params: Promise<{ id: string }> }){
  const session = await verifySession(); 
    const { id } = await props.params;
    const leadsData = await getLeadsSelectOptions();

    const dealToUpdate = await prisma?.deal.findUnique({
        where: { id: id },
      });

      if(!dealToUpdate){
        notFound();
      }

    return (<div>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
    
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Deal</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="container mx-auto py-10">
               <EditDealForm deal={dealToUpdate} leadsOptions={leadsData} role={session.user.role}/>
            </div>
          </div>
        </div>)
}