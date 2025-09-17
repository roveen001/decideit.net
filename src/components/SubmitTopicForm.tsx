"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitTopic } from "@/lib/actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmitButton } from "./SubmitButton";
import { useTranslations } from "next-intl";

const topicSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters long"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  category: z.string().min(1, "Please select a category"),
});

type TopicFormValues = z.infer<typeof topicSchema>;

export default function SubmitTopicForm() {
  const t = useTranslations('SubmitTopicForm');
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
  });

  const onSubmit = async (data: TopicFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);

    await submitTopic(formData);
    alert(t('submitSuccess'));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t('titleLabel')}</Label>
            <Input id="title" {...register("title")} placeholder={t('titlePlaceholder')} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">{t('categoryLabel')}</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('categoryPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Politics">{t('categories.politics')}</SelectItem>
                    <SelectItem value="Technology">{t('categories.technology')}</SelectItem>
                    <SelectItem value="Environment">{t('categories.environment')}</SelectItem>
                    <SelectItem value="Lifestyle">{t('categories.lifestyle')}</SelectItem>
                    <SelectItem value="Other">{t('categories.other')}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{t('descriptionLabel')}</Label>
            <Textarea id="description" {...register("description")} rows={5} placeholder={t('descriptionPlaceholder')} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton buttonText={t('submit')} />
        </CardFooter>
      </Card>
    </form>
  );
}
