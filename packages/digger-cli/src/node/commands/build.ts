import fse from 'fs-extra';
import { SRC_DIR } from '../shared/constants.js';
import { build as buildVite } from 'vite';
import { getBuildConfig } from '../config/vite.config.js';
import { getDiggerConfig } from '../config/digger.config.js';
import { buildSiteEntry } from '../compiler/compileSiteEntry.js';

const { ensureDirSync } = fse;

export async function build() {
  process.env.NODE_ENV = 'production';

  ensureDirSync(SRC_DIR);
  await buildSiteEntry(false);
  // const diggerConfig = await getDiggerConfig();
  // const buildConfig = getBuildConfig(diggerConfig);

  // await buildVite(buildConfig);
}
