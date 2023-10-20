import fse from 'fs-extra';
import { build as buildVite } from 'vite';
import { SRC_DIR } from '../shared/constant.js';
import { getBuildConfig } from '../config/vite.config.js';
import { getDiggerConfig } from '../config/digger.config.js';
