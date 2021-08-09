alter table "public"."join_request" add column "created_at" timestamptz
 null default now();
