import ConfigHelper from 'src/helpers/configHelper';
import _ from 'lodash';

export const safelyParseJSON = (text: string) => {
  let result = null;
  if (!_.isNull(text)) {
    try {
      result = JSON.parse(text);
    } catch (error) {
      if (ConfigHelper.isDev()) {
        console.error(error);
      } else if (process.env.BROWSER) {
        const logException = require('src/helpers/sentryClient').logException;
        logException(error);
      } else {
        const logger = require('src/server/logger/logger').logger;
        logger.error(error);
      }
    }
  }
  return result;
};
