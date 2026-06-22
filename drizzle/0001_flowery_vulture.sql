CREATE TABLE "adminCredentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"passwordHash" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "adminCredentials_username_unique" UNIQUE("username"),
	CONSTRAINT "adminCredentials_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "mediaFiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"title" varchar(255),
	"description" text,
	"position" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "siteContent" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "siteContent_key_unique" UNIQUE("key")
);
