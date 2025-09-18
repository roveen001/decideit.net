import type { Topic } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, Users, Scale } from "lucide-react";
import { Separator } from "./ui/separator";

type ResultsAnalysisProps = {
  topic: Topic;
};

export default function ResultsAnalysis({ topic }: ResultsAnalysisProps) {
  const { votes, title } = topic;
  const totalVotes = votes.for + votes.against;
  const forPercentage = totalVotes > 0 ? ((votes.for / totalVotes) * 100).toFixed(1) : "0.0";
  const againstPercentage = totalVotes > 0 ? ((votes.against / totalVotes) * 100).toFixed(1) : "0.0";
  const margin = Math.abs(votes.for - votes.against);
  const marginPercentage = totalVotes > 0 ? ((margin / totalVotes) * 100).toFixed(1) : "0.0";
  const leadingSide = votes.for > votes.against ? "For" : "Against";

  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Results Analysis: {title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-base">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-card rounded-lg shadow">
                <Users className="mx-auto h-8 w-8 text-primary mb-2" />
                <p className="text-2xl font-bold">{totalVotes.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Votes</p>
            </div>
             <div className="p-4 bg-card rounded-lg shadow">
                <TrendingUp className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <p className="text-2xl font-bold">{forPercentage}%</p>
                <p className="text-sm text-muted-foreground">For ({votes.for.toLocaleString()})</p>
            </div>
             <div className="p-4 bg-card rounded-lg shadow">
                <TrendingDown className="mx-auto h-8 w-8 text-red-600 mb-2" />
                <p className="text-2xl font-bold">{againstPercentage}%</p>
                <p className="text-sm text-muted-foreground">Against ({votes.against.toLocaleString()})</p>
            </div>
             <div className="p-4 bg-card rounded-lg shadow">
                <Scale className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-2xl font-bold">{marginPercentage}%</p>
                <p className="text-sm text-muted-foreground">Winning Margin</p>
            </div>
        </div>

        <Separator />

        <div className="prose prose-sm max-w-none text-foreground/90">
            <p>
                The poll on "<strong>{title}</strong>" has garnered significant engagement, with a total of <strong>{totalVotes.toLocaleString()}</strong> verified participants casting their votes.
                The results indicate a compelling division of opinion within the community.
            </p>
            <p>
                The "<strong>For</strong>" stance is currently leading with <strong>{forPercentage}%</strong> of the vote, which accounts for <strong>{votes.for.toLocaleString()}</strong> individual votes. On the other side, the "<strong>Against</strong>" position has secured <strong>{againstPercentage}%</strong> of the vote, totaling <strong>{votes.against.toLocaleString()}</strong> votes.
            </p>
            <p>
                This places the <strong>{leadingSide}</strong> side in the lead by a margin of <strong>{margin.toLocaleString()}</strong> votes, representing a <strong>{marginPercentage}%</strong> difference. The outcome suggests a {parseFloat(marginPercentage) > 10 ? 'clear preference' : 'closely contested issue'} among the voters. As the discussion continues, these numbers reflect the current sentiment of the verified electorate on this important topic.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
