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

const topicSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters long"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  category: z.string().min(1, "Please select a category"),
});

type TopicFormValues = z.infer<typeof topicSchema>;

export default function SubmitTopicForm() {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
  });

  const onSubmit = async (data: TopicFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);

    // This would typically show a toast on success/error
    await submitTopic(formData);
    alert("Topic submitted for review!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Topic Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Politics">Politics</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Environment">Environment</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} rows={5} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton buttonText="Submit Topic" />
        </CardFooter>
      </Card>
    </form>
  );
}
