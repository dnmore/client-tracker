import prisma from "@/lib/prisma";
import CreateDealForm from "@/components/deals/create-deal";

export default async function Page() {
  const leadsData = await prisma.lead.findMany({
    select: {
      id: true,
      name: true,
    },
  });

 
  return (
    <div className="pt-6">
      <h1 className="mb-2 text-xl md:text-2xl ml-1">Create Deal</h1>
      <div className="container py-10 max-w-lg">
        <CreateDealForm leadsOptions={leadsData}/>
      </div>
    </div>
  );
}