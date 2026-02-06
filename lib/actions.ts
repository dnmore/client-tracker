"use server";

import prisma from "@/lib/prisma";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(3, "Name is required").max(50),
  email: z.email("Invalid email address"),
  company: z.string().min(3, "Company is required").max(50),
});

const stageEnum = ["NEW", "QUALIFIED", "PROPOSAL", "WON", "LOST"] as const;

const DealSchema = z.object({
  name: z.string().min(3, "Name is required").max(50),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than 0." }),
  stage: z.enum(stageEnum),
  leadId: z.string().min(1, "Lead is required"),
});

export type LeadState = {
  errors?: {
    name?: string[];
    email?: string[];
    company?: string[];
  };
  message?: string | null;
};

export type DealState = {
  errors?: {
    name?: string[];
    amount?: string[];
    stage?: string[];
    leadId?: string[];
  };
  message?: string | null;
};

export async function createLead(prevState: LeadState, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
  };

  const validatedFields = LeadSchema.safeParse(rawData);
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    return {
      errors: {
        name: tree.properties?.name?.errors,
        email: tree.properties?.email?.errors,
        company: tree.properties?.company?.errors,
      },
      message: "Missing or Invalid Fields. Failed to Create Lead.",
    };
  }
  const { name, email, company } = validatedFields.data;

  await prisma.lead.create({
    data: {
      name: name,
      email: email,
      company: company,
    },
  });
 
  revalidateTag("leads", 'max');
revalidateTag("dashboard", 'max');
  redirect("/dashboard/leads");
}

export async function createDeal(prevState: DealState, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    amount: formData.get("amount"),
    stage: formData.get("stage"),
    leadId: formData.get("leadId"),
  };

  const validatedFields = DealSchema.safeParse(rawData);
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    return {
      errors: {
        name: tree.properties?.name?.errors,
        amount: tree.properties?.amount?.errors,
        stage: tree.properties?.stage?.errors,
        leadId: tree.properties?.leadId?.errors,
      },
      message: "Missing or Invalid Fields. Failed to Create Deal.",
    };
  }
  const { name, amount, stage, leadId } = validatedFields.data;

  await prisma.deal.create({
    data: {
      name: name,
      amount: amount,
      stage: stage,
      lead: {
        connect: { id: leadId },
      },
    },
  });
 
   revalidateTag("deals", 'max');
revalidateTag("dashboard", 'max');
  redirect("/dashboard/deals");
}


export async function deleteLead(leadId: string) {
  await prisma.lead.delete({
    where: { id: leadId },
  });
 
   revalidateTag("leads", 'max');
revalidateTag("dashboard", 'max');
  redirect("/dashboard/leads");
}

export async function deleteDeal(dealId: string) {
  await prisma.deal.delete({
    where: { id: dealId },
  });
  
   revalidateTag("deals", 'max');
revalidateTag("dashboard", 'max');
  redirect("/dashboard/deals");
}
export async function updateLead(leadId: string, formData: FormData, prevState: LeadState) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
  };

  const validatedFields = LeadSchema.safeParse(rawData);
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    return {
      errors: {
        name: tree.properties?.name?.errors,
        email: tree.properties?.email?.errors,
        company: tree.properties?.company?.errors,
      },
      message: "Missing or Invalid Fields. Failed to Update Lead.",
    };
  }
  const { name, email, company } = validatedFields.data;

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      name: name,
      email: email,
      company: company,
    },
  });
 
   revalidateTag("leads", 'max');
revalidateTag("dashboard", 'max');
  redirect("/dashboard/leads");
}

export async function updateDeal(dealId: string, formData: FormData, prevState: LeadState) {
   const rawData = {
    name: formData.get("name"),
    amount: formData.get("amount"),
    stage: formData.get("stage"),
    leadId: formData.get("leadId"),
  };

  const validatedFields = DealSchema.safeParse(rawData);
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    return {
      errors: {
        name: tree.properties?.name?.errors,
        amount: tree.properties?.amount?.errors,
        stage: tree.properties?.stage?.errors,
        leadId: tree.properties?.leadId?.errors,
      },
      message: "Missing or Invalid Fields. Failed to Create Deal.",
    };
  }
  const { name, amount, stage, leadId } = validatedFields.data;

  await prisma.deal.update({
     where: { id: dealId },
    data: {
      name: name,
      amount: amount,
      stage: stage,
      lead: {
        connect: { id: leadId },
      },
    },
  });
 
   revalidateTag("deals", 'max');
revalidateTag("dashboard", 'max');
  redirect("/dashboard/deals");
}