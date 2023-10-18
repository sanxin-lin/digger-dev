import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import { CLI_PACKAGE_JSON } from './constants.js';

const { readJSONSync, ensureFileSync, readFileSync, outputFileSync } = fse;

export function getDirname(url: string) {
  return fileURLToPath(new URL('.', url));
}

export function getCliVersion() {
  return readJSONSync(CLI_PACKAGE_JSON).version;
}

export function outputFileSyncOnChange(path: string, code: string) {
  ensureFileSync(path);
  const content = readFileSync(path, 'utf-8');
  if (content !== code) {
    outputFileSync(path, code);
  }
}
