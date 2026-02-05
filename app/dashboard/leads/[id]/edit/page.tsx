import prisma from "@/lib/prisma";
import EditLeadForm from "@/components/leads/edit-lead";
import { notFound } from "next/navigation";
export default async function Page(props: { params: Promise<{ id: string }> }){
    const { id } = await props.params;

    const leadToUpdate = await prisma?.lead.findUnique({
        where: { id: id },
      });

      if(!leadToUpdate){
        notFound();
      }

    return (<div className="pt-6">
          <h1 className="mb-2 text-xl md:text-2xl ml-1">Edit Lead</h1>
          <div className="container py-10 max-w-lg">
            <EditLeadForm lead={leadToUpdate}/>
          </div>
        </div>)
}