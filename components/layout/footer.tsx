import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-4 px-6   flex items-center flex-wrap gap-2">
      <p className="text-xs md:border-r pr-4">
        Track Clients, Deals, Revenue — All in One Place.
      </p>
      <Button variant="link" asChild>
        <Link href="https://github.com/dnmore/client-tracker" target="_blank" className="text-xs">
          View Source
        </Link>
      </Button>
    </footer>
  );
}
