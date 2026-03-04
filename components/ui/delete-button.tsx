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

export function DeleteLead({
  id,
  role,
}: {
  id: string;
  role: "OWNER" | "VIEWER";
}) {
  const deleteLeadWithId = deleteLead.bind(null, id);
  const isOwner = role === "OWNER";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label="Delete lead"
          className="p-2 rounded-md cursor-pointer hover:text-red-500"
        >
          <HugeiconsIcon icon={Trash} className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Delete lead</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Delete lead?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this lead. This action cannot be
            undone.
            {!isOwner && (
              <p
                className="mt-2 text-xs text-red-600"
                id="delete-permission-warning"
              >
                You have view-only access. Only Owners can delete leads.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteLeadWithId}>
            <AlertDialogAction
              type="submit"
              disabled={!isOwner}
              aria-describedby={
                !isOwner ? "delete-permission-warning" : undefined
              }
            >
              Continue
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteDeal({
  id,
  role,
}: {
  id: string;
  role: "OWNER" | "VIEWER";
}) {
  const deleteDealWithId = deleteDeal.bind(null, id);
  const isOwner = role === "OWNER";
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label="Delete deal"
          className="p-2 rounded-md cursor-pointer hover:text-red-500"
        >
          <HugeiconsIcon icon={Trash} className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Delete deal</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete deal?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this deal. This action cannot be
            undone.
            {!isOwner && (
              <p
                className="mt-2 text-xs text-red-600"
                id="delete-permission-warning"
              >
                You have view-only access. Only Owners can delete deals.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form action={deleteDealWithId}>
            <AlertDialogAction
              type="submit"
              disabled={!isOwner}
              aria-describedby={
                !isOwner ? "delete-permission-warning" : undefined
              }
            >
              Continue
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
