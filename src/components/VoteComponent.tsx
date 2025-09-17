"use client";

import { castVote } from "@/lib/actions";
import { Button } from "./ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

type VoteComponentProps = {
  topicId: string;
};

export default function VoteComponent({ topicId }: VoteComponentProps) {
  const [voted, setVoted] = useState<'for' | 'against' | null>(null);

  const handleVote = async (voteType: 'for' | 'against') => {
    // In a real app, you might check if user is verified first.
    setVoted(voteType);
    await castVote(topicId, voteType);
    // You could show a toast message here.
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-4">
          Your vote is anonymous and final.
        </p>
        <div className="space-y-4">
          <Button
            className={cn(
                "w-full h-14 text-lg bg-green-100 text-green-800 hover:bg-green-200 border-2 border-transparent",
                voted === 'for' && 'border-green-600'
            )}
            variant="outline"
            onClick={() => handleVote('for')}
            disabled={!!voted}
          >
            <ThumbsUp className="mr-2 h-6 w-6" /> For
          </Button>
          <Button
            className={cn(
                "w-full h-14 text-lg bg-red-100 text-red-800 hover:bg-red-200 border-2 border-transparent",
                voted === 'against' && 'border-red-600'
            )}
            variant="outline"
            onClick={() => handleVote('against')}
            disabled={!!voted}
          >
            <ThumbsDown className="mr-2 h-6 w-6" /> Against
          </Button>
        </div>
        {voted && (
            <p className="mt-4 text-center text-sm font-medium text-primary">Thank you for voting!</p>
        )}
      </CardContent>
    </Card>
  );
}
