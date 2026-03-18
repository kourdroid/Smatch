import fs from 'fs';

const file = 'c:/Users/kourd/Desktop/Smatch/Website/website/src/migrations/20260318_144605.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.split('DO $ BEGIN').join('DO $$ BEGIN');
content = content.split('END $;').join('END $$;');

fs.writeFileSync(file, content);
console.log('Fixed dollar signs.');
