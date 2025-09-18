import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ThumbsDown, ThumbsUp, MessageSquare, Globe } from "lucide-react";
import type { Topic } from "@/lib/types";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import CountryFlag from "./CountryFlag";
import UserAvatar from "./UserAvatar";

type TopicCardProps = {
  topic: Topic;
};

export default function TopicCard({ topic }: TopicCardProps) {
  const timeAgo = formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true });

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{topic.category}</Badge>
            {topic.scope === 'country' && topic.country ? (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <CountryFlag countryCode={topic.country} />
                    <span>{topic.country} Poll</span>
                </div>
            ) : (
                <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Globe className="w-3 h-3"/>
                    <span>Global Poll</span>
                </div>
            )}
        </div>
        <CardTitle className="text-lg leading-snug pt-1">
          <Link href={`/topics/${topic.id}`} className="hover:text-primary transition-colors">
            {topic.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1 text-xs">
          <span>{timeAgo}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {topic.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link href={`/users/${topic.author.id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <UserAvatar user={topic.author} className="h-6 w-6" />
          <span>{topic.author.name}</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-green-600">
            <ThumbsUp className="h-4 w-4" /> {topic.votes.for}
          </span>
          <span className="flex items-center gap-1.5 text-red-600">
            <ThumbsDown className="h-4 w-4" /> {topic.votes.against}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
             <MessageSquare className="h-4 w-4" /> {topic.comments.length}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
