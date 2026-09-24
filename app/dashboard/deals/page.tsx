import type { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDealsTableData } from "@/lib/data";
import { verifySession } from "@/lib/dal";
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
  title: 'Deals',
};



        

export default async function Page() {
    const session = await verifySession();
  const allDeals = await getDealsTableData();

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
              <BreadcrumbPage>Deals</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div>
          <Button asChild>
          <Link href="/dashboard/deals/create">Create Deal</Link>
        </Button>
        </div>

        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={allDeals}  role={session.user.role}  />
      </div>
      </div>
    </div>
  );
}
