import { Vote } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto py-6 text-center">
        <Link href="/" className="flex items-center justify-center space-x-2 group" aria-label="Go to homepage">
          <Vote className="h-10 w-10 md:h-12 md:w-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
          <span className="text-4xl md:text-5xl font-bold font-headline select-none">
            <span className="text-destructive/30 group-hover:text-destructive/50 transition-colors">decide</span>
            <span className="text-green-600/30 group-hover:text-green-600/50 transition-colors">it</span>
          </span>
        </Link>
        <div className="text-muted-foreground text-xs mt-2">
          &copy; 2025 decideit.net
        </div>
      </div>
    </footer>
  );
}
