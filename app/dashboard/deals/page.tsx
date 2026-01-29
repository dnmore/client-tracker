import prisma from "@/lib/prisma";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default async function Page() {
  const allDeals = await prisma.deal.findMany({
    select: {
      id: true,
      name: true,
      amount: true,
      stage: true,
      
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Deals</h1>
       <div className="container mx-auto py-10">
            <DataTable columns={columns} data={allDeals} />
          </div>
    </div>
  );
}

