import { inngest } from "@/lib/inngest";

export type FeedbackEvent = {
  name: "feedback.new";
  data: {
    question: string;
  };
};

export const processFeedback = inngest.createFunction(
  { name: "Process Feedback" },
  { event: "feedback.new" },
  async ({ event, step }) => {
    console.log("Processing feedback:", event.data);
    const { question } = event.data;

    await step.run("Send to customer", async () => {
      console.log("Sending to customer:", question);
    });

    return { success: true };
  }
); 