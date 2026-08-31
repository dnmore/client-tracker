import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t py-4 px-6 flex items-center flex-wrap gap-2 text-muted-foreground justify-between text-xs">
      <p>
        Track Clients, Deals, Revenue — All in One Place.
      </p>
      
        <Link href="https://github.com/dnmore/client-tracker" target="_blank" className="hover:underline">
          View Source
        </Link>
      
    </footer>
  );
}
