import { topics } from "@/lib/data";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import VoteChart from "@/components/VoteChart";
import VoteComponent from "@/components/VoteComponent";
import { format } from "date-fns";
import CommentCard from "@/components/CommentCard";
import { MessageSquare, Globe } from "lucide-react";
import AddCommentForm from "@/components/AddCommentForm";
import CountryFlag from "@/components/CountryFlag";
import ResultsAnalysis from "@/components/ResultsAnalysis";
import { Separator } from "@/components/ui/separator";

type TopicPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return topics.map((topic) => ({
    id: topic.id,
  }));
}

export default function TopicPage({ params }: TopicPageProps) {
  const topic = topics.find((t) => t.id === params.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="w-fit">{topic.category}</Badge>
              {topic.scope === 'country' && topic.country ? (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                  <CountryFlag countryCode={topic.country} className="w-5 h-auto rounded-sm" />
                  <span>{topic.country} Poll</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
                  <Globe className="w-4 h-4"/>
                  <span>Global Poll</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline leading-tight">
              {topic.title}
            </h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={topic.author.avatarUrl} alt={topic.author.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{topic.author.name}</span>
              </div>
              <span>•</span>
              <time dateTime={topic.createdAt}>
                {format(new Date(topic.createdAt), "MMMM d, yyyy")}
              </time>
            </div>
          </div>

          <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
            {topic.description}
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold font-headline mb-4">Cast Your Vote</h2>
              <VoteComponent topic={topic} />
            </div>
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold font-headline mb-4">Live Results</h2>
              <VoteChart data={topic.votes} />
            </div>
          </div>

          <section className="mt-16">
            <ResultsAnalysis topic={topic} />
          </section>
        </div>

        {/* Comments Sidebar */}
        <div className="lg:col-span-2 mt-12 lg:mt-0 lg:pl-8 lg:border-l">
            <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="h-6 w-6 text-primary"/>
                    <h2 className="text-2xl font-bold font-headline">
                        Comments ({topic.comments.length})
                    </h2>
                </div>
                
                <div className="mb-8">
                    <AddCommentForm topicId={topic.id} />
                </div>

                <div className="space-y-6 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
                  {topic.comments.length > 0 ? (
                    topic.comments.map((comment) => (
                      <CommentCard key={comment.id} comment={comment} topicId={topic.id} />
                    ))
                  ) : (
                    <div className="text-center py-8 px-4 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
