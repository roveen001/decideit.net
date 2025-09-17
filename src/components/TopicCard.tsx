import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ThumbsDown, ThumbsUp, MessageSquare } from "lucide-react";
import type { Topic } from "@/lib/types";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type TopicCardProps = {
  topic: Topic;
};

export default function TopicCard({ topic }: TopicCardProps) {
  const totalVotes = topic.votes.for + topic.votes.against;
  const timeAgo = formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true });

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-snug">
            <Link href={`/topics/${topic.id}`} className="hover:text-primary transition-colors">
              {topic.title}
            </Link>
          </CardTitle>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Badge variant="secondary">{topic.category}</Badge>
          <span>·</span>
          <span>{timeAgo}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {topic.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage src={topic.author.avatarUrl} alt={topic.author.name} data-ai-hint="person portrait" />
            <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{topic.author.name}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-green-600">
            <ThumbsUp className="h-4 w-4" /> {topic.votes.for}
          </span>
          <span className="flex items-center gap-1.5 text-red-600">
            <ThumbsDown className="h-4 w-4" /> {topic.votes.against}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
             <MessageSquare className="h-4 w-4" /> {totalVotes}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
