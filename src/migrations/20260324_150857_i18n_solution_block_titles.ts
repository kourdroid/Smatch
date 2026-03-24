import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'solutions_blocks_solution_presentation' AND column_name = 'section_title') THEN
        ALTER TABLE "solutions_blocks_solution_presentation" ADD COLUMN "section_title" varchar DEFAULT 'Présentation de la solution' NOT NULL;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'solutions_blocks_solution_presentation' AND column_name = 'product_vision_title') THEN
        ALTER TABLE "solutions_blocks_solution_presentation" ADD COLUMN "product_vision_title" varchar DEFAULT 'Vision produit';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'solutions_blocks_solution_presentation' AND column_name = 'main_benefits_title') THEN
        ALTER TABLE "solutions_blocks_solution_presentation" ADD COLUMN "main_benefits_title" varchar DEFAULT 'Avantages principaux';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'solutions_blocks_solution_architecture' AND column_name = 'section_title') THEN
        ALTER TABLE "solutions_blocks_solution_architecture" ADD COLUMN "section_title" varchar DEFAULT 'Architecture de la solution' NOT NULL;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'solutions_blocks_solution_module_details' AND column_name = 'sub_modules_title') THEN
        ALTER TABLE "solutions_blocks_solution_module_details" ADD COLUMN "sub_modules_title" varchar DEFAULT 'Sous-modules';
      END IF;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "solutions_blocks_solution_presentation" DROP COLUMN IF EXISTS "section_title";
    ALTER TABLE "solutions_blocks_solution_presentation" DROP COLUMN IF EXISTS "product_vision_title";
    ALTER TABLE "solutions_blocks_solution_presentation" DROP COLUMN IF EXISTS "main_benefits_title";
    ALTER TABLE "solutions_blocks_solution_architecture" DROP COLUMN IF EXISTS "section_title";
    ALTER TABLE "solutions_blocks_solution_module_details" DROP COLUMN IF EXISTS "sub_modules_title";
  `)
}
