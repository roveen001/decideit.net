import RegisterForm from "@/components/RegisterForm";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="container mx-auto max-w-sm px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-4">
          <UserPlus className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">Create Account</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Join the community and make your voice heard.
        </p>
      </div>

      <div className="mt-8">
        <RegisterForm />
      </div>

       <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
