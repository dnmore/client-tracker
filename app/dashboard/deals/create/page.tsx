import { verifySession } from "@/lib/dal";
import CreateDealForm from "@/components/deals/create-deal";
import { getLeadsSelectOptions } from "@/lib/data";

export default async function Page() {
  const session = await verifySession();
  const leadsData = await getLeadsSelectOptions();
  

  return (
    <div className="pt-6">
      <h1 className="mb-2 text-xl md:text-2xl ml-1">Create Deal</h1>
      <div className="container py-10 max-w-lg">
        <CreateDealForm leadsOptions={leadsData} role={session.user.role} />
      </div>
    </div>
  );
}
