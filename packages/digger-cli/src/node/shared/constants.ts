import { resolve } from 'path';
import { getDirname } from './fs.js';

export const dirname = getDirname(import.meta.url);

export const CWD = process.cwd();

export const CLI_PACKAGE_JSON = resolve(dirname, '../../../package.json');

export const DIGGER_CONFIG = resolve(CWD, 'digger.config.mjs');

export const VITE_RESOLVE_EXTENSIONS = [
  '.vue',
  '.tsx',
  '.ts',
  '.jsx',
  '.js',
  '.mjs',
  '.cjs',
  '.less',
  '.css',
];

// site
export const SITE_CONFIG = resolve(CWD, '.digger/site.config.json');

// icons
export const ICONS_DIST_DIR = resolve(CWD, 'dist');
export const ICONS_CSS_DIR = resolve(ICONS_DIST_DIR, 'css');
export const ICONS_PNG_DIR = resolve(ICONS_DIST_DIR, 'png');
export const ICONS_FONTS_DIR = resolve(ICONS_DIST_DIR, 'fonts');
export const ICONS_SVG_DIR = resolve(CWD, 'svg');
