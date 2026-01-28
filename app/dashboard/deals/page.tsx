import prisma from "@/lib/prisma";

export default async function Page() {
  const allDeals = await prisma.deal.findMany({
    select: {
      id: true,
      name: true,
      amount: true,
      stage: true,
      lead: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Deals</h1>
      <ul>
        {allDeals.map((deal) => (
          <li key={deal.id}>
            {deal.name} – {deal.amount} – {deal.stage} – Lead:
            {deal.lead.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

