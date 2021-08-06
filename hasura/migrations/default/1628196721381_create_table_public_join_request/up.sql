CREATE TABLE "public"."join_request" ("id" uuid, "account" varchar NOT NULL, "email" varchar NOT NULL, "receive_news" boolean NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
