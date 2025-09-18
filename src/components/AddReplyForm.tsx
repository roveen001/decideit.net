"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addReply } from "@/lib/actions";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButton";
import { Button } from "./ui/button";
import { useUser } from "@/hooks/useUser";
import UserAvatar from "./UserAvatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ImageIcon, Send } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

const replySchema = z.object({
  reply: z.string().min(1, "Reply cannot be empty").max(500, "Reply cannot exceed 500 characters"),
  mediaUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type ReplyFormValues = z.infer<typeof replySchema>;

type AddReplyFormProps = {
    topicId: string;
    parentCommentId: string;
    onReplySuccess: () => void;
}

export default function AddReplyForm({ topicId, parentCommentId, onReplySuccess }: AddReplyFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
  });
  const { user } = useUser();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const onSubmit = async (data: ReplyFormValues) => {
    const formData = new FormData();
    formData.append("reply", data.reply);
    formData.append("topicId", topicId);
    formData.append("parentCommentId", parentCommentId);
    if (data.mediaUrl) {
        formData.append("mediaUrl", data.mediaUrl);
    }

    await addReply(formData);
    reset();
    setPopoverOpen(false);
    onReplySuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-4 pl-4">
        {user && <UserAvatar user={user} className="h-8 w-8 border mt-1" />}
        <div className="flex-1 space-y-2">
            <Textarea
                {...register("reply")}
                placeholder="Write a reply..."
                className="min-h-[60px]"
                rows={2}
            />
            {errors.reply && <p className="text-sm text-destructive">{errors.reply.message}</p>}
             <div className="flex justify-between items-center">
                 <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ImageIcon className="h-4 w-4 text-muted-foreground" />
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
                                    <Label htmlFor="mediaUrl-reply">Media URL</Label>
                                    <Input id="mediaUrl-reply" {...register("mediaUrl")} />
                                    {errors.mediaUrl && <p className="text-sm text-destructive">{errors.mediaUrl.message}</p>}
                                </div>
                                 <Button onClick={() => setPopoverOpen(false)}>Add Media</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => { reset(); onReplySuccess(); }}>Cancel</Button>
                    <SubmitButton size="sm">
                        <Send className="h-4 w-4 mr-2"/>
                        Reply
                    </SubmitButton>
                </div>
            </div>
        </div>
    </form>
  );
}
