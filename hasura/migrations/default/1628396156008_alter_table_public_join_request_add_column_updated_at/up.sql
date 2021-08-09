alter table "public"."join_request" add column "updated_at" timestamptz
 null default now();
