"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { Loading02Icon } from "@hugeicons/core-free-icons";

export function SignInButton({
  provider,
  icon,
}: {
  provider?: string;
  icon: IconSvgElement;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="capitalize flex items-center px-6 py-4 gap-2"
    >
      {pending ? (
        <>
          <HugeiconsIcon
            icon={Loading02Icon}
            className="mr-2 h-4 w-4 animate-spin"
          />
          Logging in...
        </>
      ) : (
        <>
          <HugeiconsIcon icon={icon} />
          {provider === "demo" ? "Try Demo" : `Login with ${provider}`}
        </>
      )}
    </Button>
  );
}
