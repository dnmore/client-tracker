"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

import { HugeiconsIcon } from '@hugeicons/react';
import { DashboardSquare01Icon, UserGroupIcon, Agreement02Icon, CreditCardIcon, Settings01Icon, Chart01Icon } from '@hugeicons/core-free-icons';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const links = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: DashboardSquare01Icon,
  },
  {
    name: "Leads",
    href: "/dashboard/leads",
    icon: UserGroupIcon,
  },
  {
    name: "Deals",
    href: "/dashboard/deals",
    icon: Agreement02Icon,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCardIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings01Icon,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-16 flex-col border-r bg-background md:w-64">
      
      <div className="flex h-14 items-center justify-center border-b md:justify-start md:px-6">
        <HugeiconsIcon icon={Chart01Icon} className="m-4 h-8 w-8 md:hidden" />
        
        <span className="hidden text-lg font-semibold md:block">Nexus</span>
      </div>

      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-1 flex-col gap-1 p-2">
          {links.map(({ name, href, icon: Icon }) => {
            const link = (
              <Link
                href={href}
                className={clsx(
                  "group flex h-10 items-center justify-center gap-3 rounded-md text-sm font-medium bg-muted text-foreground transition-colors md:justify-start md:px-3",
                  {
                    "text-muted-foreground hover:bg-muted hover:text-foreground":
                      pathname === href,
                  },
                )}
              ><HugeiconsIcon icon={Icon} className="h-6 w-6" />
               
                <span className="hidden md:inline">{name}</span>
              </Link>
            );

            return (
              <Tooltip key={href}>
                
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" className="md:hidden">
                  {name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
