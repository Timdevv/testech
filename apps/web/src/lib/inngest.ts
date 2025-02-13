import { Inngest } from "inngest";

// Vérification des variables d'environnement
if (!process.env.INNGEST_EVENT_KEY) {
  throw new Error('INNGEST_EVENT_KEY is missing');
}

console.log('Inngest Key:', process.env.INNGEST_EVENT_KEY.slice(0, 10) + '...');

export const inngest = new Inngest({ 
  id: "feedback-app",
  name: "Feedback App",
  apiKey: process.env.INNGEST_EVENT_KEY,
}); 