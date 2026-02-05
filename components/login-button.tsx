"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <Button asChild className="w-full">
      <Link href="/dashboard">Sign in</Link>
    </Button>
  );
}
