import * as React from "react";
import Link from "next/link";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  CreditCardIcon,
  ThreeDRotateIcon,
  Agreement03Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const links = [
  {
    name: "Overview",
    url: "/dashboard",
    icon: DashboardSquare01Icon,
  },
  {
    name: "Leads",
    url: "/dashboard/leads",
    icon: UserMultiple02Icon,
  },
  {
    name: "Deals",
    url: "/dashboard/deals",
    icon: Agreement03Icon,
  },
  {
    name: "Billing",
    url: "/dashboard/billing",
    icon: CreditCardIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <HugeiconsIcon icon={ThreeDRotateIcon} className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Client</span>
                  <span className="">Tracker</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {links.map((link) => (
              <SidebarMenuItem key={link.name}>
                <SidebarMenuButton asChild>
                  <Link href={link.url} className="flex items-center gap-3">
                    <HugeiconsIcon icon={link.icon} aria-hidden="true" />
                    {link.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
