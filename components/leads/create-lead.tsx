"use client";

import Link from "next/link";
import { createLead, LeadState } from "@/lib/actions";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GuardedButton } from "../ui/guarded-button";

export default function CreateLeadForm({ role }: { role: "OWNER" | "VIEWER" }) {
  const initialState: LeadState = {
    message: null,
    errors: {},
  };
  const [state, formAction] = useActionState(createLead, initialState);

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
                placeholder="Pedro Duarte"
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="peduarte@acme.com"
              />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                  state.errors.email.map((error: string) => (
                    <p className="text-xs text-red-600" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            <Field>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Acme"
              />
              <div id="company-error" aria-live="polite" aria-atomic="true">
                {state.errors?.company &&
                  state.errors.company.map((error: string) => (
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
              <Link href="/dashboard/leads">Cancel</Link>
            </Button>

            <GuardedButton role={role} requiredRole="OWNER">
              Save
            </GuardedButton>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
