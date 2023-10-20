import ejs from 'ejs';
import type { Plugin } from 'vite';

export interface HtmlOptions {
  data?: Record<string, string>;
}

export function html(options: HtmlOptions): Plugin {
  return {
    name: 'vite-plugin-digger-html',

    transformIndexHtml: {
      order: 'pre',

      transform(html) {
        return ejs.render(html, options.data);
      },
    },
  };
}
