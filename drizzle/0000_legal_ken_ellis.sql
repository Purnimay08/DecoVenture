CREATE TABLE "aiGeneratedImage" (
	"id" serial PRIMARY KEY NOT NULL,
	"roomType" varchar NOT NULL,
	"designType" varchar NOT NULL,
	"orgImage" varchar NOT NULL,
	"aiImage" varchar NOT NULL,
	"userEmail" varchar
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"imageURL" varchar NOT NULL,
	"credits" integer DEFAULT 3
);
