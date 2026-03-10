import { signIn, signOut } from "@/lib/auth";
import { SignInButton } from "../ui/signin-button";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";


export function SignIn({ provider, icon}: { provider?: string, icon: IconSvgElement  }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider, { redirectTo: "/dashboard" });
      }}
    >
      <SignInButton provider={provider} icon={icon}/>
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
