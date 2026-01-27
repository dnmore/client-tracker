import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginButton } from "@/components/login-button";

export default function Page() {
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
          <LoginButton />
        </CardContent>
      </Card>
    </main>
  );
}