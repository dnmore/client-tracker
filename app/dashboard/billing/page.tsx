import { verifySession } from "@/lib/dal";
import { UpgradeButton, ManageBillingButton } from "@/components/billing/billing-components";

export default async function Page() {
    const session = await verifySession();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-semibold">Billing</h1>

      <p className="mt-4 text-muted-foreground">
        Your current plan: 
        <span className="font-medium"> {session.user.plan}</span>
      </p>

      {session.user.plan !== "PRO" && (
        <div className="mt-6">
          <UpgradeButton userId={session.user.id} role={session.user.role} />

        </div>
        
      )}
      {session.user.plan === "PRO" && (
        <div className="mt-6">
          <ManageBillingButton role={session.user.role} />
        </div>
      )}
    </div>
  );
}
