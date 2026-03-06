"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

import { HugeiconsIcon } from '@hugeicons/react';
import { DashboardSquare01Icon, UserGroupIcon, Agreement02Icon, CreditCardIcon, Chart01Icon } from '@hugeicons/core-free-icons';


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
  
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-auto w-16 flex-col border-r bg-background md:w-64" aria-label="Sidebar">
      
      <div className="flex h-14 items-center justify-center border-b md:justify-start md:px-6">
        <HugeiconsIcon icon={Chart01Icon} className="m-4 h-8 w-8 md:hidden" />
        
        <span className="hidden text-lg font-semibold md:block">Nexus</span>
      </div>

      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-1 flex-col gap-1 p-2"  aria-label="Dashboard navigation">
          {links.map(({ name, href, icon: Icon }) => {
            const link = (
              <Link
                href={href}
                 aria-label={name}
                aria-current={pathname === href ? "page" : undefined}
                className={clsx(
                  "group flex h-10 items-center justify-center gap-3 rounded-md text-sm bg-background text-foreground hover:bg-muted transition-colors md:justify-start md:px-3",
                  {
                    "font-bold bg-muted":
                      pathname === href,
                  },
                )}
              ><HugeiconsIcon icon={Icon} aria-hidden="true" className="h-6 w-6" />
               
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
