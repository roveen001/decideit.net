
"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Linkedin, Copy, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Topic } from "@/lib/types";

type ShareTopicProps = {
  topic: Topic;
};

export default function ShareTopic({ topic }: ShareTopicProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const shareText = `Vote on this topic: "${topic.title}" on decideit.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share the link.",
    });
  };
  
  const handleInstagramShare = () => {
    navigator.clipboard.writeText(url);
    toast({
        title: "Link Copied!",
        description: "Paste the link in your Instagram story or bio.",
    });
  }

  const socialLinks = [
    {
      name: "X",
      icon: Twitter,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`, '_blank'),
    },
    {
      name: "Facebook",
      icon: Facebook,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(topic.title)}&summary=${encodeURIComponent(shareText)}`, '_blank'),
    },
    {
        name: "Instagram",
        icon: Instagram,
        action: handleInstagramShare
    }
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-primary-foreground">
          <Share2 className="mr-2 h-4 w-4" />
          Share this Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Share on Social Media</h4>
            <p className="text-sm text-muted-foreground">
              Spread the word and get more people to vote.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="icon"
                onClick={social.action}
              >
                <social.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <input
                    id="link"
                    defaultValue={url}
                    readOnly
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <Button type="button" size="icon" className="px-3" onClick={copyToClipboard}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
