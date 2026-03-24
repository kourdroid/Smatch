import * as migration_20260120_003432_add_hero_localization from './20260120_003432_add_hero_localization';
import * as migration_20260120_033000_add_solutions_archive_block from './20260120_033000_add_solutions_archive_block';
import * as migration_20260127_120000_add_solutions_ordering from './20260127_120000_add_solutions_ordering';
import * as migration_20260127_224639_add_announcement_global from './20260127_224639_add_announcement_global';
import * as migration_20260128_013000_add_announcement_subscription_block from './20260128_013000_add_announcement_subscription_block';
import * as migration_20260128_093618 from './20260128_093618';
import * as migration_20260206_001500_add_rbac_roles from './20260206_001500_add_rbac_roles';
import * as migration_20260209_184716_add_solution_blocks from './20260209_184716_add_solution_blocks';
import * as migration_20260210_131133_update_solutions_schema from './20260210_131133_update_solutions_schema';
import * as migration_20260210_131208_update_solutions_schema from './20260210_131208_update_solutions_schema';
import * as migration_20260211_220000_add_functionality_benefits_icon from './20260211_220000_add_functionality_benefits_icon';
import * as migration_20260211_222800_fix_solutions_icon_column from './20260211_222800_fix_solutions_icon_column';
import * as migration_20260223_120000_add_seo_meta_to_projects_solutions from './20260223_120000_add_seo_meta_to_projects_solutions';
import * as migration_20260317_192837_add_modular_solutions_blocks from './20260317_192837_add_modular_solutions_blocks';
import * as migration_20260318_144605 from './20260318_144605';
import * as migration_20260324_150857_i18n_solution_block_titles from './20260324_150857_i18n_solution_block_titles';

export const migrations = [
  {
    up: migration_20260120_003432_add_hero_localization.up,
    down: migration_20260120_003432_add_hero_localization.down,
    name: '20260120_003432_add_hero_localization',
  },
  {
    up: migration_20260120_033000_add_solutions_archive_block.up,
    down: migration_20260120_033000_add_solutions_archive_block.down,
    name: '20260120_033000_add_solutions_archive_block',
  },
  {
    up: migration_20260127_120000_add_solutions_ordering.up,
    down: migration_20260127_120000_add_solutions_ordering.down,
    name: '20260127_120000_add_solutions_ordering',
  },
  {
    up: migration_20260127_224639_add_announcement_global.up,
    down: migration_20260127_224639_add_announcement_global.down,
    name: '20260127_224639_add_announcement_global',
  },
  {
    up: migration_20260128_013000_add_announcement_subscription_block.up,
    down: migration_20260128_013000_add_announcement_subscription_block.down,
    name: '20260128_013000_add_announcement_subscription_block',
  },
  {
    up: migration_20260128_093618.up,
    down: migration_20260128_093618.down,
    name: '20260128_093618',
  },
  {
    up: migration_20260206_001500_add_rbac_roles.up,
    down: migration_20260206_001500_add_rbac_roles.down,
    name: '20260206_001500_add_rbac_roles',
  },
  {
    up: migration_20260209_184716_add_solution_blocks.up,
    down: migration_20260209_184716_add_solution_blocks.down,
    name: '20260209_184716_add_solution_blocks',
  },
  {
    up: migration_20260210_131133_update_solutions_schema.up,
    down: migration_20260210_131133_update_solutions_schema.down,
    name: '20260210_131133_update_solutions_schema',
  },
  {
    up: migration_20260210_131208_update_solutions_schema.up,
    down: migration_20260210_131208_update_solutions_schema.down,
    name: '20260210_131208_update_solutions_schema',
  },
  {
    up: migration_20260211_220000_add_functionality_benefits_icon.up,
    down: migration_20260211_220000_add_functionality_benefits_icon.down,
    name: '20260211_220000_add_functionality_benefits_icon',
  },
  {
    up: migration_20260211_222800_fix_solutions_icon_column.up,
    down: migration_20260211_222800_fix_solutions_icon_column.down,
    name: '20260211_222800_fix_solutions_icon_column',
  },
  {
    up: migration_20260223_120000_add_seo_meta_to_projects_solutions.up,
    down: migration_20260223_120000_add_seo_meta_to_projects_solutions.down,
    name: '20260223_120000_add_seo_meta_to_projects_solutions',
  },
  {
    up: migration_20260317_192837_add_modular_solutions_blocks.up,
    down: migration_20260317_192837_add_modular_solutions_blocks.down,
    name: '20260317_192837_add_modular_solutions_blocks',
  },
  {
    up: migration_20260318_144605.up,
    down: migration_20260318_144605.down,
    name: '20260318_144605',
  },
  {
    up: migration_20260324_150857_i18n_solution_block_titles.up,
    down: migration_20260324_150857_i18n_solution_block_titles.down,
    name: '20260324_150857_i18n_solution_block_titles'
  },
];
