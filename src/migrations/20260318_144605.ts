import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_actualites_source" AS ENUM('ai-generated', 'manual');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_actualites_status" AS ENUM('draft', 'published');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__actualites_v_version_source" AS ENUM('ai-generated', 'manual');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__actualites_v_version_status" AS ENUM('draft', 'published');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum__actualites_v_published_locale" AS ENUM('en', 'fr');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;
  CREATE TABLE IF NOT EXISTS "actualites_additional_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "actualites_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "actualites_faq_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "actualites" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"estimated_read_time" numeric,
  	"source" "enum_actualites_source" DEFAULT 'manual',
  	"published_at" timestamp(3) with time zone,
  	"meta_seo_potential_score" numeric DEFAULT 0,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_actualites_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "actualites_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_focus_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "actualites_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_actualites_v_version_additional_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_actualites_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_actualites_v_version_faq_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_actualites_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_hero_image_id" integer,
  	"version_estimated_read_time" numeric,
  	"version_source" "enum__actualites_v_version_source" DEFAULT 'manual',
  	"version_published_at" timestamp(3) with time zone,
  	"version_meta_seo_potential_score" numeric DEFAULT 0,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__actualites_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__actualites_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_actualites_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_focus_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_actualites_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "actualites_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "actualites_id" integer;
  ALTER TABLE "solutions_rels" ADD COLUMN IF NOT EXISTS "actualites_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "actualites_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN IF NOT EXISTS "actualites_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN IF NOT EXISTS "actualites_id" integer;
  ALTER TABLE "announcement_rels" ADD COLUMN IF NOT EXISTS "actualites_id" integer;
  ALTER TABLE "actualites_additional_images" ADD CONSTRAINT "actualites_additional_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "actualites_additional_images" ADD CONSTRAINT "actualites_additional_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites_tags" ADD CONSTRAINT "actualites_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites_faq_entries" ADD CONSTRAINT "actualites_faq_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites" ADD CONSTRAINT "actualites_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "actualites_locales" ADD CONSTRAINT "actualites_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "actualites_locales" ADD CONSTRAINT "actualites_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites_rels" ADD CONSTRAINT "actualites_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "actualites_rels" ADD CONSTRAINT "actualites_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_actualites_v_version_additional_images" ADD CONSTRAINT "_actualites_v_version_additional_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_actualites_v_version_additional_images" ADD CONSTRAINT "_actualites_v_version_additional_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_actualites_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_actualites_v_version_tags" ADD CONSTRAINT "_actualites_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_actualites_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_actualites_v_version_faq_entries" ADD CONSTRAINT "_actualites_v_version_faq_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_actualites_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_actualites_v" ADD CONSTRAINT "_actualites_v_parent_id_actualites_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."actualites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_actualites_v" ADD CONSTRAINT "_actualites_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_actualites_v_locales" ADD CONSTRAINT "_actualites_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_actualites_v_locales" ADD CONSTRAINT "_actualites_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_actualites_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_actualites_v_rels" ADD CONSTRAINT "_actualites_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_actualites_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_actualites_v_rels" ADD CONSTRAINT "_actualites_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "actualites_additional_images_order_idx" ON "actualites_additional_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "actualites_additional_images_parent_id_idx" ON "actualites_additional_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "actualites_additional_images_image_idx" ON "actualites_additional_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "actualites_tags_order_idx" ON "actualites_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "actualites_tags_parent_id_idx" ON "actualites_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "actualites_faq_entries_order_idx" ON "actualites_faq_entries" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "actualites_faq_entries_parent_id_idx" ON "actualites_faq_entries" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "actualites_faq_entries_locale_idx" ON "actualites_faq_entries" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "actualites_hero_image_idx" ON "actualites" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "actualites_slug_idx" ON "actualites" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "actualites_updated_at_idx" ON "actualites" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "actualites_created_at_idx" ON "actualites" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "actualites__status_idx" ON "actualites" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "actualites_meta_meta_image_idx" ON "actualites_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "actualites_locales_locale_parent_id_unique" ON "actualites_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "actualites_rels_order_idx" ON "actualites_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "actualites_rels_parent_idx" ON "actualites_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "actualites_rels_path_idx" ON "actualites_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "actualites_rels_categories_id_idx" ON "actualites_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_additional_images_order_idx" ON "_actualites_v_version_additional_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_additional_images_parent_id_idx" ON "_actualites_v_version_additional_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_additional_images_image_idx" ON "_actualites_v_version_additional_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_tags_order_idx" ON "_actualites_v_version_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_tags_parent_id_idx" ON "_actualites_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_faq_entries_order_idx" ON "_actualites_v_version_faq_entries" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_faq_entries_parent_id_idx" ON "_actualites_v_version_faq_entries" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_faq_entries_locale_idx" ON "_actualites_v_version_faq_entries" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_actualites_v_parent_idx" ON "_actualites_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_version_hero_image_idx" ON "_actualites_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_version_slug_idx" ON "_actualites_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_version_updated_at_idx" ON "_actualites_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_version_created_at_idx" ON "_actualites_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_version__status_idx" ON "_actualites_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_actualites_v_created_at_idx" ON "_actualites_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_actualites_v_updated_at_idx" ON "_actualites_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_actualites_v_snapshot_idx" ON "_actualites_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_actualites_v_published_locale_idx" ON "_actualites_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_actualites_v_latest_idx" ON "_actualites_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_actualites_v_autosave_idx" ON "_actualites_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_actualites_v_version_meta_version_meta_image_idx" ON "_actualites_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_actualites_v_locales_locale_parent_id_unique" ON "_actualites_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_actualites_v_rels_order_idx" ON "_actualites_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_actualites_v_rels_parent_idx" ON "_actualites_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_actualites_v_rels_path_idx" ON "_actualites_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_actualites_v_rels_categories_id_idx" ON "_actualites_v_rels" USING btree ("categories_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_actualites_fk" FOREIGN KEY ("actualites_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_actualites_fk" FOREIGN KEY ("actualites_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_actualites_fk" FOREIGN KEY ("actualites_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_actualites_fk" FOREIGN KEY ("actualites_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_actualites_fk" FOREIGN KEY ("actualites_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_actualites_fk" FOREIGN KEY ("actualites_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_rels" ADD CONSTRAINT "announcement_rels_actualites_fk" FOREIGN KEY ("actualites_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "pages_rels_actualites_id_idx" ON "pages_rels" USING btree ("actualites_id","locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_actualites_id_idx" ON "_pages_v_rels" USING btree ("actualites_id","locale");
  CREATE INDEX IF NOT EXISTS "solutions_rels_actualites_id_idx" ON "solutions_rels" USING btree ("actualites_id","locale");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_actualites_id_idx" ON "payload_locked_documents_rels" USING btree ("actualites_id");
  CREATE INDEX IF NOT EXISTS "header_rels_actualites_id_idx" ON "header_rels" USING btree ("actualites_id","locale");
  CREATE INDEX IF NOT EXISTS "footer_rels_actualites_id_idx" ON "footer_rels" USING btree ("actualites_id","locale");
  CREATE INDEX IF NOT EXISTS "announcement_rels_actualites_id_idx" ON "announcement_rels" USING btree ("actualites_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "actualites_additional_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_faq_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actualites_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_actualites_v_version_additional_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_actualites_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_actualites_v_version_faq_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_actualites_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_actualites_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_actualites_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "actualites_additional_images" CASCADE;
  DROP TABLE "actualites_tags" CASCADE;
  DROP TABLE "actualites_faq_entries" CASCADE;
  DROP TABLE "actualites" CASCADE;
  DROP TABLE "actualites_locales" CASCADE;
  DROP TABLE "actualites_rels" CASCADE;
  DROP TABLE "_actualites_v_version_additional_images" CASCADE;
  DROP TABLE "_actualites_v_version_tags" CASCADE;
  DROP TABLE "_actualites_v_version_faq_entries" CASCADE;
  DROP TABLE "_actualites_v" CASCADE;
  DROP TABLE "_actualites_v_locales" CASCADE;
  DROP TABLE "_actualites_v_rels" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_actualites_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_actualites_fk";
  
  ALTER TABLE "solutions_rels" DROP CONSTRAINT "solutions_rels_actualites_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_actualites_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_actualites_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_actualites_fk";
  
  ALTER TABLE "announcement_rels" DROP CONSTRAINT "announcement_rels_actualites_fk";
  
  DROP INDEX "pages_rels_actualites_id_idx";
  DROP INDEX "_pages_v_rels_actualites_id_idx";
  DROP INDEX "solutions_rels_actualites_id_idx";
  DROP INDEX "payload_locked_documents_rels_actualites_id_idx";
  DROP INDEX "header_rels_actualites_id_idx";
  DROP INDEX "footer_rels_actualites_id_idx";
  DROP INDEX "announcement_rels_actualites_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "actualites_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "actualites_id";
  ALTER TABLE "solutions_rels" DROP COLUMN "actualites_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "actualites_id";
  ALTER TABLE "header_rels" DROP COLUMN "actualites_id";
  ALTER TABLE "footer_rels" DROP COLUMN "actualites_id";
  ALTER TABLE "announcement_rels" DROP COLUMN "actualites_id";
  DROP TYPE "public"."enum_actualites_source";
  DROP TYPE "public"."enum_actualites_status";
  DROP TYPE "public"."enum__actualites_v_version_source";
  DROP TYPE "public"."enum__actualites_v_version_status";
  DROP TYPE "public"."enum__actualites_v_published_locale";`)
}
