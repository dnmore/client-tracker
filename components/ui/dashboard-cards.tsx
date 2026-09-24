import { getDashboardStats } from "@/lib/data";
import { verifySession } from "@/lib/dal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LayerIcon,
  Chart01Icon,
  ArrowUp02Icon,
  ArrowDown02Icon,
  User03Icon,
  Crown03Icon,
} from "@hugeicons/core-free-icons";

const iconMap = {
  deals: LayerIcon,
  revenue: Chart01Icon,
  won: ArrowUp02Icon,
  lost: ArrowDown02Icon,
  leads: User03Icon,
  billing: Crown03Icon,
};

function DashboardCard({
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
  const Icon = iconMap[type];
  return (
    <Card>
      <CardHeader>
        <CardTitle className={className}>
          <HugeiconsIcon icon={Icon} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  );
}

export default async function DashboardCards() {
  const [totalDeals, totalRevenue, totalDealsWon, totalDealsLost, totalLeads] =
    await getDashboardStats();
  const session = await verifySession();
  const userPlan = session.user?.plan || "Free";
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DashboardCard
          title="Deals Created"
          value={totalDeals}
          type="deals"
          className="flex aspect-square size-8 items-center justify-center rounded-lg text-indigo-500 bg-indigo-100 dark:bg-indigo-900"
        />
        <DashboardCard
          title="Revenue"
          value={totalRevenue._sum.amount || 0}
          type="revenue"
          className="flex aspect-square size-8 items-center justify-center rounded-lg text-yellow-500 bg-yellow-100 dark:bg-yellow-900"
        />
        <DashboardCard
          title="Deals Won"
          value={totalDealsWon}
          type="won"
          className="flex aspect-square size-8 items-center justify-center rounded-lg text-green-500 bg-green-100 dark:bg-green-900"
        />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DashboardCard
          title="Deals Lost"
          value={totalDealsLost}
          type="lost"
          className="flex aspect-square size-8 items-center justify-center rounded-lg text-red-500 bg-red-100 dark:bg-red-900"
        />
        <DashboardCard
          title="Leads Created"
          value={totalLeads}
          type="leads"
          className="flex aspect-square size-8 items-center justify-center rounded-lg text-blue-500 bg-blue-100 dark:bg-blue-900"
        />
        <DashboardCard
          title="Billing"
          value={userPlan}
          type="billing"
          className="flex aspect-square size-8 items-center justify-center rounded-lg text-stone-800 bg-stone-100 dark:bg-stone-900 dark:text-neutral-100"
        />
      </div>
    </div>
  );
}
