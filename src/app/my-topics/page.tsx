"use client";

import MyTopicCard from "@/components/MyTopicCard";
import { topics } from "@/lib/data";
import { useUser } from "@/hooks/useUser";
import { ListCollapse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyTopicsPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12 text-center">
        <h1 className="text-2xl font-bold">Please sign in</h1>
        <p className="text-muted-foreground mt-2">You need to be signed in to view your topics.</p>
         <Button asChild className="mt-4">
            <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }
  
  const userTopics = topics.filter((topic) => topic.author.id === user?.id);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="flex items-center gap-3 mb-8">
        <ListCollapse className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">My Topics</h1>
      </div>

      {userTopics.length > 0 ? (
        <div className="space-y-6">
          {userTopics.map((topic) => (
            <MyTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">No topics created yet.</h2>
          <p className="text-muted-foreground mt-2">
            Why not share something with the community?
          </p>
        </div>
      )}
    </div>
  );
}
