'use server';

/**
 * @fileOverview Summarizes financial content from a given URL into a 100-word summary in the user's chosen language, with glossary links.
 *
 * - summarizeFinancialContent - A function that handles the summarization process.
 * - SummarizeFinancialContentInput - The input type for the summarizeFinancialContent function.
 * - SummarizeFinancialContentOutput - The return type for the summarizeFinancialContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFinancialContentInputSchema = z.object({
  url: z.string().describe('The URL of the financial article to summarize.'),
  language: z.string().describe('The language in which to generate the summary.'),
});
export type SummarizeFinancialContentInput = z.infer<
  typeof SummarizeFinancialContentInputSchema
>;

const SummarizeFinancialContentOutputSchema = z.object({
  summary: z.string().describe('A 100-word summary of the financial article.'),
  glossaryLinks: z
    .array(z.string())
    .describe('Links to glossary definitions for key terms.'),
});
export type SummarizeFinancialContentOutput = z.infer<
  typeof SummarizeFinancialContentOutputSchema
>;

export async function summarizeFinancialContent(
  input: SummarizeFinancialContentInput
): Promise<SummarizeFinancialContentOutput> {
  return summarizeFinancialContentFlow(input);
}

const summarizeFinancialContentPrompt = ai.definePrompt({
  name: 'summarizeFinancialContentPrompt',
  input: {schema: SummarizeFinancialContentInputSchema},
  output: {schema: SummarizeFinancialContentOutputSchema},
  prompt: `You are an expert financial content summarizer.

  Summarize the financial article at the following URL in 100 words or less, in the requested language.
  Also, identify key terms and provide placeholder links to glossary definitions for those terms.

  URL: {{{url}}}
  Language: {{{language}}}
  Summary:`, // Ensure the prompt ends with 'Summary:' so that the model begins its response with the summary.
});

const summarizeFinancialContentFlow = ai.defineFlow(
  {
    name: 'summarizeFinancialContentFlow',
    inputSchema: SummarizeFinancialContentInputSchema,
    outputSchema: SummarizeFinancialContentOutputSchema,
  },
  async input => {
    const {output} = await summarizeFinancialContentPrompt(input);
    return output!;
  }
);
