import type { Metadata } from "next";
import { verifySession } from "@/lib/dal";
import CreateLeadForm from "@/components/leads/create-lead";

export const metadata: Metadata = {
  title: 'Create Lead',
};

export default async function Page() {
  const session = await verifySession();
  return (
    <div className="pt-6">
      <h1 className="mb-2 text-xl md:text-2xl ml-1">Create Lead</h1>
      <div className="container py-10 max-w-lg">
        <CreateLeadForm role={session.user.role}/>
      </div>
    </div>
  );
}