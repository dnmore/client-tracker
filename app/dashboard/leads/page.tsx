
import prisma from "@/lib/prisma";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

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
      <h1 className="text-2xl font-semibold">Leads</h1>
       <div className="container mx-auto py-10">
      <DataTable columns={columns} data={allLeads} />
    </div>
    </div>
  );
}
