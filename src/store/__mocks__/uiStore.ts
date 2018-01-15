import { IUIState } from 'src/ducks/ui';
import fs from 'fs';
import yaml from 'js-yaml';

const globalConfig = yaml.safeLoad(fs.readFileSync('src/configs/global.yml', 'utf8'));
export const ui = globalConfig.ui;

const state: IUIState = {
  ...ui,
  isRequestError: false,
  isRequesting: false,
};

export default state;
