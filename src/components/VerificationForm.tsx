"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

import { handleVerification } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const verificationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().refine((dob) => new Date(dob) < new Date(), {
    message: "Date of birth must be in the past",
  }),
  address: z.string().min(1, "Address is required"),
  governmentId: z
    .any()
    .refine((files) => files?.length == 1, "Government ID is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;


export default function VerificationForm() {
  const [initialState, formAction] = useFormState(handleVerification, {
    message: "",
    success: false,
  });
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      address: "",
      governmentId: undefined,
    },
  });

  const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = form;
  const watchedId = watch("governmentId");

  useEffect(() => {
    if (watchedId && watchedId.length > 0) {
      const file = watchedId[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [watchedId]);

  useEffect(() => {
    if (initialState.message) {
      if (initialState.success) {
        toast({
          title: "Success!",
          description: "Your identity has been successfully verified!",
        });
        reset();
        setPreview(null);
      } else {
        toast({
          title: "Verification Failed",
          description: initialState.message,
          variant: "destructive",
        });
      }
    }
  }, [initialState, toast, reset]);
  
  const removeImage = () => {
    setValue("governmentId", null);
    setPreview(null);
  }

  return (
    <form action={formAction} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="governmentId">Government ID</Label>
            {preview ? (
              <div className="relative w-full h-48 rounded-md border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                 <Image src={preview} alt="ID Preview" layout="fill" objectFit="contain" className="rounded-md p-2"/>
                 <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-7 w-7 rounded-full" onClick={removeImage}>
                    <X className="h-4 w-4"/>
                 </Button>
              </div>
            ) : (
                <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (MAX. 5MB)</p>
                    </div>
                    <Input id="governmentId" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" {...register("governmentId")} accept={ACCEPTED_IMAGE_TYPES.join(",")} />
                </label>
            )}
            {errors.governmentId && <p className="text-sm text-destructive">{errors.governmentId.message?.toString()}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton buttonText="Verify Identity" />
        </CardFooter>
      </Card>
    </form>
  );
}
