"use client";

import { useState } from "react";

import { GuardedButton } from "../ui/guarded-button";


export function UpgradeButton({ userId, role }: { userId: string, role: "OWNER" | "VIEWER"    }) {
  const [redirecting, setRedirecting] = useState(false);

  const handleUpgrade = async () => {
    try {
      setRedirecting(true);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Upgrade error:", error);
    } 
  };

  return (
    <GuardedButton onClick={handleUpgrade} role={role} requiredRole="OWNER">
      {redirecting ? "Redirecting..." : "Upgrade to Pro"}
    </GuardedButton>
  );
}

export function ManageBillingButton({role} : {role: "OWNER" | "VIEWER"  }) {
  const [redirecting, setRedirecting] = useState(false);


  const handleClick = async () => {
    try {
      setRedirecting(true)
      const res = await fetch("/api/stripe/portal", {
      method: "POST",
    });

    const data = await res.json();

    window.location.href = data.url;

    } catch (error) {
      console.error("Manage billing error:", error);
    } 
    
  };

  return (
    <GuardedButton
      onClick={handleClick}
      role={role} requiredRole="OWNER"
      
     
    >
      {redirecting ? "Redirecting..." : "Manage Billing"}
    </GuardedButton>
  );
}


