import SubmitTopicForm from "@/components/SubmitTopicForm";
import { PlusCircle } from "lucide-react";

export default function SubmitTopicPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-4">
          <PlusCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">Submit a New Topic</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Have an idea for a poll? Share it with the community. Once approved, verified users can start voting.
        </p>
      </div>

      <div className="mt-8">
        <SubmitTopicForm />
      </div>
    </div>
  );
}
