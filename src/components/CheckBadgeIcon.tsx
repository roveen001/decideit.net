import { cn } from "@/lib/utils";

export function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.44 16.5L6.5 12.56L7.91 11.15L10.44 13.68L16.09 8.02L17.5 9.43L10.44 16.5Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M10.44 16.5L6.5 12.56L7.91 11.15L10.44 13.68L16.09 8.02L17.5 9.43L10.44 16.5Z"
        fill="white"
      />
    </svg>
  );
}
