import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Billing</h1>
      <p className="mt-4 text-muted-foreground">
        Your current plan: {session.user.plan}
      </p>
    </div>
  );
}
