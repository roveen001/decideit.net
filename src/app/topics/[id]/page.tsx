import { topics } from "@/lib/data";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import VoteChart from "@/components/VoteChart";
import VoteComponent from "@/components/VoteComponent";
import { format } from "date-fns";

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
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="space-y-4">
        <Badge variant="secondary" className="w-fit">{topic.category}</Badge>
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
          <VoteComponent topicId={topic.id} />
        </div>

        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold font-headline mb-4">Live Results</h2>
           <VoteChart data={topic.votes} />
        </div>
      </div>
    </div>
  );
}
