import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import { markdown, html, inlineCss, copy } from '@digger/vite-plugins';
import {
  ES_DIR,
  SITE_CONFIG,
  SITE_DIR,
  SITE_MOBILE_ROUTES,
  SITE_OUTPUT_PATH,
  SITE_PC_ROUTES,
  SITE_PUBLIC_PATH,
  VITE_RESOLVE_EXTENSIONS,
  EXTENSION_ENTRY,
} from '../shared/constants.js';
import { InlineConfig } from 'vite';
import { get } from 'lodash-es';
import { resolve } from 'path';
import { DiggerConfig } from './digger.config';

export const getDevConfig = (diggerConfig: Required<DiggerConfig>): InlineConfig => {
  const defaultLanguage = get(diggerConfig, 'defaultLanguage');
  const host = get(diggerConfig, 'host');
  const port = get(diggerConfig, 'port');

  return {
    root: SITE_DIR,
    resolve: {
      extensions: VITE_RESOLVE_EXTENSIONS,
      alias: {
        '@config': SITE_CONFIG,
        '@pc-routes': SITE_PC_ROUTES,
        '@mobile-routes': SITE_MOBILE_ROUTES,
      },
    },
    server: {
      port,
      host: host === 'localhost' ? '0.0.0.0' : host,
    },
    publicDir: SITE_PUBLIC_PATH,
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      jsx(),
      markdown({ style: get(diggerConfig, 'highlight.style') }),
      copy({ paths: get(diggerConfig, 'copy', []) }),
      html({
        data: {
          logo: get(diggerConfig, `logo`),
          baidu: get(diggerConfig, `analysis.baidu`, ''),
          pcTitle: get(diggerConfig, `pc.title['${defaultLanguage}']`),
          pcDescription: get(diggerConfig, `pc.description['${defaultLanguage}']`),
          pcKeywords: get(diggerConfig, `pc.keywords['${defaultLanguage}']`),
          mobileTitle: get(diggerConfig, `mobile.title['${defaultLanguage}']`),
          mobileDescription: get(diggerConfig, `mobile.description['${defaultLanguage}']`),
          mobileKeywords: get(diggerConfig, `mobile.keywords['${defaultLanguage}']`),
        },
      }),
    ],
  };
};

export const getBuildConfig = (diggerConfig: Required<DiggerConfig>): InlineConfig => {
  const devConfig = getDevConfig(diggerConfig);

  return {
    ...devConfig,
    base: './',
    build: {
      outDir: SITE_OUTPUT_PATH,
      reportCompressedSize: false,
      emptyOutDir: true,
      cssTarget: 'chrome61',
      rollupOptions: {
        input: {
          main: resolve(SITE_DIR, 'index.html'),
          mobile: resolve(SITE_DIR, 'mobile.html'),
        },
      },
    },
  };
};

export interface BundleBuildOptions {
  fileName: string;
  output: string;
  format: 'es' | 'cjs' | 'umd';
  removeEnv: boolean;
  emptyOutDir: boolean;
}

export const getBundleConfig = (
  diggerConfig: Required<DiggerConfig>,
  buildOptions: BundleBuildOptions,
): InlineConfig => {
  const plugins = [];
  const name = get(diggerConfig, 'name');
  const { fileName, output, format, emptyOutDir, removeEnv } = buildOptions;

  if (format === 'umd') {
    plugins.push(
      inlineCss({
        jsFile: resolve(output, fileName),
        cssFile: resolve(output, 'style.css'),
      }),
    );
  }

  return {
    logLevel: 'silent',
    define: removeEnv
      ? {
          'process.env.NODE_ENV': JSON.stringify('production'),
        }
      : undefined,
    plugins,
    build: {
      minify: format === 'cjs' ? false : 'esbuild',
      emptyOutDir,
      copyPublicDir: false,
      lib: {
        name,
        formats: [format],
        fileName: () => fileName,
        entry: resolve(ES_DIR, 'index.bundle.mjs'),
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          dir: output,
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  };
};

export type ExtensionMode = 'dev' | 'build';

export function getExtensionConfig(mode: ExtensionMode): InlineConfig {
  return {
    build: {
      sourcemap: mode === 'dev' ? 'inline' : false,

      watch: mode === 'dev' ? {} : null,

      lib: {
        entry: EXTENSION_ENTRY,
        fileName: 'extension',
        formats: ['cjs'],
      },

      rollupOptions: {
        external: ['vscode'],
      },
    },
  };
}
