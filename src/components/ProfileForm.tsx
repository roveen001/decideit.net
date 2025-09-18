"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { SubmitButton } from "./SubmitButton";
import UserAvatar from "./UserAvatar";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.any()
    .optional()
    .refine((files) => !files || files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .refine(
      (files) => !files || files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { user } = useUser();
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(user?.avatarUrl || null);

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: undefined,
    },
  });

  const watchedAvatar = watch("avatar");

  useEffect(() => {
    if (watchedAvatar && watchedAvatar.length > 0) {
      const file = watchedAvatar[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [watchedAvatar]);

  const onSubmit = async (data: ProfileFormValues) => {
    // In a real app, you would upload the avatar and update user data
    console.log("Profile updated:", data);
    toast({
      title: "Success!",
      description: "Your profile has been updated.",
    });
  };

  const removeImage = () => {
    setValue("avatar", null);
    setPreview(user?.avatarUrl || null);
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your account details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
                {preview ? (
                     <Image src={preview} alt="Avatar Preview" width={80} height={80} className="rounded-full" />
                ) : (
                    <UserAvatar user={user} className="h-20 w-20" />
                )}
            </div>
            <div className="flex-1 space-y-2">
                <Label htmlFor="avatar">Profile Picture</Label>
                <div className="flex gap-2">
                    <label className="relative cursor-pointer">
                        <div className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3", "border border-input bg-background hover:bg-accent hover:text-accent-foreground")}>
                           <UploadCloud className="mr-2 h-4 w-4"/>
                           <span>Change</span>
                        </div>
                        <Input id="avatar" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" {...register("avatar")} accept={ACCEPTED_IMAGE_TYPES.join(",")} />
                    </label>
                    <Button type="button" variant="ghost" onClick={removeImage}>Remove</Button>
                </div>
                 {errors.avatar && <p className="text-sm text-destructive">{errors.avatar.message?.toString()}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton buttonText="Save Changes" />
        </CardFooter>
      </Card>
    </form>
  );
}
