import { signIn, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider, { redirectTo: "/dashboard" });
      }}
    >
      <Button className="capitalize" size="lg">Signin with {provider}</Button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button className="flex gap-2 items-center cursor-pointer">
        <HugeiconsIcon icon={Logout01Icon} />
        Sign Out
      </button>
    </form>
  );
}
