"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FileCheck2, PlusCircle, ListCollapse, Vote, User as UserIcon, LogOut, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import UserAvatar from "./UserAvatar";

export default function Header() {
  const pathname = usePathname();
  const { user, signIn, signOut, isSignedIn } = useUser();
  
  const navLinks = [
    { href: "/topics/submit", label: "Submit Topic", icon: PlusCircle },
    { href: "/verify", label: "Verify Identity", icon: FileCheck2 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Vote className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">
            <span className="text-destructive">decide</span><span className="text-green-600">it</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname.endsWith(link.href) ? "text-primary" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  {user && <UserAvatar user={user} className="h-9 w-9" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center w-full">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/my-topics" className="flex items-center w-full">
                    <ListCollapse className="mr-2 h-4 w-4" />
                    <span>My Topics</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/verify" className="flex items-center w-full">
                    <FileCheck2 className="mr-2 h-4 w-4" />
                    <span>Verify Identity</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <div className="flex items-center w-full cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={signIn}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
