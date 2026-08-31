import type { Metadata } from "next";
import { verifySession } from "@/lib/dal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UpgradeButton,
  ManageBillingButton,
} from "@/components/billing/billing-components";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const session = await verifySession();

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <p className="mt-1 text-sm text-muted-foreground">Billing</p>
        <CardTitle className="text-4xl font-bold">
          {session.user.plan}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {session.user.plan !== "PRO" && (
          <div className="mt-6">
            <UpgradeButton userId={session.user.id} role={session.user.role} />
            <ul className="list-none flex flex-col py-4 gap-2 text-sm">
              <li className="flex items-center gap-2">
                <p className="font-semibold text-2xl">€ 15 </p>
                <span>per month</span>
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={Tick01Icon} />
                <p>Unlimited Deals</p>
              </li>
            </ul>
          </div>
        )}
        {session.user.plan === "PRO" && (
          <div className="mt-6">
            <ManageBillingButton role={session.user.role} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
