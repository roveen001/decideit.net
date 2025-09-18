import { topics } from "@/lib/data";
import { User, Topic } from "@/lib/types";
import { notFound } from "next/navigation";
import UserAvatar from "@/components/UserAvatar";
import TopicCard from "@/components/TopicCard";
import { CheckBadgeIcon } from "@/components/CheckBadgeIcon";

type UserProfilePageProps = {
  params: {
    id: string;
  };
};

function getAllUsersFromTopics(topics: Topic[]): User[] {
    const users = new Map<string, User>();
    topics.forEach(topic => {
        if (!users.has(topic.author.id)) {
            users.set(topic.author.id, topic.author);
        }
        topic.comments.forEach(comment => {
            if (!users.has(comment.author.id)) {
                users.set(comment.author.id, comment.author);
            }
            if (comment.replies) {
                comment.replies.forEach(reply => {
                    if (!users.has(reply.author.id)) {
                        users.set(reply.author.id, reply.author);
                    }
                });
            }
        });
    });
    return Array.from(users.values());
}


export async function generateStaticParams() {
    const users = getAllUsersFromTopics(topics);
    return users.map((user) => ({
        id: user.id,
    }));
}


export default function UserProfilePage({ params }: UserProfilePageProps) {
  const users = getAllUsersFromTopics(topics);
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  const userTopics = topics.filter((topic) => topic.author.id === user.id);
  const totalTopicsCreated = userTopics.length;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
        <UserAvatar user={user} className="h-32 w-32 border-4" />
        <div className="text-center sm:text-left pt-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
                 <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
                 {user.isVerified && <CheckBadgeIcon className="w-8 h-8" />}
            </div>
            <p className="mt-2 text-lg text-muted-foreground">
                {totalTopicsCreated} topic{totalTopicsCreated !== 1 ? 's' : ''} created
            </p>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-6">Topics by {user.name}</h2>
        {userTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">{user.name} has not created any topics yet.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
