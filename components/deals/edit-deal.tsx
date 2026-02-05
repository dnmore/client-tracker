"use client";

import Link from "next/link";
import { updateDeal, DealState } from "@/lib/actions";
import { Deal } from "@/lib/definitions";
import { useActionState, useState } from "react";

import { DEAL_STAGES, LeadSelectOption } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditDealForm({deal, leadsOptions}: {deal: Deal, leadsOptions: LeadSelectOption[]}) {
  const initialState: DealState = {
    message: null,
    errors: {},
  };
 
  const [state, formAction] = useActionState(
      (prevState: DealState, formData: FormData) =>
        updateDeal(deal.id, formData, prevState),
      initialState,
    );
  


  

 const [stage, setStage] = useState<string | undefined>();
 const [leadId, setLeadId] = useState<string | undefined>();

  return (
    <Card>
      <CardContent>
        <form action={formAction}>
          <FieldGroup className="my-4">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={deal.name}
              />
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="text-xs text-red-600" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" name="amount" type="text" defaultValue={deal.amount} />
              <div id="amount-error" aria-live="polite" aria-atomic="true">
                {state.errors?.amount &&
                  state.errors.amount.map((error: string) => (
                    <p className="text-xs text-red-600" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            <Field>
              <Label htmlFor="stage">Stage</Label>
               <input type="hidden" name="stage" value={stage} defaultValue={deal.stage} />
              <Select onValueChange={setStage} defaultValue={deal.stage}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Stages</SelectLabel>
                    {DEAL_STAGES.map((stage) => (<SelectItem key={stage} value={stage}>{stage}</SelectItem>))}
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div id="stage-error" aria-live="polite" aria-atomic="true">
                {state.errors?.stage &&
                  state.errors.stage.map((error: string) => (
                    <p className="text-xs text-red-600" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            <Field>
              <Label htmlFor="lead">Lead</Label>
              <input type="hidden" name="leadId" value={leadId}  defaultValue={deal.leadId}/>
              <Select onValueChange={setLeadId} defaultValue={deal.leadId}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select Lead" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Leads</SelectLabel>
                    {leadsOptions.map((lead) => (<SelectItem key={lead.id} value={lead.id}>{lead.name}</SelectItem>))}
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div id="lead-error" aria-live="polite" aria-atomic="true">
                {state.errors?.leadId &&
                  state.errors.leadId.map((error: string) => (
                    <p className="text-xs text-red-600" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
          </FieldGroup>
          <div id="form-error" aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="text-xs text-red-600" key={state.message}>
                {state.message}
              </p>
            )}
          </div>
          <CardFooter className="mt-6 flex justify-end gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/deals">Cancel</Link>
            </Button>

            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
