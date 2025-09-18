
import type { Topic } from "@/lib/types";
import TopicCard from "./TopicCard";

type TrendingTopicsProps = {
    topics: Topic[];
}

export default function TrendingTopics({ topics }: TrendingTopicsProps) {
  if (topics.length === 0) {
    return (
        <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">No topics found.</h2>
            <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter.
            </p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
