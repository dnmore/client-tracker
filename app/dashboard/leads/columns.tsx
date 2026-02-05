"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpDownIcon, PencilEdit02Icon } from "@hugeicons/core-free-icons";

import { DeleteLead } from "@/components/ui/delete-button";

import { Button } from "@/components/ui/button";

import { LeadTableRaw } from "@/lib/definitions";

export const columns: ColumnDef<LeadTableRaw>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <HugeiconsIcon icon={ArrowUpDownIcon} className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <HugeiconsIcon icon={ArrowUpDownIcon} className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lead = row.original;

      return (
        <div className=" flex justify-between gap-2">
          <Link href={`/dashboard/leads/${lead.id}/edit`}>
            <HugeiconsIcon icon={PencilEdit02Icon} className="ml-2 h-4 w-4" />
          </Link>

          <DeleteLead id={lead.id} />
        </div>
      );
    },
  },
];
