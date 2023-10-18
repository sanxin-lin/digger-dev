import fse from 'fs-extra';
import { mergeWith, isArray } from 'lodash-es';
import { pathToFileURL } from 'url';
import { DIGGER_CONFIG, SITE_CONFIG } from '../shared/constants.js';
import { outputFileSyncOnChange } from '../shared/fs.js';

const { pathExistsSync, statSync } = fse;

export interface DiggerConfigIcons {
  name?: string;
  namespace?: string;
  base64?: boolean;
  publicPath?: string;
  fontFamilyClassName?: string;
  fontWeight?: string;
  fontStyle?: string;
}

export interface DiggerConfigEsbuild {
  target?: string | string[];
}

export interface DiggerConfig {
  name: string;
  namespace?: string;
  host?: string;
  port?: number;
  title?: string;
  logo?: string;
  themeKey?: string;
  defaultLanguage?: 'zh-CN' | 'en-US';
  useMobile?: boolean;
  lightTheme?: Record<string, string>;
  darkTheme?: Record<string, string>;
  highlight?: { style: string };
  analysis?: { baidu: string };
  pc?: Record<string, any>;
  mobile?: Record<string, any>;
  // TODO
  // copy?: CopyOptions['paths'];
  copy?: any;
  icons?: DiggerConfigIcons;
  esbuild?: DiggerConfigEsbuild;
  directives?: string[];
}

export function defineConfig(config: DiggerConfig) {
  return config;
}

export const mergeStrategy = (value: any, srcValue: any, key: string) => {
  const keys = ['features', 'members'];

  if (keys.includes(key) && isArray(srcValue)) {
    return srcValue;
  }
};

export const getDiggerConfig = async (emit = false): Promise<Required<DiggerConfig>> => {
  const defaultConfig = (await import('./digger.default.config.js')).default;
  const config: any = pathExistsSync(DIGGER_CONFIG)
    ? (await import(`${pathToFileURL(DIGGER_CONFIG).href}?_t=${statSync(DIGGER_CONFIG).mtimeMs}`))
        .default
    : {};
  const mergedConfig = mergeWith(defaultConfig, config, mergeStrategy);

  if (emit) {
    const source = JSON.stringify(mergedConfig, null, 2);
    outputFileSyncOnChange(SITE_CONFIG, source);
  }

  return mergedConfig;
};
