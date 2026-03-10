import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { HugeiconsIcon } from "@hugeicons/react";
import { ThreeDRotateIcon, GithubIcon, GoogleIcon } from "@hugeicons/core-free-icons";

import { SignIn } from "@/components/auth/auth-components";

export default async function Page() {
  return (
    <main className="flex flex-col justify-center items-center gap-4 bg-background px-4 md:px-32">
      <div className="w-full flex justify-between items-center sticky top-0 left-0 p-4">
        <div className="flex gap-2 text-muted-foreground">
          <HugeiconsIcon icon={ThreeDRotateIcon} className="h-8 w-8" />
          <p className="text-lg font-semibold">Nexus</p>
        </div>

        <ModeToggle />
      </div>
      <div className="container mx-auto">
        <Card className="w-full py-12 md:px-8 bg-zinc-50 dark:bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-center text-3xl md:text-5xl font-extrabold">
              Track Clients, Deals, Revenue — All in One Place
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-lg text-muted-foreground">
              Manage leads, track deal progress, and monitor your revenue in one
              clean workspace.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-8">
              
              <Suspense fallback={<Button disabled>Loading...</Button>}>
                <SignIn provider="google" icon={GoogleIcon} />
              </Suspense>
              <Suspense fallback={<Button disabled>Loading...</Button>}>
                <SignIn provider="github" icon={GithubIcon} />
              </Suspense>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
