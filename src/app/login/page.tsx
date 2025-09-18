import LoginForm from "@/components/LoginForm";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-sm px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-4">
          <LogIn className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">Sign In</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>

      <div className="mt-8">
        <LoginForm />
      </div>

      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          New to decideit?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
