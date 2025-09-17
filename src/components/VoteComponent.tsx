"use client";

import { castVote } from "@/lib/actions";
import { Button } from "./ui/button";
import { ThumbsDown, ThumbsUp, Ban } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Topic } from "@/lib/types";
import { useUser } from "@/hooks/useUser";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useTranslations } from "next-intl";


type VoteComponentProps = {
  topic: Topic;
};

export default function VoteComponent({ topic }: VoteComponentProps) {
  const t = useTranslations('VoteComponent');
  const [voted, setVoted] = useState<'for' | 'against' | null>(null);
  const { user } = useUser();

  const handleVote = async (voteType: 'for' | 'against') => {
    // In a real app, you might check if user is verified first.
    setVoted(voteType);
    await castVote(topic.id, voteType);
    // You could show a toast message here.
  };

  const isEligibleToVote = topic.scope === 'global' || (topic.scope === 'country' && user?.country === topic.country);

  if (!user?.isVerified) {
    return (
        <Alert>
            <Ban className="h-4 w-4" />
            <AlertTitle>{t('verificationRequiredTitle')}</AlertTitle>
            <AlertDescription>
                {t('verificationRequiredDescription')}
            </AlertDescription>
        </Alert>
    )
  }

  if (!isEligibleToVote) {
    return (
        <Alert>
            <Ban className="h-4 w-4" />
            <AlertTitle>{t('votingNotAllowedTitle')}</AlertTitle>
            <AlertDescription>
                {t('votingNotAllowedDescription', {country: topic.country})}
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-4">
          {t('anonymousVote')}
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
            <ThumbsUp className="mr-2 h-6 w-6" /> {t('for')}
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
            <ThumbsDown className="mr-2 h-6 w-6" /> {t('against')}
          </Button>
        </div>
        {voted && (
            <p className="mt-4 text-center text-sm font-medium text-primary">{t('thankYou')}</p>
        )}
      </CardContent>
    </Card>
  );
}
