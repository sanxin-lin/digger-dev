import { resolve } from 'path';
import { getDirname } from './fs.js';

export const dirname = getDirname(import.meta.url);

export const CWD = process.cwd();

export const ES_DIR = resolve(CWD, 'es');

export const SRC_DIR = resolve(CWD, 'src');

export const CLI_PACKAGE_JSON = resolve(dirname, '../../../package.json');

export const PUBLIC_DIR_INDEXES = ['index.vue', 'index.tsx', 'index.ts', 'index.jsx', 'index.js'];

export const DOCS_DIR_NAME = 'docs';
export const STYLE_DIR_NAME = 'style';
export const EXAMPLE_DIR_NAME = 'example';
export const LOCALE_DIR_NAME = 'locale';
export const ROOT_DOCS_DIR = resolve(CWD, 'docs');
export const ROOT_PAGES_DIR = resolve(CWD, 'pages');

export const UI_PACKAGE_JSON = resolve(CWD, 'package.json');

export const SCRIPTS_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'];

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
// site
export const SITE = resolve(dirname, '../../../site');
export const SITE_OUTPUT_PATH = resolve(CWD, 'site');
export const SITE_PUBLIC_PATH = resolve(CWD, 'public');
export const SITE_DIR = resolve(CWD, '.digger/site');
export const SITE_PC_DIR = resolve(CWD, '.digger/site/pc');
export const SITE_PC_ROUTES = resolve(CWD, '.digger/pc.routes.ts');
export const SITE_MOBILE_ROUTES = resolve(CWD, '.digger/mobile.routes.ts');
export const SITE_CONFIG = resolve(CWD, '.digger/site.config.json');

// icons
export const ICONS_DIST_DIR = resolve(CWD, 'dist');
export const ICONS_CSS_DIR = resolve(ICONS_DIST_DIR, 'css');
export const ICONS_PNG_DIR = resolve(ICONS_DIST_DIR, 'png');
export const ICONS_FONTS_DIR = resolve(ICONS_DIST_DIR, 'fonts');
export const ICONS_SVG_DIR = resolve(CWD, 'svg');

// extension
export const EXTENSION_ENTRY = resolve(CWD, 'src/extension.ts');
