'use server';

/**
 * @fileOverview Flow for verifying user identity using a government-issued ID.
 *
 * - verifyUserIdentity - A function that handles the user identity verification process.
 * - VerifyUserIdentityInput - The input type for the verifyUserIdentity function.
 * - VerifyUserIdentityOutput - The return type for the verifyUserIdentity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyUserIdentityInputSchema = z.object({
  governmentIdDataUri: z
    .string()
    .describe(
      "A photo of a government-issued ID, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userInformation: z
    .object({
      firstName: z.string().describe('The first name of the user.'),
      lastName: z.string().describe('The last name of the user.'),
      dateOfBirth: z.string().describe('The date of birth of the user (YYYY-MM-DD).'),
      address: z.string().describe('The address of the user.'),
    })
    .describe('User personal information'),
});
export type VerifyUserIdentityInput = z.infer<typeof VerifyUserIdentityInputSchema>;

const VerifyUserIdentityOutputSchema = z.object({
  verificationResult: z
    .boolean()
    .describe('Whether or not the user identity is successfully verified.'),
  reason: z
    .string()
    .optional()
    .describe('The reason for verification failure, if applicable.'),
});
export type VerifyUserIdentityOutput = z.infer<typeof VerifyUserIdentityOutputSchema>;

export async function verifyUserIdentity(input: VerifyUserIdentityInput): Promise<VerifyUserIdentityOutput> {
  return verifyUserIdentityFlow(input);
}

const verifyIdentityTool = ai.defineTool({
  name: 'verifyIdentity',
  description: 'Verifies user identity using government-issued ID and personal information.',
  inputSchema: VerifyUserIdentityInputSchema,
  outputSchema: VerifyUserIdentityOutputSchema,
},
async (input) => {
  // Placeholder implementation for identity verification using a third-party service.
  // In a real application, this would integrate with a service like Veriff or Onfido.
  // For this example, we simulate a successful verification.
  console.log('Performing identity verification using government ID and user information...');

  // Simulate successful verification (replace with actual verification logic).
  const isVerified = Math.random() < 0.9; // Simulate 90% success rate.
  const reason = isVerified ? undefined : 'Simulated verification failure.';
  return {
    verificationResult: isVerified,
    reason: reason,
  };
});

const verifyUserIdentityPrompt = ai.definePrompt({
  name: 'verifyUserIdentityPrompt',
  tools: [verifyIdentityTool],
  input: {schema: VerifyUserIdentityInputSchema},
  output: {schema: VerifyUserIdentityOutputSchema},
  prompt: `You are an identity verification expert.

  The user has submitted a government-issued ID and personal information for verification.
  Use the verifyIdentity tool to verify the user's identity.

  Input:
  Government ID: {{media url=governmentIdDataUri}}
  User Information: {{{JSON.stringify userInformation}}}

  The tool will return a verificationResult (true or false) and a reason if the verification fails.
  Return the tool output as is.
  `,
});

const verifyUserIdentityFlow = ai.defineFlow(
  {
    name: 'verifyUserIdentityFlow',
    inputSchema: VerifyUserIdentityInputSchema,
    outputSchema: VerifyUserIdentityOutputSchema,
  },
  async input => {
    const {output} = await verifyUserIdentityPrompt(input);
    return output!;
  }
);
