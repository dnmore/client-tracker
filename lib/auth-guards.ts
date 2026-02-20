import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export async function requireOwner() {
  const session = await verifySession();

  if (session.user.role !== "OWNER") {
      redirect("/dashboard");  
    
  }

  return session;
}