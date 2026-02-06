import prisma from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { LeadSelectOption } from "./definitions";

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