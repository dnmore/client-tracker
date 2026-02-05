export type Lead = {
  id: string
  name: string
  email: string
  company: string
  createdAt: Date
  
  
}


export type Deal = {
  id: string
  name: string
  leadId: string
  amount: number
  stage: string
   createdAt: Date
  
  
}

export type LeadTableRaw = Omit<Lead, "createdAt"> 

export type LeadSelectOption = Omit<Lead, "email" | "company" | "createdAt">
export type DealTableRaw = Omit<Deal, "leadId" | "createdAt"> & {
  company: string
};

export const DEAL_STAGES = [
  "NEW",
  "QUALIFIED",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;

  
