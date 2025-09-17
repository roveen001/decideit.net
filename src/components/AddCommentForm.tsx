"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addComment } from "@/lib/actions";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButton";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";

const commentSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty").max(500, "Comment cannot exceed 500 characters"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

type AddCommentFormProps = {
    topicId: string;
}

export default function AddCommentForm({ topicId }: AddCommentFormProps) {
  const t = useTranslations('AddCommentForm');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentFormValues) => {
    const formData = new FormData();
    formData.append("comment", data.comment);
    formData.append("topicId", topicId);

    // In a real app, you would handle the response and show a toast
    await addComment(formData);
    reset();
  };

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border mt-1">
                <AvatarImage src="https://picsum.photos/seed/user-profile/40/40" alt="@user" />
                <AvatarFallback>
                    <User />
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
                <Textarea
                    {...register("comment")}
                    placeholder={t('placeholder')}
                    className="min-h-[60px]"
                />
                {errors.comment && <p className="text-sm text-destructive">{errors.comment.message}</p>}
                 <div className="flex justify-end">
                    <SubmitButton buttonText={t('submit')} size="sm" />
                </div>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
