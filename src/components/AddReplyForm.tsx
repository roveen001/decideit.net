"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addReply } from "@/lib/actions";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

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
  const t = useTranslations('AddReplyForm');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
  });

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
        <Avatar className="h-8 w-8 border mt-1">
            <AvatarImage src="https://picsum.photos/seed/user-profile/40/40" alt="@user" />
            <AvatarFallback>
                <User />
            </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
            <Textarea
                {...register("reply")}
                placeholder={t('placeholder')}
                className="min-h-[60px]"
                rows={2}
            />
            {errors.reply && <p className="text-sm text-destructive">{errors.reply.message}</p>}
             <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => { reset(); onReplySuccess(); }}>{t('cancel')}</Button>
                <SubmitButton buttonText={t('submit')} size="sm" />
            </div>
        </div>
    </form>
  );
}
