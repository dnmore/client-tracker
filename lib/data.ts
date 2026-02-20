import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { LeadSelectOption, DealTableRaw, LeadTableRaw } from "./definitions";
import { verifySession } from "@/lib/dal";

export const getDashboardStats = unstable_cache(
  async () => {
    await verifySession();

    return Promise.all([
      prisma.deal.count(),
      prisma.deal.aggregate({
        where: { stage: "WON" },
        _sum: { amount: true },
      }),
      prisma.deal.count({ where: { stage: "WON" } }),
      prisma.deal.count({ where: { stage: "LOST" } }),
      prisma.lead.count(),
    ]);
  },
  ["dashboard-stats"],
  { tags: ["dashboard", "deals", "leads"] },
);

export const getLeadsSelectOptions = unstable_cache(
  async (): Promise<LeadSelectOption[]> => {
    
    return prisma.lead.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: "asc" },
    });
  },
  ["leads-select"],
  { tags: ["leads"] },
);

export const getDealsTableData = unstable_cache(
  async (): Promise<DealTableRaw[]> => {

     await verifySession();
    const deals = await prisma.deal.findMany({
      select: {
        id: true,
        name: true,
        lead: {
          select: { company: true },
        },
        amount: true,
        stage: true,
      },
    });

    return deals.map(deal => ({
      id: deal.id,
      name: deal.name,
      company: deal.lead.company,
      amount: deal.amount,
      stage: deal.stage,
    }));
  },
  ["deals-table"],
  { tags: ["deals"] }
);

export const getLeadsTableData = unstable_cache(
  async(): Promise<LeadTableRaw[]> => {
     await verifySession();
  return prisma.lead.findMany({
    select: {
      id: true,
      name: true,
      company: true,
      email: true,
    },
    orderBy: { createdAt: "desc" },
    
  });
}, ["leads-table"],
  { tags: ["leads"] }
)
