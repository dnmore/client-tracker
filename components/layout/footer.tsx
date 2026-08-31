import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t py-4 px-6 flex items-center flex-wrap gap-2 text-muted-foreground">
      <p className="text-xs md:border-r px-4">
        Track Clients, Deals, Revenue — All in One Place.
      </p>
      
        <Link href="https://github.com/dnmore/client-tracker" target="_blank" className="text-xs hover:border-b">
          View Source
        </Link>
      
    </footer>
  );
}
