import { topics } from "@/lib/data";
import TopicCard from "./TopicCard";

export default function TrendingTopics() {
  // Sort topics by total votes to simulate "trending"
  const trendingTopics = [...topics].sort(
    (a, b) => (b.votes.for + b.votes.against) - (a.votes.for + a.votes.against)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trendingTopics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
