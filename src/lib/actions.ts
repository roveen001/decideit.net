"use server";

import { verifyUserIdentity } from "@/ai/flows/verify-user-identity";
import { z } from "zod";

const verificationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
  governmentId: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Government ID is required."),
});

type State = {
  message: string;
  success: boolean;
};

export async function handleVerification(
  prevState: State,
  formData: FormData
): Promise<State> {
  const rawFormData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    dateOfBirth: formData.get("dateOfBirth"),
    address: formData.get("address"),
    governmentId: formData.get("governmentId"),
  };
  
  const validatedFields = verificationSchema.safeParse(rawFormData);
  
  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.issues.map(issue => issue.message).join(", ");
    return {
      message: `Invalid form data: ${errorMessages}`,
      success: false,
    };
  }

  const { governmentId, ...userInformation } = validatedFields.data;

  try {
    const arrayBuffer = await governmentId.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const governmentIdDataUri = `data:${governmentId.type};base64,${buffer.toString("base64")}`;

    const result = await verifyUserIdentity({
      governmentIdDataUri,
      userInformation,
    });

    if (result.verificationResult) {
      return {
        message: "Your identity has been successfully verified!",
        success: true,
      };
    } else {
      return {
        message: result.reason || "We couldn't verify your identity. Please try again or use a different ID.",
        success: false,
      };
    }
  } catch (error) {
    console.error("Verification error:", error);
    return {
      message: "An unexpected error occurred during verification. Please try again later.",
      success: false,
    };
  }
}

// Placeholder for submitting a topic
export async function submitTopic(formData: FormData) {
  // In a real app, you would process and save the topic data here.
  console.log("Topic submitted:", formData.get("title"));
}

// Placeholder for casting a vote
export async function castVote(topicId: string, voteType: 'for' | 'against') {
    // In a real app, you would update the vote count in your database.
    console.log(`Voted ${voteType} on topic ${topicId}`);
}

// Placeholder for adding a comment
export async function addComment(formData: FormData) {
    const comment = formData.get("comment");
    const topicId = formData.get("topicId");
    // In a real app, you would save the comment to your database.
    console.log(`Comment added to topic ${topicId}: ${comment}`);
    // You would also revalidate the path to show the new comment
    // revalidatePath(`/topics/${topicId}`);
}
