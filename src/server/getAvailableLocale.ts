import { Request } from 'express';
import _ from 'lodash';
import acceptLanguage from 'accept-language';
import { safelyParseJSON } from 'src/helpers/safelyParseJSON';

const getAvailableLocale = (req: Request) => {
  let availableLocales: string[];
  const s = _.get(req, 'cookies.availableLocales', null);
  const defaultLocale = 'en-US';
  if (_.isNull(s)) {
    availableLocales = [defaultLocale];
  } else {
    availableLocales = safelyParseJSON(decodeURIComponent(s)) || [defaultLocale];
  }
  const suggestedLocale: string = _.get(req, 'cookies.locale') || _.get(req, 'headers.accept-language');
  acceptLanguage.languages(availableLocales);
  return acceptLanguage.get(suggestedLocale);
};

export default getAvailableLocale;
