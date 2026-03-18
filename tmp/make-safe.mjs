import fs from 'fs';

const file = 'c:/Users/kourd/Desktop/Smatch/Website/website/src/migrations/20260318_144605.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/CREATE TABLE "([^"]+)"/g, 'CREATE TABLE IF NOT EXISTS "$1"');
content = content.replace(/CREATE INDEX "([^"]+)"/g, 'CREATE INDEX IF NOT EXISTS "$1"');
content = content.replace(/CREATE UNIQUE INDEX "([^"]+)"/g, 'CREATE UNIQUE INDEX IF NOT EXISTS "$1"');
content = content.replace(/ADD COLUMN "([^"]+)"/g, 'ADD COLUMN IF NOT EXISTS "$1"');

content = content.replace(/CREATE TYPE "public"\."([^"]+)" AS ENUM\(([^)]+)\);/g, `DO $$ BEGIN
    CREATE TYPE "public"."$1" AS ENUM($2);
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`);

fs.writeFileSync(file, content);
console.log('Migration successfully updated with IF NOT EXISTS statements.');
