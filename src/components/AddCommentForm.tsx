"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addComment } from "@/lib/actions";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButton";
import { Card, CardContent } from "./ui/card";
import { useUser } from "@/hooks/useUser";
import UserAvatar from "./UserAvatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ImageIcon, Send } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

const commentSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty").max(500, "Comment cannot exceed 500 characters"),
  mediaUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type CommentFormValues = z.infer<typeof commentSchema>;

type AddCommentFormProps = {
    topicId: string;
}

export default function AddCommentForm({ topicId }: AddCommentFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });
  const { user } = useUser();
  const [popoverOpen, setPopoverOpen] = useState(false);


  const onSubmit = async (data: CommentFormValues) => {
    const formData = new FormData();
    formData.append("comment", data.comment);
    formData.append("topicId", topicId);
    if (data.mediaUrl) {
        formData.append("mediaUrl", data.mediaUrl);
    }

    // In a real app, you would handle the response and show a toast
    await addComment(formData);
    reset();
    setPopoverOpen(false);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-4">
            {user && <UserAvatar user={user} className="h-10 w-10 border mt-1" />}
            <div className="flex-1 space-y-2">
                <Textarea
                    {...register("comment")}
                    placeholder="Add your comment..."
                    className="min-h-[60px]"
                />
                {errors.comment && <p className="text-sm text-destructive">{errors.comment.message}</p>}
                <div className="flex justify-between items-center">
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Add Media</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Paste a URL to an image or GIF.
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="mediaUrl">Media URL</Label>
                                    <Input id="mediaUrl" {...register("mediaUrl")} />
                                    {errors.mediaUrl && <p className="text-sm text-destructive">{errors.mediaUrl.message}</p>}
                                </div>
                                <Button onClick={() => setPopoverOpen(false)}>Add Media</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <SubmitButton>
                        <Send className="h-4 w-4 mr-2"/>
                        Post
                    </SubmitButton>
                </div>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
