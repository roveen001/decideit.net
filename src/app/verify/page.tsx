import VerificationForm from "@/components/VerificationForm";
import { FileCheck2 } from "lucide-react";

export default function VerifyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-4">
          <FileCheck2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">Verify Your Identity</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          To ensure fairness and security, we require identity verification. Please provide the following information and a photo of a valid government-issued ID.
        </p>
      </div>

      <div className="mt-8">
        <VerificationForm />
      </div>
    </div>
  );
}
