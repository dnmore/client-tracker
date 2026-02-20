import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOut } from "../auth/auth-components";
import type { Session } from "next-auth";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";

type NavbarProps = {
  session: Session;
};

export async function Navbar({ session }: NavbarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-6">
      <div className="text-sm font-medium">Dashboard</div>
      <div className="flex items-center gap-2">
        <Badge variant="outline">
          {session.user?.role === "OWNER" ? <p>OWNER</p> : <p>VIEWER</p>}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`${session.user?.image}`}
                  alt={session.user.name ?? ""}
                />
                <AvatarFallback>
                  <HugeiconsIcon icon={UserIcon} />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>{session.user?.name}</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
