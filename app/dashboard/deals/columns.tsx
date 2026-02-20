"use client"
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table"
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpDownIcon, PencilEdit02Icon } from '@hugeicons/core-free-icons';

import { DeleteDeal } from "@/components/ui/delete-button";
 
import { Button } from "@/components/ui/button"


import { DealTableRaw} from "@/lib/definitions"




export const columns: ColumnDef<DealTableRaw>[] = [
  {
    accessorKey: "name",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <HugeiconsIcon icon={ArrowUpDownIcon} className="ml-2 h-4 w-4"/>
       
        </Button>
      )
    },
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
          <HugeiconsIcon icon={ArrowUpDownIcon} className="ml-2 h-4 w-4"/>
       
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
   {
    id: "actions",
    cell: ({ row, table }) => {
      const deal = row.original
      const role = table.options.meta?.role as "OWNER" | "VIEWER";

 
      return (
        <div className=" flex justify-between gap-2">
          <Link href={`/dashboard/deals/${deal.id}/edit`}>
            <HugeiconsIcon icon={PencilEdit02Icon} className="ml-2 h-4 w-4" />
          </Link>

          <DeleteDeal id={deal.id} role={role}/>
        </div>
      )
    },
  }
]