import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import { DEMO_MODE } from "./config";

export async function requireOwner() {
  const session = await verifySession();

  if (DEMO_MODE || session.user.role !== "OWNER") {
      redirect("/dashboard");  
    
  }

  return session;
}