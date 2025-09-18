import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TrendingTopics from "@/components/TrendingTopics";
import { Filter, Search, Users, Vote, Globe } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { topics } from "@/lib/data";

export default function Home() {
  const totalTopics = topics.length;
  // Placeholder for total users. In a real app, this would come from a database.
  const totalUsers = 12345;
  const totalCountries = new Set(topics.filter(t => t.country).map(t => t.country)).size;


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
          <span className="text-destructive">decide</span><span className="text-green-600">it</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
          The people's voice, verified. Participate in polls that matter, with the assurance of one person, one vote.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#trending">Explore Topics</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/verify">Get Verified</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 bg-muted/20 rounded-lg">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-card rounded-xl shadow-md transition-shadow hover:shadow-lg">
                <Users className="mx-auto h-10 w-10 text-primary mb-3" />
                <h3 className="text-4xl font-bold font-headline">{totalUsers.toLocaleString()}</h3>
                <p className="mt-2 text-muted-foreground">Registered Users</p>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-md transition-shadow hover:shadow-lg">
                <Vote className="mx-auto h-10 w-10 text-primary mb-3" />
                <h3 className="text-4xl font-bold font-headline">{totalTopics}</h3>
                <p className="mt-2 text-muted-foreground">Active Topics</p>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-md transition-shadow hover:shadow-lg">
                <Globe className="mx-auto h-10 w-10 text-primary mb-3" />
                <h3 className="text-4xl font-bold font-headline">{totalCountries}</h3>
                <p className="mt-2 text-muted-foreground">Countries Represented</p>
            </div>
          </div>
        </div>
      </section>

      <section id="trending" className="py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold font-headline">Trending Topics</h2>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search topics..." className="pl-10" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Suspense fallback={<p>Loading topics...</p>}>
          <TrendingTopics />
        </Suspense>
      </section>
    </div>
  );
}
