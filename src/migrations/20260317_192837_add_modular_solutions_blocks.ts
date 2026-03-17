import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "solutions_blocks_solution_presentation_product_vision" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_solution_presentation_main_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_solution_presentation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_solution_architecture_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"anchor_link" varchar NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_solution_architecture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_solution_module_details_bullet_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_solution_module_details_ai_block_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "solutions_blocks_solution_module_details_sub_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_solution_module_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"module_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"ai_block_title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_solution_benefits_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_solution_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_solution_use_cases_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_solution_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Use cases' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_solution_custom_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_solution_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header" varchar NOT NULL,
  	"body" jsonb NOT NULL
  );
  
  CREATE TABLE "solutions_blocks_solution_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_functionality_benefits_benefits" DROP CONSTRAINT IF EXISTS "pages_blocks_functionality_benefits_benefits_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_functionality_benefits_benefits_icon_id_media_id_fk";
  
  ALTER TABLE "solutions_blocks_functionality_benefits_benefits" DROP CONSTRAINT IF EXISTS "solutions_blocks_functionality_benefits_benefits_icon_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_functionality_benefits_benefits_icon_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_functionality_benefits_benefits_icon_idx";
  DROP INDEX IF EXISTS "solutions_blocks_functionality_benefits_benefits_icon_idx";
  ALTER TABLE "pages_blocks_functionality_benefits_benefits" ADD COLUMN IF NOT EXISTS "icon" varchar;
  ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits" ADD COLUMN IF NOT EXISTS "icon" varchar;
  ALTER TABLE "solutions_blocks_functionality_benefits_benefits" ADD COLUMN IF NOT EXISTS "icon" varchar;
  ALTER TABLE "solutions_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "solutions_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "solutions_blocks_solution_presentation_product_vision" ADD CONSTRAINT "solutions_blocks_solution_presentation_product_vision_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_solution_presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_presentation_main_benefits" ADD CONSTRAINT "solutions_blocks_solution_presentation_main_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_solution_presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_presentation" ADD CONSTRAINT "solutions_blocks_solution_presentation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_architecture_modules" ADD CONSTRAINT "solutions_blocks_solution_architecture_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_solution_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_architecture" ADD CONSTRAINT "solutions_blocks_solution_architecture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_module_details_bullet_points" ADD CONSTRAINT "solutions_blocks_solution_module_details_bullet_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_solution_module_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_module_details_ai_block_points" ADD CONSTRAINT "solutions_blocks_solution_module_details_ai_block_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_solution_module_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_module_details_sub_modules" ADD CONSTRAINT "solutions_blocks_solution_module_details_sub_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_solution_module_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_module_details" ADD CONSTRAINT "solutions_blocks_solution_module_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_benefits_benefits" ADD CONSTRAINT "solutions_blocks_solution_benefits_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_solution_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_benefits" ADD CONSTRAINT "solutions_blocks_solution_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_use_cases_cases" ADD CONSTRAINT "solutions_blocks_solution_use_cases_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_solution_use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_use_cases" ADD CONSTRAINT "solutions_blocks_solution_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_custom_section" ADD CONSTRAINT "solutions_blocks_solution_custom_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_accordion_items" ADD CONSTRAINT "solutions_blocks_solution_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_solution_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_solution_accordion" ADD CONSTRAINT "solutions_blocks_solution_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "solutions_blocks_solution_presentation_product_vision_order_idx" ON "solutions_blocks_solution_presentation_product_vision" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_presentation_product_vision_parent_id_idx" ON "solutions_blocks_solution_presentation_product_vision" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_presentation_product_vision_locale_idx" ON "solutions_blocks_solution_presentation_product_vision" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_presentation_main_benefits_order_idx" ON "solutions_blocks_solution_presentation_main_benefits" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_presentation_main_benefits_parent_id_idx" ON "solutions_blocks_solution_presentation_main_benefits" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_presentation_main_benefits_locale_idx" ON "solutions_blocks_solution_presentation_main_benefits" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_presentation_order_idx" ON "solutions_blocks_solution_presentation" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_presentation_parent_id_idx" ON "solutions_blocks_solution_presentation" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_presentation_path_idx" ON "solutions_blocks_solution_presentation" USING btree ("_path");
  CREATE INDEX "solutions_blocks_solution_presentation_locale_idx" ON "solutions_blocks_solution_presentation" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_architecture_modules_order_idx" ON "solutions_blocks_solution_architecture_modules" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_architecture_modules_parent_id_idx" ON "solutions_blocks_solution_architecture_modules" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_architecture_modules_locale_idx" ON "solutions_blocks_solution_architecture_modules" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_architecture_order_idx" ON "solutions_blocks_solution_architecture" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_architecture_parent_id_idx" ON "solutions_blocks_solution_architecture" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_architecture_path_idx" ON "solutions_blocks_solution_architecture" USING btree ("_path");
  CREATE INDEX "solutions_blocks_solution_architecture_locale_idx" ON "solutions_blocks_solution_architecture" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_module_details_bullet_points_order_idx" ON "solutions_blocks_solution_module_details_bullet_points" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_module_details_bullet_points_parent_id_idx" ON "solutions_blocks_solution_module_details_bullet_points" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_module_details_bullet_points_locale_idx" ON "solutions_blocks_solution_module_details_bullet_points" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_module_details_ai_block_points_order_idx" ON "solutions_blocks_solution_module_details_ai_block_points" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_module_details_ai_block_points_parent_id_idx" ON "solutions_blocks_solution_module_details_ai_block_points" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_module_details_ai_block_points_locale_idx" ON "solutions_blocks_solution_module_details_ai_block_points" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_module_details_sub_modules_order_idx" ON "solutions_blocks_solution_module_details_sub_modules" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_module_details_sub_modules_parent_id_idx" ON "solutions_blocks_solution_module_details_sub_modules" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_module_details_sub_modules_locale_idx" ON "solutions_blocks_solution_module_details_sub_modules" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_module_details_order_idx" ON "solutions_blocks_solution_module_details" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_module_details_parent_id_idx" ON "solutions_blocks_solution_module_details" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_module_details_path_idx" ON "solutions_blocks_solution_module_details" USING btree ("_path");
  CREATE INDEX "solutions_blocks_solution_module_details_locale_idx" ON "solutions_blocks_solution_module_details" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_benefits_benefits_order_idx" ON "solutions_blocks_solution_benefits_benefits" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_benefits_benefits_parent_id_idx" ON "solutions_blocks_solution_benefits_benefits" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_benefits_benefits_locale_idx" ON "solutions_blocks_solution_benefits_benefits" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_benefits_order_idx" ON "solutions_blocks_solution_benefits" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_benefits_parent_id_idx" ON "solutions_blocks_solution_benefits" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_benefits_path_idx" ON "solutions_blocks_solution_benefits" USING btree ("_path");
  CREATE INDEX "solutions_blocks_solution_benefits_locale_idx" ON "solutions_blocks_solution_benefits" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_use_cases_cases_order_idx" ON "solutions_blocks_solution_use_cases_cases" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_use_cases_cases_parent_id_idx" ON "solutions_blocks_solution_use_cases_cases" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_use_cases_cases_locale_idx" ON "solutions_blocks_solution_use_cases_cases" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_use_cases_order_idx" ON "solutions_blocks_solution_use_cases" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_use_cases_parent_id_idx" ON "solutions_blocks_solution_use_cases" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_use_cases_path_idx" ON "solutions_blocks_solution_use_cases" USING btree ("_path");
  CREATE INDEX "solutions_blocks_solution_use_cases_locale_idx" ON "solutions_blocks_solution_use_cases" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_custom_section_order_idx" ON "solutions_blocks_solution_custom_section" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_custom_section_parent_id_idx" ON "solutions_blocks_solution_custom_section" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_custom_section_path_idx" ON "solutions_blocks_solution_custom_section" USING btree ("_path");
  CREATE INDEX "solutions_blocks_solution_custom_section_locale_idx" ON "solutions_blocks_solution_custom_section" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_accordion_items_order_idx" ON "solutions_blocks_solution_accordion_items" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_accordion_items_parent_id_idx" ON "solutions_blocks_solution_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_accordion_items_locale_idx" ON "solutions_blocks_solution_accordion_items" USING btree ("_locale");
  CREATE INDEX "solutions_blocks_solution_accordion_order_idx" ON "solutions_blocks_solution_accordion" USING btree ("_order");
  CREATE INDEX "solutions_blocks_solution_accordion_parent_id_idx" ON "solutions_blocks_solution_accordion" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_solution_accordion_path_idx" ON "solutions_blocks_solution_accordion" USING btree ("_path");
  CREATE INDEX "solutions_blocks_solution_accordion_locale_idx" ON "solutions_blocks_solution_accordion" USING btree ("_locale");
  ALTER TABLE "pages_blocks_functionality_benefits_benefits" DROP COLUMN IF EXISTS "icon_id";
  ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits" DROP COLUMN IF EXISTS "icon_id";
  ALTER TABLE "solutions_blocks_functionality_benefits_benefits" DROP COLUMN IF EXISTS "icon_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "solutions_blocks_solution_presentation_product_vision" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_presentation_main_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_presentation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_architecture_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_architecture" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_module_details_bullet_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_module_details_ai_block_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_module_details_sub_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_module_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_benefits_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_use_cases_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_use_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_custom_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_blocks_solution_accordion" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "solutions_blocks_solution_presentation_product_vision" CASCADE;
  DROP TABLE "solutions_blocks_solution_presentation_main_benefits" CASCADE;
  DROP TABLE "solutions_blocks_solution_presentation" CASCADE;
  DROP TABLE "solutions_blocks_solution_architecture_modules" CASCADE;
  DROP TABLE "solutions_blocks_solution_architecture" CASCADE;
  DROP TABLE "solutions_blocks_solution_module_details_bullet_points" CASCADE;
  DROP TABLE "solutions_blocks_solution_module_details_ai_block_points" CASCADE;
  DROP TABLE "solutions_blocks_solution_module_details_sub_modules" CASCADE;
  DROP TABLE "solutions_blocks_solution_module_details" CASCADE;
  DROP TABLE "solutions_blocks_solution_benefits_benefits" CASCADE;
  DROP TABLE "solutions_blocks_solution_benefits" CASCADE;
  DROP TABLE "solutions_blocks_solution_use_cases_cases" CASCADE;
  DROP TABLE "solutions_blocks_solution_use_cases" CASCADE;
  DROP TABLE "solutions_blocks_solution_custom_section" CASCADE;
  DROP TABLE "solutions_blocks_solution_accordion_items" CASCADE;
  DROP TABLE "solutions_blocks_solution_accordion" CASCADE;
  ALTER TABLE "pages_blocks_functionality_benefits_benefits" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits" ADD COLUMN "icon_id" integer;
  ALTER TABLE "solutions_blocks_functionality_benefits_benefits" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages_blocks_functionality_benefits_benefits" ADD CONSTRAINT "pages_blocks_functionality_benefits_benefits_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits" ADD CONSTRAINT "_pages_v_blocks_functionality_benefits_benefits_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_blocks_functionality_benefits_benefits" ADD CONSTRAINT "solutions_blocks_functionality_benefits_benefits_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_functionality_benefits_benefits_icon_idx" ON "pages_blocks_functionality_benefits_benefits" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_functionality_benefits_benefits_icon_idx" ON "_pages_v_blocks_functionality_benefits_benefits" USING btree ("icon_id");
  CREATE INDEX "solutions_blocks_functionality_benefits_benefits_icon_idx" ON "solutions_blocks_functionality_benefits_benefits" USING btree ("icon_id");
  ALTER TABLE "pages_blocks_functionality_benefits_benefits" DROP COLUMN "icon";
  ALTER TABLE "_pages_v_blocks_functionality_benefits_benefits" DROP COLUMN "icon";
  ALTER TABLE "solutions_blocks_functionality_benefits_benefits" DROP COLUMN "icon";
  ALTER TABLE "solutions_locales" DROP COLUMN "meta_title";
  ALTER TABLE "solutions_locales" DROP COLUMN "meta_description";
  ALTER TABLE "projects_locales" DROP COLUMN "meta_title";
  ALTER TABLE "projects_locales" DROP COLUMN "meta_description";`)
}
