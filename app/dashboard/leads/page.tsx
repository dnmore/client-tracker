
import prisma from "@/lib/prisma";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Page() {
  const allLeads = await prisma.lead.findMany({
    select: {
      id: true,
      name: true,
      company: true,
      email: true,
      
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <Button asChild size={"lg"}>
          <Link href="/dashboard/leads/create">Create Lead</Link>
        </Button>
      </div>
      
       <div className="container mx-auto py-10">
      <DataTable columns={columns} data={allLeads} />
    </div>
    </div>
  );
}
