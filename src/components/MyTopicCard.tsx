import type { Topic } from "@/lib/types";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Separator } from "./ui/separator";

type MyTopicCardProps = {
  topic: Topic;
};

export default function MyTopicCard({ topic }: MyTopicCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/topics/${topic.id}`} className="hover:text-primary transition-colors">
            {topic.title}
          </Link>
        </CardTitle>
        <CardDescription>
          Posted on {new Date(topic.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {topic.description}
        </p>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-6 text-sm">
          <span className="flex items-center gap-1.5 text-green-600 font-medium">
            <ThumbsUp className="h-4 w-4" /> {topic.votes.for} Likes
          </span>
          <span className="flex items-center gap-1.5 text-red-600 font-medium">
            <ThumbsDown className="h-4 w-4" /> {topic.votes.against} Dislikes
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <MessageSquare className="h-4 w-4" /> {topic.comments.length}{" "}
            Comments
          </span>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
