import { Inngest } from "inngest";
import { db } from "@/db";
import { feedbacks } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.INNGEST_EVENT_KEY) {
    console.error('INNGEST_EVENT_KEY is missing in API route');
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
  }

  // Créer une nouvelle instance Inngest avec la clé
  const inngest = new Inngest({ 
    id: "feedback-app",
    name: "Feedback App",
    apiKey: process.env.INNGEST_EVENT_KEY,
  });

  try {
    const { question } = await request.json();
    console.log('Processing question:', question);
    console.log('Using Inngest Key:', process.env.INNGEST_EVENT_KEY.slice(0, 10) + '...');

    const result = await inngest.send({
      name: "feedback.new",
      data: { question },
    });

    console.log('Inngest result:', result);

    await db.insert(feedbacks).values({
      question,
      status: 'pending',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Failed to process feedback' }, { status: 500 });
  }
}