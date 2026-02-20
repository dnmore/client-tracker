
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {SignIn} from "@/components/auth/auth-components";

export default async function Page() {

  
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-extrabold">
            Nexus 
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Sign in to access your dashboard
          </p>
          <div className="flex flex-col justify-center items-center gap-2">
            <Suspense fallback={<Button disabled>Loading...</Button>} >
           <SignIn provider="github" />
          </Suspense>
       <Suspense fallback={<Button disabled>Loading...</Button>} >
           <SignIn provider="google" />
          </Suspense>
          </div>
          
        </CardContent>
      </Card>
    </main>
  );
}