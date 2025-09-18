"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import type { Comment } from "@/lib/types";
import AddReplyForm from "./AddReplyForm";

type CommentCardProps = {
  comment: Comment;
  topicId: string;
  isReply?: boolean;
};

export default function CommentCard({ comment, topicId, isReply = false }: CommentCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

  // Placeholder for vote handling
  const handleVote = (voteType: 'for' | 'against') => {
    console.log(`Voted ${voteType} on comment ${comment.id}`);
  };

  return (
    <div className="flex gap-4">
      {!isReply && (
         <Avatar className="h-10 w-10 border mt-1">
          <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint="person portrait" />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1">
        <Card className={isReply ? "bg-muted/50" : "bg-card"}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 {isReply && (
                    <Avatar className="h-6 w-6 border">
                        <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
                <p className="font-semibold">{comment.author.name}</p>
              </div>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
            <p className="mt-2 text-foreground/90">{comment.text}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <button
                onClick={() => handleVote('for')}
                className="flex items-center gap-1 hover:text-green-600 transition-colors"
              >
                <ThumbsUp className="h-4 w-4" /> {comment.votes.for}
              </button>
              <button
                onClick={() => handleVote('against')}
                className="flex items-center gap-1 hover:text-red-600 transition-colors"
              >
                <ThumbsDown className="h-4 w-4" /> {comment.votes.against}
              </button>
              {!isReply && (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <MessageSquare className="h-4 w-4" /> Reply
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {showReplyForm && (
          <div className="mt-4">
            <AddReplyForm
              topicId={topicId}
              parentCommentId={comment.id}
              onReplySuccess={() => setShowReplyForm(false)}
            />
          </div>
        )}
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-4 border-l-2">
            {comment.replies.map((reply) => (
              <CommentCard key={reply.id} comment={reply} topicId={topicId} isReply={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
