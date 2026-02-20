import { DefaultSession } from "next-auth";
import { Role, Plan } from "@prisma/client";

declare module "next-auth" {

  interface User {
    role: Role;
    plan: Plan;
  }
  
  interface Session {
    user: {
      id: string;
      role: Role;
      plan: Plan;
    } & DefaultSession["user"];
  }

  
}
