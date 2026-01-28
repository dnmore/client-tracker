
import prisma from "@/lib/prisma";

export default async function Page() {
  const allLeads = await prisma.lead.findMany({
    select: {
      id: true,
      name: true,
      company: true,
      email: true,
      _count: {
        select: {
          deals: true,
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Leads</h1>
      <ul>
        {allLeads.map((lead) => (
          <li key={lead.id}>
            {lead.name} – {lead.company} – {lead.email} –{" "}
            Deals: {lead._count.deals}
          </li>
        ))}
      </ul>
    </div>
  );
}
