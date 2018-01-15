import fs from 'fs';
import Joi from 'joi';
import yaml from 'js-yaml';
import _ from 'lodash';
import { IObject } from 'src/core/interfaces/IObject';
import schema from './../globalSchemaJoi';

const doc = yaml.safeLoad(fs.readFileSync(`${__dirname}/../../global.yml`, 'utf8'));

describe('global.yaml must be valid', () => {
  it('check by joi validator', () => {
    const validate = Joi.validate(doc, schema);
    expect(validate.error).toBe(null);
  });
  it('compare localesUI with availables', () => {
    // TODO workaround for ch864
    const map: IObject<string> = {
      en: 'en-US',
      ru: 'ru-RU',
      pl: 'pl-PL',
      lv: 'lv-LV',
    };
    const availables: string[] = [];
    doc.locales.language_codes.forEach((code: string) => {
      const locale = map[code];
      if (!_.isUndefined(locale)) {
        availables.push(map[code]);
      }
    });
    const keys = Object.keys(doc.ui.common.locales.items);
    const diff = _.difference(availables, keys);
    expect(diff).toHaveLength(0);
  });
});
