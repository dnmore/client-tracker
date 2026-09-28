import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ThreeDRotateIcon,
  GithubIcon,
  GoogleIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import HeroImage from "@/public/hero_img.png";

import { SignIn } from "@/components/auth/auth-components";
import { DemoSignIn } from "@/components/auth/auth-components";
import { DEMO_MODE } from "@/lib/config";

import { PainPoints } from "@/components/landing/painpoints";
import { Features } from "@/components/landing/features";
export default async function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 px-4">
      <div className="w-full flex justify-between items-center sticky top-0 left-0 p-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <HugeiconsIcon icon={ThreeDRotateIcon} className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">Client</span>
            <span>Tracker</span>
          </div>
        </div>
        <ModeToggle />
      </div>
      <div className="container mx-auto flex flex-col items-center justify-center md:flex-row gap-2 bg-linear-to-l from-primary/10 to-transparent dark:from-primary/40 py-12">
        <div className="w-full flex flex-col px-4 md:px-8">
          <div className="mb-4">
            <Badge variant="outline">
              <HugeiconsIcon
                icon={Tick01Icon}
                className="size-4"
                data-icon="inline-start"
              />
              All-in-one CRM for freelancer & small business
            </Badge>
          </div>
          <div>
            <h1 className=" text-3xl md:text-5xl font-extrabold">
              Track Clients, Deals, Revenue — All in One Place
            </h1>
          </div>
          <div className="py-4">
            <p className="text-lg text-muted-foreground mb-4">
              Manage leads, track deal progress, and monitor your revenue in one
              clean workspace.
            </p>
            <div className="flex flex-col gap-2">
              {!DEMO_MODE && (
                <div className="flex flex-col md:flex-row gap-2 mt-8">
                  <SignIn provider="google" icon={GoogleIcon} />
                  <SignIn provider="github" icon={GithubIcon} />
                </div>
              ) 
              }
              <Suspense fallback={<Button disabled>Loading...</Button>}>
                <DemoSignIn />
              </Suspense>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={HeroImage}
            width={560}
            height={620}
            className="hidden md:block"
            alt="Screenshot of the dashboard"
          />
        </div>
      </div>

      {/* // Pain points */}
      <PainPoints />
      {/* // Features */}
      <Features />
      {/* // Demo */}
      <section className="container mx-auto">
        <div className="w-full py-12 px-4 md:px-8 flex flex-col gap-4 items-center justify-center text-center">
          <h2 className="text-2xl md:text-4xl font-bold pt-8">
            Explore before you commit.
          </h2>

          <p className="text-muted-foreground text-sm mb-4">
            Try a pre-populated demo workspace: explore leads, deals, analytics,
            and billing without creating an account.
          </p>

          <DemoSignIn />
        </div>
      </section>
      <Footer />
    </div>
  );
}
