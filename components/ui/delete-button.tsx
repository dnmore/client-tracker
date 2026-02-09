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

export function DeleteLead({ id }: { id: string }) {
  const deleteLeadWithId = deleteLead.bind(null, id);

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
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteLeadWithId}>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


export function DeleteDeal({ id }: { id: string }) {
  const deleteDealWithId = deleteDeal.bind(null, id);

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
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
          
           <form action={deleteDealWithId}>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
         </form>
        </AlertDialogFooter>
      </AlertDialogContent>
      
    </AlertDialog>
  );
}

