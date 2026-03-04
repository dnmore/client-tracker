"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpDownIcon, Edit03Icon } from "@hugeicons/core-free-icons";

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
    cell: ({ row, table }) => {
      const lead = row.original;
      const role = table.options.meta?.role as "OWNER" | "VIEWER";

      return (
        <div className=" flex justify-between gap-2">
          <Link
            href={`/dashboard/leads/${lead.id}/edit`}
            className="p-2 text-black hover:text-blue-600"
          >
            <HugeiconsIcon
              icon={Edit03Icon}
              className="ml-2 h-5 w-5"
              aria-hidden="true"
            />
            <span className="sr-only">Edit {lead.name}</span>
          </Link>

          <DeleteLead id={lead.id} role={role} />
        </div>
      );
    },
  },
];
