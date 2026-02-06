
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDealsTableData } from "@/lib/data";


export default async function Page() {
  const allDeals = await getDealsTableData();

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
