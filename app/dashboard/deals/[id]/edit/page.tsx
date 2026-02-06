import prisma from "@/lib/prisma";
import EditDealForm from "@/components/deals/edit-deal";
import { notFound } from "next/navigation";
import { getLeadsSelectOptions } from "@/lib/data";
export default async function Page(props: { params: Promise<{ id: string }> }){
    const { id } = await props.params;
    const leadsData = await getLeadsSelectOptions();

    const dealToUpdate = await prisma?.deal.findUnique({
        where: { id: id },
      });

      if(!dealToUpdate){
        notFound();
      }

    return (<div className="pt-6">
          <h1 className="mb-2 text-xl md:text-2xl ml-1">Edit Deal</h1>
          <div className="container py-10 max-w-lg">
            <EditDealForm deal={dealToUpdate} leadsOptions={leadsData}/>
          </div>
        </div>)
}