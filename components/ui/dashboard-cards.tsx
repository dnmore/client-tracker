import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { HugeiconsIcon } from '@hugeicons/react';
import { LayerIcon, Chart01Icon , ArrowUp02Icon,  ArrowDown02Icon, User03Icon,  Invoice01Icon  } from '@hugeicons/core-free-icons';

const iconMap = {
deals:LayerIcon,
revenue: Chart01Icon ,
won:ArrowUp02Icon,
lost:  ArrowDown02Icon,
leads:User03Icon,
billing: Invoice01Icon
}

export default async function DashboardCards() {
  const [totalDeals, totalRevenue, totalDealsWon, totalDealsLost, totalLeads] =
    await Promise.all([
      prisma.deal.count(),

      prisma.deal.aggregate({
        where: {
          stage: "WON",
        },
        _sum: {
          amount: true,
        },
      }),

      prisma.deal.count({
        where: {
          stage: "WON",
        },
      }),

      prisma.deal.count({
        where: {
          stage: "LOST",
        },
      }),

      prisma.lead.count(),
    ]);
  return (
    <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 grid">
      <DashboardCard title="Deals Created" value={totalDeals} type="deals" className="text-indigo-500" />
      <DashboardCard
        title="Revenue"
        value={totalRevenue._sum.amount || 0}
        type="revenue"
        className="text-yellow-500"
      />
      <DashboardCard title="Deals Won" value={totalDealsWon} type="won" className="text-green-500" />
      <DashboardCard title="Deals Lost" value={totalDealsLost} type="lost" className="text-red-500"/>
      <DashboardCard title="Leads Created" value={totalLeads} type="leads" className="text-blue-500" />
       <DashboardCard title="Billing" value="Free" type="billing" className="text-stone-500" />
    </div>
  );
}

export function DashboardCard({
  title,
  value,
  type,
  className,
}: {
  title: string;
  value: number | string;
  type: "deals" | "revenue" | "won" | "lost" | "leads" | "billing";
  className: string;
}) {

  const Icon = iconMap[type]
  return (
    <Card >
      <CardHeader>
        <CardTitle className={className}>
          <HugeiconsIcon
      icon={Icon}
      
    />
          
          </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {title}
        </p>
      </CardContent>
    </Card>
  );
}
