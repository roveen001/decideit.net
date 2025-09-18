import ProfileForm from "@/components/ProfileForm";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-primary/10 rounded-full mb-4">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">My Profile</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          View and update your personal information and profile picture.
        </p>
      </div>

      <div className="mt-8">
        <ProfileForm />
      </div>
    </div>
  );
}
