import { db } from '@/db';
import { feedbacks } from '@/db/schema';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { inngest } from "@/lib/inngest";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home() {
  const allFeedbacks = await db.select().from(feedbacks);

  async function handleSubmit(formData: FormData) {
    'use server'
    const question = formData.get('question') as string;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Failed to send feedback');
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Feedback System</h1>
      
      <Card className="p-4 mb-8">
        <form action={handleSubmit} className="flex gap-4">
          <Input 
            name="question"
            placeholder="Enter your question..." 
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Response</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allFeedbacks.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.question}</TableCell>
                <TableCell>{feedback.response}</TableCell>
                <TableCell>{feedback.status}</TableCell>
                <TableCell>
                  {feedback.createdAt?.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}