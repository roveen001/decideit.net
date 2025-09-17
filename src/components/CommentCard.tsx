import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import type { Comment } from "@/lib/types";

type CommentCardProps = {
    comment: Comment;
};

export default function CommentCard({ comment }: CommentCardProps) {
    const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 border">
                         <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{comment.author.name}</p>
                            <p className="text-xs text-muted-foreground">{timeAgo}</p>
                        </div>
                        <p className="mt-1 text-foreground/90">{comment.text}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
