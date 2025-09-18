import { Vote } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto py-8 text-center">
        <Link href="/" className="flex items-center justify-center space-x-2 md:space-x-4 group" aria-label="Go to homepage">
          <Vote className="h-20 w-20 md:h-24 md:w-24 text-primary/30 group-hover:text-primary/50 transition-colors" />
          <span className="text-8xl md:text-9xl font-bold font-headline select-none">
            <span className="text-destructive/30 group-hover:text-destructive/50 transition-colors">decide</span>
            <span className="text-green-600/30 group-hover:text-green-600/50 transition-colors">it</span>
          </span>
        </Link>
        <div className="text-muted-foreground text-sm mt-4">
          &copy; 2025 decideit
        </div>
      </div>
    </footer>
  );
}
