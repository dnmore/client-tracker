import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { LeadSelectOption, DealTableRaw, LeadTableRaw } from "./definitions";

export const getDashboardStats = async () => {
  "use cache";
  cacheTag("dashboard", "deals", "leads");

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
};

export async function getLeadsSelectOptions(): Promise<LeadSelectOption[]> {
  "use cache";
  cacheTag("leads");

  return prisma.lead.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getDealsTableData(): Promise<DealTableRaw[]> {
  "use cache";
  cacheTag("deals");

  const deals = await prisma.deal.findMany({
    select: {
      id: true,
      name: true,
      lead: {
        select: {
          company: true,
        },
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
}


export async function getLeadsTableData(): Promise<LeadTableRaw[]> {
  "use cache";
  cacheTag("leads");

  return prisma.lead.findMany({
    select: {
      id: true,
      name: true,
      company: true,
      email: true,
    },
    orderBy: { createdAt: "desc" },
  });
}