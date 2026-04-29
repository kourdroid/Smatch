import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "solutions_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "projects_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "solutions_locales" ADD CONSTRAINT "solutions_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "solutions_meta_meta_image_idx" ON "solutions_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "projects_meta_meta_image_idx" ON "projects_locales" USING btree ("meta_image_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "solutions_locales" DROP CONSTRAINT "solutions_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "projects_locales" DROP CONSTRAINT "projects_locales_meta_image_id_media_id_fk";
  
  DROP INDEX "solutions_meta_meta_image_idx";
  DROP INDEX "projects_meta_meta_image_idx";
  ALTER TABLE "solutions_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "projects_locales" DROP COLUMN "meta_image_id";`)
}
