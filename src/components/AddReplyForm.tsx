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

const replySchema = z.object({
  reply: z.string().min(1, "Reply cannot be empty").max(500, "Reply cannot exceed 500 characters"),
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

  const onSubmit = async (data: ReplyFormValues) => {
    const formData = new FormData();
    formData.append("reply", data.reply);
    formData.append("topicId", topicId);
    formData.append("parentCommentId", parentCommentId);

    await addReply(formData);
    reset();
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
             <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => { reset(); onReplySuccess(); }}>Cancel</Button>
                <SubmitButton buttonText="Post Reply" size="sm" />
            </div>
        </div>
    </form>
  );
}
