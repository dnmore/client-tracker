import { deleteLead, deleteDeal } from "@/lib/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { Trash } from "@hugeicons/core-free-icons";

export function DeleteLead({ id, role }: { id: string; role: "OWNER" | "VIEWER" }) {
  const deleteLeadWithId = deleteLead.bind(null, id);
  const isOwner = role === "OWNER";

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm px-2 cursor-pointer hover:text-red-500">
        <HugeiconsIcon icon={Trash} className="ml-2 h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            entry.
            {!isOwner && (
              <p className="mt-2 text-xs text-red-600">
                You have view-only access. Only Owners can delete leads.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteLeadWithId}>
            <AlertDialogAction type="submit" disabled={!isOwner}>Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


export function DeleteDeal({ id, role }: { id: string, role: "OWNER" | "VIEWER" }) {
  const deleteDealWithId = deleteDeal.bind(null, id);
const isOwner = role === "OWNER";
  return (
    <AlertDialog >
     
      <AlertDialogTrigger className="text-sm px-2 cursor-pointer hover:text-red-500">
        <HugeiconsIcon icon={Trash} className="ml-2 h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            entry.
             {!isOwner && (
              <p className="mt-2 text-xs text-red-600">
                You have view-only access. Only Owners can delete deals.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
          
           <form action={deleteDealWithId}>
            <AlertDialogAction type="submit" disabled={!isOwner}>Continue</AlertDialogAction>
         </form>
        </AlertDialogFooter>
      </AlertDialogContent>
      
    </AlertDialog>
  );
}

