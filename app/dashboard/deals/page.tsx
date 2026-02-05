import prisma from "@/lib/prisma";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Page() {
  const dealsData = await prisma.deal.findMany({
    select: {
      id: true,
      name: true,
      lead: {
        select: {
          company:true,
        }
      },
      amount: true,
      stage: true,
      
      
      
    },
  });

  const allDeals = dealsData.map(deal => ({
    id: deal.id,
    name: deal.name,
    company: deal.lead.company,
    amount: deal.amount,
    stage: deal.stage,
  }));

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Deals</h1>
        <Button asChild size={"lg"}>
          <Link href="/dashboard/deals/create">Create Deal</Link>
        </Button>
      </div>
       <div className="container mx-auto py-10">
            <DataTable columns={columns} data={allDeals} />
          </div>
    </div>
  );
}

