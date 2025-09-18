import type { Topic } from "@/lib/types";
import {
  Heart,
  X,
  MessageSquare,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
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
import { cn } from "@/lib/utils";

type MyTopicCardProps = {
  topic: Topic;
};

export default function MyTopicCard({ topic }: MyTopicCardProps) {
  const statusConfig = {
    Approved: {
      label: "Approved",
      icon: CheckCircle2,
      className: "bg-green-100 text-green-800",
    },
    Pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-amber-100 text-amber-800",
    },
    Rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "bg-red-100 text-red-800",
    },
  };
  const currentStatus = statusConfig[topic.status];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>
            <Link href={`/topics/${topic.id}`} className="hover:text-primary transition-colors">
              {topic.title}
            </Link>
          </CardTitle>
          <Badge className={cn("flex items-center gap-1.5", currentStatus.className)}>
            <currentStatus.icon className="h-4 w-4" />
            <span>{currentStatus.label}</span>
          </Badge>
        </div>
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
            <Heart className="h-4 w-4" /> {topic.votes.for} Loves
          </span>
          <span className="flex items-center gap-1.5 text-red-600 font-medium">
            <X className="h-4 w-4" /> {topic.votes.against}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <MessageSquare className="h-4 w-4" /> {topic.comments.length}{" "}
            Comments
          </span>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <Button variant="outline" size="sm" disabled={topic.status !== 'Approved'}>
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
