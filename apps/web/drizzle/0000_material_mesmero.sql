CREATE TABLE "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"response" text,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
