import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  response: text("response"),
  status: varchar("status", { length: 20 }).notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}); 